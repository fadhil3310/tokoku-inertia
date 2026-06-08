<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Booth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Midtrans\MidtransFetchManager;
use Symfony\Component\Console\Output\ConsoleOutput;
use Illuminate\Support\Facades\Storage;

class CatalogController extends Controller
{
    public function index(Request $request, $boothId)
    {
        $search = $request->query('search');
        $category = $request->query('category');

        $query = Product::where('booth_id', $boothId)
            ->where('name', 'like', "%{$search}%");

        if (!empty($category)) {
            $query->where('category', $category);
        }

        $products = $query->paginate(10)->through(function ($product) {
            // Convert the model to an array FIRST
            $data = $product->toArray();
            
            // Overwrite the existing 'image' property with the full URL
            $data['image'] = $product->image
                ? Storage::url($product->image)
                : 'https://placehold.co/300'; 

            // Return the modified array
            return $data;
        });

        $booth = Booth::with('owner')->findOrFail($boothId);

        return Inertia::render('Catalog/Index', [
            'products' => $products,
            'booth' => [
                "id" => $booth->id,
                "name" => $booth->name,
                "owner" => $booth->owner->name ?? 'Unknown',
                "image" => $booth->image,
            ]
        ]);
    }

    public function show(string $boothId, string $id)
    {
        $output = new ConsoleOutput();
        $product = Product::where('booth_id', $boothId)->find($id);
        $product['image'] = $product->image
            ? Storage::url($product->image)
            : 'https://placehold.co/300'; 
        $booth = Booth::find($boothId);
        $isPaymentReady = MidtransConfigController::checkReady($boothId);

        $output->writeln("asdasd " . ($isPaymentReady ? "true" : "false"));


        return Inertia::render('Catalog/Show', [
            'product' => $product,
            'booth' => [
                "id" => $booth->id,
                "name" => $booth->name,
                "image" =>  $booth->image,
            ],
            'isPaymentReady' => $isPaymentReady
        ]);
    }

    public function showImage(string $boothId, string $id)
    {
        $product = Product::find($id);

        return Inertia::render('Catalog/ShowImage', ['id' => $product['id'], 'image' =>  Storage::url($product['image'])]);
    }

    public function checkPaymentStatus(string $boothId, string $orderId)
    {
        $output = new ConsoleOutput();
        try {
            $status = ProductPaymentController::checkMidtransPaymentStatus($boothId, $orderId);
            return Inertia::render('Catalog/CheckPaymentStatus', $status);
        } catch (Exception $e) {
            $output->writeln("Error when trying to check for payment status, message:");
            $output->writeln($e->getCode() . " " . $e->getMessage());
            return Inertia::render('Catalog/CheckPaymentStatus', ["status" => "error"]);
        }
    }
}
