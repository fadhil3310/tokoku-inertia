import React, { useEffect } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, usePage } from "@inertiajs/react";
import { Card, CardHeader, CardTitle } from "../../Components/Card";
import { HomeIcon, ChevronRightIcon } from "../../Components/Icons";
import { toast } from "sonner";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

// Helper function to format prices into clean IDR representation
function formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function Index({ payments = [] }) {
    const { flash } = usePage();

    // Map the incoming backend payload arrays cleanly to data rows
    const data = payments.map((p) => [
        p.id,
        p.booth_name,
        p.event_name,
        p.ticket_name,
        p.payment_method,
        p.grand_total, // Kept raw number format in index 5 for programmatic format evaluation
        p.status,
        p.created_at,
    ]);

    const columns = [
        "Order ID",
        "Tenant Name",
        "Event Name",
        "Booth Type",
        {
            name: "Method",
            formatter: (cell) => h("span", { className: "uppercase font-medium text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded" }, cell)
        },
        {
            name: "Total Revenue",
            formatter: (cell) => h("span", { className: "font-bold text-gray-900" }, formatRupiah(cell))
        },
        {
            name: "Status",
            formatter: (cell) => {
                let badgeClass = "text-amber-600 bg-amber-50 border-amber-200";
                if (cell === "completed") badgeClass = "text-green-600 bg-green-50 border-green-200";
                if (cell === "canceled") badgeClass = "text-red-600 bg-red-50 border-red-200";

                return h(
                    "span",
                    { className: `capitalize font-semibold text-xs border px-2.5 py-1 rounded-full ${badgeClass}` },
                    cell === "completed" ? "Paid" : cell
                );
            }
        },
        "Transaction Date"
    ];

    useEffect(() => {
        if (flash?.status != null) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <DashboardLayout>
            <Head title="Registration Payments" />
            <div className="p-4 lg:p-6 min-h-screen w-full">
                
                {/* --- BREADCRUMBS --- */}
                <nav className="flex items-center space-x-2 text-sm mb-6">
                    <Link
                        href={"/dashboard"}
                        className="flex items-center text-gray-700 hover:text-blue-500 fill-current"
                    >
                        <HomeIcon />
                    </Link>
                    <ChevronRightIcon />
                    <Link
                        href={"/ticket-payments"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Ticket Payments
                    </Link>
                </nav>

                {/* --- HEADER TITLE CARD (No action buttons included) --- */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Booth Registration Payments</CardTitle>
                    </CardHeader>
                </Card>

                {/* --- DATA TABLE CONTAINER --- */}
                <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
                    <div className="overflow-x-auto">
                        <Grid
                            data={data}
                            columns={columns}
                            search={true}
                            language={{
                                search: {
                                    placeholder: "Search transaction logs...",
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