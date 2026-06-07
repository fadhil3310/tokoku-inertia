import React from "react";
import { useMemo } from "react";
import { Link } from "@inertiajs/react";
import Button from "../../Components/Buttons";
import { CatalogueIcon, InvoicePaperIcon } from "../../Components/Icons";

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function TenantDashboard({ booth, stats }) {
    const formattedTotalRevenue = useMemo(() => {
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Math.abs(stats.revenue.today));
        return formatted;
    }, [stats.revenue.today]);

    return (
        <div className="p-4 lg:p-6 w-full">
            <nav className="flex items-center space-x-2 text-sm mb-6">
                <Link
                    href="/"
                    className="flex items-center text-gray-700 hover:text-blue-500 fill-current"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.5578 5.53423C12.6873 4.69887 11.3127 4.69887 10.4422 5.53423L5.81574 9.97357C5.70239 10.0823 5.62614 10.224 5.5978 10.3785C5.04367 13.4004 5.00277 16.494 5.47681 19.5295L5.58933 20.25H8.56579V14.0387C8.56579 13.6244 8.90158 13.2887 9.31579 13.2887H14.6842C15.0984 13.2887 15.4342 13.6244 15.4342 14.0387V20.25H18.4107L18.5232 19.5295C18.9972 16.494 18.9563 13.4004 18.4022 10.3785C18.3739 10.224 18.2976 10.0823 18.1843 9.97357L13.5578 5.53423ZM9.40363 4.45191C10.8546 3.05965 13.1454 3.05965 14.5964 4.45191L19.2228 8.89125C19.5634 9.21804 19.7925 9.64373 19.8776 10.108C20.4621 13.2956 20.5053 16.559 20.0052 19.7609L19.8245 20.9184C19.7497 21.3971 19.3374 21.75 18.8529 21.75H14.6842C14.27 21.75 13.9342 21.4142 13.9342 21V14.7887H10.0658V21C10.0658 21.4142 9.73 21.75 9.31579 21.75H5.14706C4.66258 21.75 4.25029 21.3971 4.17554 20.9184L3.99478 19.7609C3.49473 16.559 3.53788 13.2956 4.12241 10.108C4.20754 9.64373 4.43662 9.21804 4.77719 8.89125L9.40363 4.45191Z"
                        />
                    </svg>
                </Link>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.96967 7.46967C10.2626 7.17678 10.7374 7.17678 11.0303 7.46967L15.0303 11.4697C15.3232 11.7626 15.3232 12.2374 15.0303 12.5303L11.0303 16.5303C10.7374 16.8232 10.2626 16.8232 9.96967 16.5303C9.67678 16.2374 9.67678 15.7626 9.96967 15.4697L13.4393 12L9.96967 8.53033C9.67678 8.23744 9.67678 7.76256 9.96967 7.46967Z"
                    />
                </svg>
                <Link
                    href="/dashboard"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                >
                    Dashboard
                </Link>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            Total Revenue
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mb-2">
                            {formattedTotalRevenue}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 border border-green-400 rounded-lg px-2 py-0.5 text-xs flex items-center gap-1">
                                {stats.revenue.percentageChange}%
                            </span>
                            <span>from yesterday</span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100 text-green-400 fill-current">
                        <span className="font-bold">Rp</span>
                    </div>
                </div>

                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            Total Orders
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mb-2">
                            {stats.orders.today}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 border border-green-400 rounded-lg px-2 py-0.5 text-xs flex items-center gap-1">
                                {stats.orders.percentageChange}%
                            </span>
                            <span>from yesterday</span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100 text-green-400 fill-current">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M7.53033 6.53033C7.82322 6.23744 7.82322 5.76256 7.53033 5.46967C7.23744 5.17678 6.76256 5.17678 6.46967 5.46967L4.46967 7.46967C4.17678 7.76256 4.17678 8.23744 4.46967 8.53033L6.46967 10.5303C6.76256 10.8232 7.23744 10.8232 7.53033 10.5303C7.82322 10.2374 7.82322 9.76256 7.53033 9.46967L6.81066 8.75H17C17.4142 8.75 17.75 8.41421 17.75 8C17.75 7.58579 17.4142 7.25 17 7.25H6.81066L7.53033 6.53033Z" />
                            <path d="M16.4697 13.4697C16.1768 13.7626 16.1768 14.2374 16.4697 14.5303L17.1893 15.25H7C6.58579 15.25 6.25 15.5858 6.25 16C6.25 16.4142 6.58579 16.75 7 16.75H17.1893L16.4697 17.4697C16.1768 17.7626 16.1768 18.2374 16.4697 18.5303C16.7626 18.8232 17.2374 18.8232 17.5303 18.5303L19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697L17.5303 13.4697C17.2374 13.1768 16.7626 13.1768 16.4697 13.4697Z" />
                        </svg>
                    </div>
                </div>

                <div className="rounded-lg transition-all duration-200 relative overflow-hidden flex items-start justify-between flex-1 gap-2">
                    <Button
                        href={route("catalog", { boothId: booth.id })}
                        target="_blank"
                        className={
                            "flex items-center w-full h-full cursor-pointer"
                        }
                        variant={"outline"}
                    >
                        <CatalogueIcon />
                        <span>Open Catalog</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1">
                        <h2 className="font-bold text-gray-700 mb-1">
                            Recent Transactions
                        </h2>
                        <div className="flex-1 space-y-4">
                            {stats.recentPayments?.length > 0 ? (
                                stats.recentPayments.map(
                                    (transaction, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-3 border-b border-gray-400 last:border-0"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-700">
                                                    {transaction.product_name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {capitalizeFirstLetter(
                                                        transaction.payment_method
                                                    )}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    Rp{transaction.grand_total}
                                                </p>
                                                <span className="bg-green-100 px-2 py-0.5 text-xs rounded-lg">
                                                    {capitalizeFirstLetter(
                                                        transaction.status
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <p>No transactions</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-lg transition-all duration-200 relative overflow-hidden flex items-start justify-between flex-1 gap-2">
                    <Button
                        href={"/transactions/form"}
                        className={
                            "flex items-center w-full h-full cursor-pointer"
                        }
                    >
                        <InvoicePaperIcon />
                        <span>Create Invoice</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
