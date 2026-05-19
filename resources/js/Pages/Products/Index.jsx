import React, { useEffect } from "react";
import DashboardLayout from "../DashboardLayout";
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

export default function Index({ products, error }) {
    const { flash } = usePage();

    const data = products.map((p) => [
        p.id,
        p.name,
        p.description,
        p.price,
        p.created_at,
    ]);

    console.log(data);

    const columns = [
        "Id",
        "Name",
        "Description",
        "Price",
        "Created",
        {
            name: 'Actions',
            formatter: (_, row) => {
                const id = row.cells[0].data;
                return h('a', {
                    href: route('products.show', id),
                    className: 'cursor-pointer inline-flex items-center justify-center rounded-md transition-colors px-3 py-1.5 text-sm text-blue-500 hover:bg-blue-50'
                }, 'View');
            }
        }
    ];

    useEffect(() => {
        if (flash.status != null) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <DashboardLayout>
            <Head title="Products" />
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
                        href={"/products"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Products
                    </Link>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardActions>
                            <Button variant="outline" className="text-nowrap">
                                <CatalogueIcon />
                                <span>Open Catalog</span>
                            </Button>
                            <Button
                                className="text-nowrap"
                                href="/products/create"
                            >
                                <CircleAddIcon />
                                <span>Add Product</span>
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
                                    placeholder: "Search products...",
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
