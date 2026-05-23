import Button from "../../Components/Buttons";
import { ShoppingBasketIcon } from "../../Components/Icons";
import CatalogueLayout from "./CatalogLayout";
import { useCallback, useMemo, useState } from "react";
import { ProductCategories } from "../../Shared/productCategories";
import { Link, router } from "@inertiajs/react";

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

    return (
        <div className="h-min max-lg:row-2 col-1 lg:col-3 min-w-[250px] shrink-0 p-4 bg-white shadow-sm rounded-xl animate-[slide-from-bottom_0.5s_var(--ease-out-quint)]">
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
                    <div className="flex items-center justify-center w-[30px] h-[35px] shrink-0 text-lg font-semibold">
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

            <div className="flex items-center mt-3 mb-3">
                <p className="w-full text-sm">Subtotal: </p>
                <p className="text-[#2B7FFF] text-xl font-bold">
                    {formattedSubtotal}
                </p>
            </div>

            <Button className="w-full py-2">
                <ShoppingBasketIcon />
                Checkout
            </Button>
        </div>
    );
}

export default function Show({ product }) {
    const descriptionDelimited = useMemo(
        () => product.description.replaceAll("\n", "<br />"),
        [product.description]
    );

    const formattedPrice = useMemo(() => {
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Math.abs(product.price));
        return formatted;
    }, [product.price]);

    return (
        <CatalogueLayout showBack>
            <div className="grid grid-rows-[auto_auto_auto] md:grid-rows-[auto_1fr] lg:grid-rows-1 grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] template gap-4">
                <div className="max-md:flex justify-center w-full h-min col-1 shrink-0  ">
                    <div className="p-3 bg-[#F3F4F6] rounded-xl shadow-sm">
                        <Link
                            href={route("catalog.showImage", product.id)}
                            viewTransition
                        >
                            <img
                                src={"/storage/" + product.image}
                                className="h-[300px] aspect-square object-cover rounded-lg cursor-zoom-in hover:scale-105 hover:shadow-md hover:opacity-80 transition-transform"
                                style={{
                                    viewTransitionName: `product-image-${product.id}`,
                                }}
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex row-3 md:row-span-2 lg:row-1 md:col-2 gap-6 w-full p-4 bg-white shadow-sm rounded-xl animate-[slide-from-bottom_0.35s_var(--ease-out-quint)]">
                    <div className="flex flex-col w-full">
                        <h2
                            className="font-semibold text-2xl opacity-90"
                            style={{
                                viewTransitionName: `product-name-${product.id}`,
                            }}
                        >
                            {product.name}
                        </h2>

                        <div className="flex items-center mt-2">
                            <p
                                className="w-full font-bold text-3xl"
                                style={{
                                    viewTransitionName: `product-price-${product.id}`,
                                }}
                            >
                                {formattedPrice}
                            </p>
                            <p className="shrink-0">25 sold</p>
                        </div>

                        <hr className="mt-4 mb-4 border-[#999999]" />

                        <p className="opacity-70 mb-2">
                            Category:{" "}
                            <strong>
                                {ProductCategories.find(
                                    (x) => x.value == product.category
                                ).label ?? product.category}
                            </strong>
                        </p>

                        <p className="font-semibold text-xl mb-2">
                            Description
                        </p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: descriptionDelimited,
                            }}
                        ></p>
                    </div>
                </div>

                <CheckoutAction product={product} />
            </div>
        </CatalogueLayout>
    );
}
