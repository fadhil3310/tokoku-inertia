import React, { useEffect, useMemo } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, usePage } from "@inertiajs/react";
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

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Show({ transaction, productName }) {
    const formattedPrice = useMemo(() => {
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Math.abs(transaction.price));
        return formatted;
    }, [transaction.price]);

    const formattedTotal = useMemo(() => {
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Math.abs(transaction.grand_total));
        return formatted;
    }, [transaction.grand_total]);

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
                        href={"/transactions/" + transaction.id}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        {productName}
                    </Link>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Transaction</CardTitle>
                    </CardHeader>
                </Card>

                <div className="bg-white rounded-lg p-4 md:p-6 space-y-2">
                    <div>
                        <p>Product name:</p>
                        <p className="text-lg font-medium">{productName}</p>
                    </div>

                    <div>
                        <p>Created at:</p>
                        <p className="text-lg font-medium">
                            {transaction.created_at}
                        </p>
                    </div>

                    <div>
                        <p>Amount:</p>
                        <p className="text-lg font-medium">
                            {transaction.amount}
                        </p>
                    </div>

                    <div>
                        <p>Price (item):</p>
                        <p className="text-lg font-medium">{formattedPrice}</p>
                    </div>

                    <div>
                        <p>Total:</p>
                        <p className="text-lg font-medium">{formattedTotal}</p>
                    </div>

                    <div>
                        <p>Payment method</p>
                        <p className="text-lg font-medium">
                            {capitalizeFirstLetter(transaction.payment_method)}
                        </p>
                    </div>

                    <div>
                        <p>Payment status</p>
                        <p className="text-lg font-medium">
                            {capitalizeFirstLetter(transaction.status)}
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
