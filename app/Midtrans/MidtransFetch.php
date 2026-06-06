<?php

use App\Models\Booth;
use Illuminate\Support\Facades\Http;
use App\Models\Product;

class MidtransFetch
{
    private string $orderId;
    private string $boothId;
    private string $productId;
    private int $amount;
    private array $status;

    private string $serverKey;
    private string $authString;
    private string $fullAuthString;

    public function __construct($boothId, $productId, $amount)
    {
        $this->boothId = $boothId;
        $this->productId = $productId;
        $this->amount = $amount;

        $this->setupKey();
        $this->pay();
    }

    private function setupKey()
    {
        $booth = $this->getBooth();
        $serverKey = $booth->midtransConfig->serverKey;
        if ($serverKey == null)
            throw new Exception("Booth haven't set up their Midtrans key yet");
        $this->$serverKey = $serverKey;
        $this->authString = base64_encode($serverKey . ":");
        $this->fullAuthString = "Basic " . $this->authString;
    }

    private function pay(): array
    {
        // Get booth.
        $booth = $this->getBooth();

        // Get product first.
        $product = Product::find($this->productId);
        if ($product == null)
            throw new Exception("Product not found");

        // Order params.
        $randomId = bin2hex(random_bytes(16));
        $orderId = "TOKOKU-" . $booth->name . "-" . $randomId;
        $grandTotal = $this->amount * $product->price;

        $params = array(
            'transaction_details' => array(
                'order_id' => $orderId,
                'gross_amount' => $grandTotal,
            )
        );

        // Request pay.
        $response = Http::acceptJson()->withHeaders([
            'Authorization' => $this->fullAuthString
        ])->post("https://app.sandbox.midtrans.com/snap/v1/transactions", $params);

        $this->status = [
            "type" => "pending",
            "detail" => [
                "paymentUrl" => "abc"
            ]
        ];

        var_dump($response);

        // Insert receipt.
        // ProductPayment::create([
        //     "id" => $orderId,
        //     "payment" => $orderId,
        //     "booth_id" => Auth::user()->booth->id,
        //     "amount" => $amount,
        //     "price" => $product->price,
        //     "grand_total" => $grandTotal,
        //     "status" => "pending",
        //     "product_id" => $productId,
        //     "sku" => $product->sku,
        //     "description" => $product->description
        // ]);

        // return [
        //     'payment_url' => $paymentUrl,
        //     'order_id' => $orderId
        // ];
        return [];
    }

    public function checkStatus()
    {
        // Request check status.
        $response = Http::acceptJson()->withHeaders([
            'Authorization' => $this->fullAuthString
        ])->get("https://api.sandbox.midtrans.com/v2/" . $this->orderId . "/status");

        var_dump($response);
    }

    public function getOrderId(): string
    {
        return $this->orderId;
    }

    public function getStatus(): array
    {
        return $this->status;
    }

    private function getBooth(): Booth
    {
        $booth = Booth::find($this->boothId);
        if ($booth == null)
            throw new Exception("Booth not found");
        return $booth;
    }
}
