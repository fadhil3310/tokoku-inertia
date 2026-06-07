<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductPayment;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Midtrans\MidtransFetch;
use App\Midtrans\MidtransFetchManager;
use App\Models\Booth;
use Symfony\Component\Console\Output\ConsoleOutput;

class ProductPaymentController extends Controller
{
    private static array $statusMap = [
        "pending" => ["pending"],
        "completed" => [
            "capture",
            "settlement",
            "refund",
            "chargeback",
            "partial_refund",
            "partial_chargeback",
        ],
        "canceled" => ["deny", "cancel", "expire", "failure"],
    ];

    public function checkout(Request $request)
    {
        $output = new ConsoleOutput();
        [
            "boothId" => $boothId,
            "productId" => $productId,
            "amount" => $amount,
            "method" => $method
        ] = $request->validate([
            'boothId' => ['required', 'string', 'min:1'],
            'productId' => ['required', 'string', 'min:1'],
            'amount' => ['required', 'numeric', 'min:1'],
            'method' => ['required', 'string', 'min:1']
        ]);

        if ($method != "midtrans" && $method != "cash")
            return abort(400, "method must be 'midtrans' or 'cash'");

        if ($method == "midtrans") {
            $result = self::payMidtrans($boothId, $productId, $amount);
            return response()->json($result);
        } else if ($method == "cash") {
            $orderId = $this->payCash($boothId, $productId, $amount);
            return response()->json(["orderId" => $orderId]);
        }
    }

    public static function payMidtrans($boothId, $productId, $amount): array
    {
        self::setupLibrary($boothId);

        // Get product first.
        $product = Product::find($productId);
        if ($product == null)
            throw new Exception("Product not found");

        // Order params.
        $orderId = "TOKOKU-" . bin2hex(random_bytes(6));
        $grandTotal = $amount * $product->price;

        $params = array(
            'transaction_details' => array(
                'order_id' => $orderId,
                'gross_amount' => $grandTotal,
            )
        );

        // Get Snap Payment Page URL
        $paymentUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;

        // Insert receipt.
        ProductPayment::create([
            "id" => $orderId,
            "payment_method" => "midtrans",
            "payment_url" => $paymentUrl,
            "booth_id" => $boothId,
            "amount" => $amount,
            "price" => $product->price,
            "grand_total" => $grandTotal,
            "status" => "pending",
            "product_id" => $productId,
            "sku" => $product->sku,
            "description" => $product->description
        ]);

        return [
            "orderId" => $orderId,
            "paymentUrl" => $paymentUrl
        ];
    }

    public static function payCash($boothId, $productId, $amount): string
    {
        // Get product first.
        $product = Product::find($productId);
        if ($product == null)
            throw new Exception("Product not found");

        // Order params.
        $randomId = bin2hex(random_bytes(10));
        $orderId = $randomId;
        $grandTotal = $amount * $product->price;

        // Insert receipt.
        ProductPayment::create([
            "id" => $orderId,
            "payment_method" => "cash",
            "booth_id" => $boothId,
            "amount" => $amount,
            "price" => $product->price,
            "grand_total" => $grandTotal,
            "status" => "completed",
            "product_id" => $productId,
            "sku" => $product->sku,
            "description" => $product->description
        ]);

        return $orderId;
    }

    public static function checkMidtransPaymentStatus($boothId, $orderId): array
    {
        $output = new ConsoleOutput();
        self::setupLibrary($boothId);

        $receipt = ProductPayment::find($orderId);

        $status = "pending";
        $info = [];

        try {
            $result = \Midtrans\Transaction::status($orderId);
            $resultStatus = $result->fraud_status == 'deny' ? "deny" : $result->transaction_status;

            foreach (self::$statusMap as $statusMapKey => $subStatuses) {
                if (in_array($resultStatus, $subStatuses)) {
                    $status = $statusMapKey;
                    break;
                }
            }

            if ($receipt->status != $status) {
                $receipt->status = $status;
                $receipt->save();
            }
        } catch (Exception $e) {
            if ($receipt->status != "pending")
                throw $e;
        }

        if ($status == "pending") {
            $info = [
                "paymentUrl" => $receipt->payment_url
            ];
        }

        return ["status" => $status, "info" => $info];
    }

    private static function setupLibrary($boothId)
    {
        $midtransConfig = Booth::find($boothId)->midtransConfig;
        if ($midtransConfig == null)
            throw new Exception("Tenant haven't set up their midtrans key yet");

        \Midtrans\Config::$serverKey = $midtransConfig->server_key;
        \Midtrans\Config::$isProduction = false;
    }

    // public static function checkMidtransPaymentStatus($orderId): string
    // {
    //     $output = new ConsoleOutput();
    //     $receipt = ProductPayment::find($orderId);
    //     if ($receipt == null)
    //         throw new Exception("Receipt not found");

    //     if ($receipt->payment_method == "midtrans") {
    //         try {
    //             $fetch = MidtransFetchManager::get($orderId);
    //             $status = $fetch->getStatus();
    //             return $status
    //         } catch (Exception $e) {
    //             return Inertia::render('Catalog/Checkout', ["status" => "error"]);
    //         }
    //     } else {
    //         return true;
    //     }
    // }
}
