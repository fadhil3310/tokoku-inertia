import React, { useEffect, useMemo, useState, useCallback } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, usePage, router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardActions,
} from "../../Components/Card";
import {
    AddIcon,
    CatalogueIcon,
    CircleAddIcon,
    HomeIcon,
    ChevronRightIcon,
} from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { toast } from "sonner";
import { cn } from "../../Utilities/cn";
import { InfoIcon, ShoppingBasketIcon } from "../../Components/Icons";

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function CheckoutAction({ product }) {
    const [amount, setAmount] = useState(1);

    const formattedSubtotal = useMemo(() => {
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Math.abs(product.price * amount));
        return formatted;
    }, [product.price, amount]);

    const handleAmountChange = useCallback(
        (much) => {
            const afterChange = amount + much;
            if (afterChange < 1 || afterChange > product.stock) return;
            setAmount(afterChange);
        },
        [product.stock, amount, setAmount]
    );

    const handleCheckout = useCallback(() => {
        router.post(
            route("transactions.store", { productId: product.id, amount })
        );
    }, [product.id, amount]);

    return (
        <div
            className={cn(
                "h-min max-lg:row-2 col-1 lg:col-3 min-w-[250px] shrink-0 p-4 bg-white shadow-sm rounded-xl animate-[slide-from-bottom_0.5s_var(--ease-out-quint)]"
            )}
        >
            <p className="text-lg font-semibold mb-3">Purchase details</p>
            <div className="flex gap-2 items-center mb-2">
                <div className="flex gap-2 border-1 border-[#999999] rounded-xl">
                    <button
                        className="w-[40px] h-[35px] shrink-0 text-3xl border-[#A0AEC0] cursor-pointer disabled:opacity-20"
                        onClick={() => handleAmountChange(-1)}
                        disabled={amount == 1}
                    >
                        -
                    </button>
                    <div
                        className={cn(
                            "flex items-center justify-center w-[30px] h-[35px] shrink-0 text-lg font-semibold"
                        )}
                    >
                        <p type="number">{amount}</p>
                    </div>

                    <button
                        className="w-[40px] h-[35px] shrink-0 text-2xl border-[#A0AEC0 cursor-pointer disabled:opacity-20"
                        onClick={() => handleAmountChange(1)}
                        disabled={amount == product.stock}
                    >
                        +
                    </button>
                </div>
                <p className="shrink-0">
                    Stock: <strong>{product.stock}</strong>
                </p>
            </div>

            <Button className="w-full py-2" onClick={handleCheckout}>
                <ShoppingBasketIcon />
                Checkout
            </Button>
        </div>
    );
}

export default function Show({ products }) {
    console.log(products);
    // const formattedPrice = useMemo(() => {
    //     const formatted = new Intl.NumberFormat("id-ID", {
    //         style: "currency",
    //         currency: "IDR",
    //         minimumFractionDigits: 0,
    //     }).format(Math.abs(transaction.price));
    //     return formatted;
    // }, [transaction.price]);

    // const formattedTotal = useMemo(() => {
    //     const formatted = new Intl.NumberFormat("id-ID", {
    //         style: "currency",
    //         currency: "IDR",
    //         minimumFractionDigits: 0,
    //     }).format(Math.abs(transaction.grand_total));
    //     return formatted;
    // }, [transaction.grand_total]);

    const [selectedProductId, setSelectedProductId] = useState("");

    return (
        <DashboardLayout>
            <Head title="Transactions" />
            <div className="p-4 lg:p-6 min-h-screen w-full">
                <nav className="flex items-center space-x-2 text-sm mb-6">
                    <Link
                        href={"/dashboard"}
                        className="flex items-center text-gray-700 hover:text-blue-500 fill-current"
                    >
                        <HomeIcon />
                    </Link>
                    <ChevronRightIcon />
                    <Link
                        href={"/transactions"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Transactions
                    </Link>
                    <ChevronRightIcon />
                    <Link
                        href={route("transactions.create")}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Create
                    </Link>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Create Transaction</CardTitle>
                    </CardHeader>
                </Card>

                <div className="bg-white rounded-lg p-4 md:p-6 space-y-2 mb-4">
                    <select
                        onChange={(ev) => setSelectedProductId(ev.target.value)}
                    >
                        <option key="" disabled selected>
                            Select a product
                        </option>
                        {products.map((x) => (
                            <option value={x.id}>{x.name}</option>
                        ))}
                    </select>
                </div>

                {selectedProductId != "" && (
                    <CheckoutAction
                        product={products.find(
                            (x) => x.id == selectedProductId
                        )}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
