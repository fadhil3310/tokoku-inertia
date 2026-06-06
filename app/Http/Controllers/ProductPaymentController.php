<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductPayment;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ProductPaymentController extends Controller
{

    public function requestPay(Request $request)
    {
        $values = $request->validate([
            'payment_method' => ['required', 'string'],
            'amount' => ['required', 'numeric', 'min:1'],
            'product_id' => ['required', 'string', 'max:255'],
        ]);

        try {
            if ($values['payment_method'] == 'midtrans') {
                $result = $this->payMidtrans($values['amount'], $values['product_id']);
                return response()->json($result);
            } else if ($values['payment_method'] == 'cash') {
                $result = $this->payCash($values['amount'], $values['product_id']);
                return response()->json($result);
            }
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }
    }

    public static function payMidtrans($productId, $amount): array
    {
        if (!MidtransConfigController::checkLibraryReady())
            throw new Exception("Midtrans library is not ready");

        // Get product first.
        $product = Product::find($productId);
        if ($product == null)
            throw new Exception("Product not found");

        // Order params.
        $randomId = bin2hex(random_bytes(16));
        $orderId = "TOKOKU-" . Auth::user()->booth->name . "-" . $randomId;
        $grandTotal = $amount * $product->price;

        $params = array(
            'transaction_details' => array(
                'order_id' => $orderId,
                'gross_amount' => $grandTotal,
            )
        );

        // var_dump($randomId, $orderId);

        // Request pay.
        $paymentUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;

        // Insert receipt.
        ProductPayment::create([
            "id" => $orderId,
            "payment" => $orderId,
            "booth_id" => Auth::user()->booth->id,
            "amount" => $amount,
            "price" => $product->price,
            "grand_total" => $grandTotal,
            "status" => "pending",
            "product_id" => $productId,
            "sku" => $product->sku,
            "description" => $product->description
        ]);

        return [
            'payment_url' => $paymentUrl,
            'order_id' => $orderId
        ];
    }

    public static function payCash($productId, $amount): array
    {
        // Get product first.
        $product = Product::find($productId);
        if ($product == null)
            throw new Exception("Product not found");

        // Order params.
        $randomId = bin2hex(random_bytes(16));
        $orderId = "TOKOKU-" . Auth::user()->booth->name . "-" . $randomId;
        $grandTotal = $amount * $product->price;

        // Insert receipt.
        ProductPayment::create([
            "id" => $orderId,
            "payment" => $orderId,
            "booth_id" => Auth::user()->booth->id,
            "amount" => $amount,
            "price" => $product->price,
            "grand_total" => $grandTotal,
            "status" => "completed",
            "product_id" => $productId,
            "sku" => $product->sku,
            "description" => $product->description
        ]);

        return [
            "order_id" => $orderId
        ];
    }

    public function requestCheckPaymentStatus(Request $request)
    {
        $values = $request->validate([
            'order_id' => ['required', 'string'],
        ]);

        try {
            $status = $this->checkPaymentStatus($values['order_id']);
            return response()->json([
                "payment_status" => $status
            ]);
        } catch (Exception $e) {
            abort(500, $e->getMessage());
        }
    }

    public function checkPaymentStatus($orderId): bool
    {
        $receipt = ProductPayment::find($orderId);
        if ($receipt == null)
            throw new Exception("Receipt not found");

        if ($receipt->payment_method == "midtrans") {
            $status = \Midtrans\Transaction::status($orderId);
            var_dump($status);
            return true;
        } else {
            return true;
        }
    }
}
