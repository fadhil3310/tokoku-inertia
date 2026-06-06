<?php

class MidtransFetchManager 
{
    private static array $list = [];

    public static function get($orderId): ?MidtransFetch
    {
        if (!array_key_exists($orderId, MidtransFetchManager::$list))
            return null;
        return MidtransFetchManager::$list[$orderId];
    }

    public static function pay($boothId, $productId, $amount): MidtransFetch
    {
        $fetch = new MidtransFetch($boothId, $productId, $amount);
        $list[$fetch->getOrderId()] = $fetch;
        return $fetch;
    }
}