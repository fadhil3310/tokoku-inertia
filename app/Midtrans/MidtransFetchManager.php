<?php

// namespace App\Midtrans;

// use App\Midtrans\MidtransFetch;
// use Symfony\Component\Console\Output\ConsoleOutput;

// class MidtransFetchManager 
// {
//     public static array $list = [];

//     public static function get($orderId): ?MidtransFetch
//     {
//         $output = new ConsoleOutput();

//         $output->writeln("Heres second list:");
//         $output->writeln(print_r(self::$list, true));
//         var_dump(self::$list);
//         if (!array_key_exists($orderId, self::$list))
//             return null;
//         return self::$list[$orderId];
//     }

//     public static function pay($boothId, $productId, $amount): MidtransFetch
//     {
//         $output = new ConsoleOutput();
//         $fetch = new MidtransFetch($boothId, $productId, $amount);
//         $output->writeln("Heres order id: " . $fetch->getOrderId());
//         self::$list[$fetch->getOrderId()] = $fetch;
//         $output->writeln("Heres list:");
//         $output->writeln(print_r(self::$list, true));
//         return $fetch;
//     }
// }