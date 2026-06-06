<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use MidtransFetchManager;
use Symfony\Component\Console\Output\ConsoleOutput;

class CatalogController extends Controller
{
    public function index(Request $request, string $boothId)
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

        return Inertia::render('Catalog/Index', [
            'products' => $products,
        ]);
    }

    public function show(string $id)
    {
        $product = Product::find($id);
        $isPaymentReady = MidtransConfigController::checkLibraryReady();

        return Inertia::render('Catalog/Show', ['product' => $product, 'isPaymentReady' => $isPaymentReady]);
    }

    public function showImage(string $id)
    {
        $product = Product::find($id);

        return Inertia::render('Catalog/ShowImage', ['id' => $product['id'], 'image' => $product['image']]);
    }

    public function checkout(Request $request, string $boothId)
    {
        $output = new ConsoleOutput();
        $validated = $request->validate([
            'product_id' => ['required', 'numeric', 'min:1'],
            'amount' => ['required', 'numeric', 'min:1'],
        ]);

        $fetch = MidtransFetchManager::pay($boothId, $validated['product_id'], $validated['amount']);
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
