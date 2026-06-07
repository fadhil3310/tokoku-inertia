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
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Index({ transactions, error }) {
    const { flash } = usePage();

    const data = useMemo(
        () =>
            transactions.map((p) => [
                p.id,
                p.product_name,
                p.amount,
                p.grand_total,
                p.payment_method,
                p.status,
                p.created_at,
            ]),
        [transactions]
    );

    const columns = [
        "Id",
        "Nama Produk",
        "Jumlah",
        "Total",
        {
            name: "Metode Pembayaran",
            formatter: (cell) => capitalizeFirstLetter(cell),
        },
        {
            name: "Status",
            formatter: (cell) => capitalizeFirstLetter(cell),
        },
        {
            name: "Created",
            formatter: (cell) => {
                const date = new Date(cell);
                const formattedDate = new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }).format(date);
                return formattedDate.replace(",", "");
            },
        },
        {
            name: "Actions",
            formatter: (_, row) => {
                const id = row.cells[0].data;
                return h(
                    "a",
                    {
                        href: route("transactions.show", id),
                        className:
                            "cursor-pointer inline-flex items-center justify-center rounded-md transition-colors px-3 py-1.5 text-sm text-blue-500 hover:bg-blue-50",
                    },
                    "View"
                );
            },
        },
    ];

    useEffect(() => {
        if (flash.status != null) {
            toast.success(flash.message);
        }
    }, [flash]);

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
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardActions>
                            <Button
                                className="text-nowrap"
                                href={route('transactions.create')}
                            >
                                <CircleAddIcon />
                                <span>Add Transaction</span>
                            </Button>
                        </CardActions>
                    </CardHeader>
                </Card>

                <div className="bg-white rounded-lg p-4 md:p-6">
                    <div className="overflow-x-auto">
                        <Grid
                            data={data}
                            columns={columns}
                            search={true}
                            language={{
                                search: {
                                    placeholder: "Search transactions...",
                                },
                            }}
                            pagination={{
                                limit: 10,
                            }}
                            sort={true}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
