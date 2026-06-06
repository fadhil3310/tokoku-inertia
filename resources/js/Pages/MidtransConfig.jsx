import DashboardLayout from "../Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardActions } from "../Components/Card";
import {
    AddIcon,
    CatalogueIcon,
    CircleAddIcon,
    HomeIcon,
    ChevronRightIcon,
    InfoIcon,
} from "../Components/Icons";
import Button from "../Components/Buttons";
import { useCallback } from "react";

const inputClass =
    "w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";

const errorClass = "mt-1 text-xs text-red-500";

export default function MidtransConfig({ serverKey, clientKey }) {
    const { data, setData, post, processing, errors } = useForm({
        server_key: serverKey,
        client_key: clientKey,
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        post(route("payment-link.store"), {
            preserveScroll: true,
        });
    }, []);

    return (
        <DashboardLayout>
            <Head title="Payment" />
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
                        Payment Link
                    </Link>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Payment Link</CardTitle>
                    </CardHeader>
                </Card>

                <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-4">
                    <div className="bg-white rounded-lg p-4 md:p-6">
                        <div className="overflow-x-auto">
                            <h3 className="text-xl font-medium mb-0.5">
                                Midtrans Configuration
                            </h3>
                            <p className="text-sm opacity-60 mb-3">
                                Note: Don't tell your key to anyone, keep it
                                secret
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="server_key"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Server Key
                                    </label>
                                    <input
                                        id="server_key"
                                        type="text"
                                        value={data.server_key}
                                        onChange={(e) =>
                                            setData(
                                                "server_key",
                                                e.target.value
                                            )
                                        }
                                        className={inputClass}
                                    />
                                    {errors.server_key && (
                                        <div className={errorClass}>
                                            {errors.server_key}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="client_key"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Client Key
                                    </label>
                                    <input
                                        id="client_key"
                                        type="text"
                                        value={data.client_key}
                                        onChange={(e) =>
                                            setData(
                                                "client_key",
                                                e.target.value
                                            )
                                        }
                                        className={inputClass}
                                    />
                                    {errors.client_key && (
                                        <div className={errorClass}>
                                            {errors.client_key}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        submit
                                    >
                                        {processing ? "Saving..." : "Update"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <Card className="p-6">
                        {/* <h3 className="mb-2 text-2xl font-semibold">What is this?</h3> */}
                        <div className="w-full flex justify-center">
                            <img src="/images/midtrans_why.png" />
                        </div>
                        <div className="flex mt-4 gap-1">
                            <InfoIcon size={24} className="shrink-0 mt-0" />
                            <p className="">
                                To allow customers to pay seamlessly via
                                E-Wallet/Bank, Tokoku uses
                                <strong> Midtrans</strong> as our payment
                                gateway solution.
                                <br />
                                <span className="text-xs opacity-60 pt-2 block">
                                    See their{" "}
                                    <a
                                        href="https://midtrans.com/promoenginetnc"
                                        className="text-blue-600 underline"
                                    >
                                        terms of service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="https://midtrans.com/id/pemberitahuan-privasi"
                                        className="text-blue-600 underline"
                                    >
                                        privacy policy
                                    </a>{" "}
                                    before continuing. Tokoku held no liability
                                    in any errors caused by them.
                                </span>
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
