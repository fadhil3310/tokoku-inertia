<?php

namespace App\Exceptions;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class DatabaseExceptionHandler
{
    private const CONNECTION_ERRORS = [
        2002,
        2003,
        2006,
        1045,
    ];

    private const SQLSTATE_ERRORS = [
        '42S02',
        '42S22',
        '23000',
        '42000',
    ];

    public static function report(QueryException $e): void
    {
        Log::error('Database error', [
            'message' => $e->getMessage(),
            'code'    => $e->getPrevious()?->getCode(),
        ]);
    }

    public static function render(QueryException $e, Request $request): ?Response
    {
        if (self::isConnectionError($e)) {
            return self::respondWithError(
                $request,
                'Service temporarily unavailable. Please try again later.',
                'Errors/DatabaseError',
                503
            );
        }

        if (self::isSqlStateError($e)) {
            return self::respondWithError(
                $request,
                'Database error occurred. Please contact support.',
                'Errors/DatabaseError',
                500
            );
        }

        return null;
    }

    private static function respondWithError(Request $request, string $message, string $page, int $status): Response
    {
        if ($request->header('X-Inertia')) {
            return inertia($page, [
                'error'  => $message,
                'status' => $status,
            ])->toResponse($request)
                ->setStatusCode($status);
        }

        return inertia($page, [
            'error'  => $message,
            'status' => $status,
        ])
            ->toResponse($request)
            ->setStatusCode($status);
    }

    private static function isConnectionError(QueryException $e): bool
    {
        return in_array($e->getPrevious()?->getCode(), self::CONNECTION_ERRORS);
    }

    private static function isSqlStateError(QueryException $e): bool
    {
        return in_array($e->getCode(), self::SQLSTATE_ERRORS);
    }
}
