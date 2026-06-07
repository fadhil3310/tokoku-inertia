<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Booth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use MidtransFetchManager;
use Symfony\Component\Console\Output\ConsoleOutput;

class CatalogController extends Controller
{
    public function index(Request $request, $boothId)
    {
        $search = $request->query('search');
        $category = $request->query('category');

        $products = null;

        if ($category == '') {
            $products = Product::where('name', 'like', "%{$search}%")
                ->where('booth_id', $boothId)
                ->paginate(10);
        } else {
            $products = Product::where('category', $category)
                ->where('name', 'like', "%{$search}%")
                ->where('booth_id', $boothId)
                ->paginate(10);
        }

        $booth = Booth::find($boothId);

        return Inertia::render('Catalog/Index', [
            'products' => $products,
            'booth' => [
                "id" => $booth->id,
                "name" => $booth->name,
                "image" => $booth->image,
            ]
        ]);
    }

    public function show(string $boothId, string $id)
    {
        $output = new ConsoleOutput();
        $product = Product::where('booth_id', $boothId)->find($id);
        $booth = Booth::find($boothId);
        $isPaymentReady = MidtransConfigController::checkReady($boothId);

        $output->writeln("asdasd " . ($isPaymentReady ? "true" : "false"));
        

        return Inertia::render('Catalog/Show', [
            'product' => $product, 
            'booth' => [
                "id" => $booth->id,
                "name" => $booth->name,
                "image" => $booth->image,
            ], 
            'isPaymentReady' => $isPaymentReady
        ]);
    }

    public function showImage(string $boothId, string $id)
    {
        $product = Product::find($id);

        return Inertia::render('Catalog/ShowImage', ['id' => $product['id'], 'image' => $product['image']]);
    }

    public function checkout(Request $request)
    {
        $output = new ConsoleOutput();
        $validated = $request->validate([
            'boothId' => ['required', 'numeric', 'min:1'],
            'productId' => ['required', 'numeric', 'min:1'],
            'amount' => ['required', 'numeric', 'min:1'],
        ]);

        $fetch = MidtransFetchManager::pay($validated['boothId'], $validated['productId'], $validated['amount']);
        return response()->json(["order_id" => $fetch->getOrderId()]);
    }

    public function checkPaymentStatus(string $orderId)
    {
        $output = new ConsoleOutput();
        try {
            $fetch = MidtransFetchManager::get($orderId);
            $status = $fetch->getStatus();
            return Inertia::render('Catalog/Checkout', $status);
        } catch (Exception $e) {
            return Inertia::render('Catalog/Checkout', ["status" => "error"]);
        }
    }
}
