<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booth;
use App\Models\ProductPayment;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductTransactionController extends Controller
{
    public function Index(Request $request)
    {
        $boothId = Auth::user()->booth->id;
        $receiptList = ProductPayment::latest()->where('booth_id', $boothId)->get(['id', 'product_id', 'amount', 'grand_total', 'status', 'payment_method', 'status', 'created_at'])->map(
            function ($receipt) {
                $product = Product::find($receipt->product_id);
                if ($product != null) {
                    $receipt->product_name = $product->name;
                } else {
                    $receipt->product_name = "[DELETED]";
                }
                return $receipt;
            }
        );

        return Inertia::render('Transactions/Index', [
            'transactions' => $receiptList,
        ]);
    }

    public function Show(string $receiptId)
    {
        $receipt = ProductPayment::find($receiptId);
        $product = Product::find($receipt->product_id);

        return Inertia::render('Transactions/Show', [
            'transaction' => $receipt,
            'productName' => $product?->name ?? "[DELETED]"
        ]);
    }

    public function create()
    {
        $boothId = Auth::user()->booth->id;
        $products = Product::where('booth_id', $boothId)->get();
        return Inertia::render('Transactions/Create', ["products" => $products]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'productId'        => 'required|string|max:255',
            'amount'        => 'required|numeric',
        ]);

        $boothId = Auth::user()->booth->id;
        ProductPaymentController::payCash($boothId, $validated['productId'], $validated['amount']);

        return redirect()->route('transactions.index');
    }
}
