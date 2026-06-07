<?php

// namespace App\Midtrans;

// use App\Models\Booth;
// use App\Models\ProductPayment;
// use Illuminate\Support\Facades\Http;
// use App\Models\Product;
// use Symfony\Component\Console\Output\ConsoleOutput;
// use Exception;

// class MidtransFetch
// {
//     private string $orderId;
//     private string $boothId;
//     private string $productId;
//     private int $amount;
//     private array $detail;

//     private string $serverKey;
//     private string $authString;
//     private string $fullAuthString;

//     public function __construct($boothId, $productId, $amount)
//     {
//         $this->boothId = $boothId;
//         $this->productId = $productId;
//         $this->amount = $amount;

//         $this->setupKey();
//         $this->pay();
//     }

//     private function setupKey()
//     {
//         $booth = $this->getBooth();
//         $this->serverKey = $booth->midtransConfig->server_key;
//         if ($this->serverKey == null)
//             throw new Exception("Booth haven't set up their Midtrans key yet");
//         $this->authString = base64_encode($this->serverKey . ":");
//         $this->fullAuthString = "Basic " . $this->authString;
//     }

//     private function pay(): array
//     {
//         $output = new ConsoleOutput();

//         // Get booth.
//         $booth = $this->getBooth();

//         // Get product first.
//         $product = Product::find($this->productId);
//         if ($product == null)
//             throw new Exception("Product not found");

//         // Order params.
//         $randomId = bin2hex(random_bytes(10));
//         $this->orderId = $randomId;
//         $grandTotal = $this->amount * $product->price;

//         $params = array(
//             'transaction_details' => array(
//                 'order_id' => $this->orderId,
//                 'gross_amount' => $grandTotal,
//             )
//         );

//         // Request pay.
//         $response = Http::acceptJson()->withHeaders([
//             'Authorization' => $this->fullAuthString
//         ])->post("https://app.sandbox.midtrans.com/snap/v1/transactions", $params);

//         $output->writeln("Midtrans pay response:");
//         $output->writeln($response);

//         if ($response->failed())
//             throw new Exception("Midtrans pay failed");            

//         $responseData = $response->json();

//         // Determine status.
//         $this->detail = [
//             "status" => "pending",
//             "info" => [
//                 "paymentUrl" => $responseData['redirect_url']
//             ]
//         ];

//         // Insert receipt.
//         ProductPayment::create([
//             "id" => $this->orderId,
//             "payment_method" => "midtrans",
//             "booth_id" => $this->boothId,
//             "amount" => $this->amount,
//             "price" => $product->price,
//             "grand_total" => $grandTotal,
//             "status" => "pending",
//             "product_id" => $this->productId,
//             "sku" => $product->sku,
//             "description" => $product->description
//         ]);

//         return [];
//     }

//     public function checkStatus()
//     {
//         $output = new ConsoleOutput();

//         // Request check status.
//         $response = Http::acceptJson()->withHeaders([
//             'Authorization' => $this->fullAuthString
//         ])->get("https://api.sandbox.midtrans.com/v2/" . $this->orderId . "/status");

//         $output->writeln("Midtrans check status response:");
//         $output->writeln($response);
//     }

//     public function getOrderId(): string
//     {
//         return $this->orderId;
//     }

//     public function getDetail(): array
//     {
//         return $this->detail;
//     }

//     private function getBooth(): Booth
//     {
//         $booth = Booth::find($this->boothId);
//         if ($booth == null)
//             throw new Exception("Booth not found");
//         return $booth;
//     }
// }
