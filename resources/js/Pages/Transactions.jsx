import React from "react";
import { Link, Head } from "@inertiajs/react";
import DashboardLayout from "./DashboardLayout";
import Button from "../Components/Buttons";
import { Card, CardHeader, CardTitle, CardActions } from "../Components/Card";

export default function Transactions() {
    return (
        <DashboardLayout>
            <Head title="Transactions"/>
            <div className="p-4 lg:p-6 min-h-screen w-full">
                <nav className="flex items-center space-x-2 text-sm mb-6">
                    <a
                        onClick="parent.postMessage({ 'type': 'dashboard' }, '*')"
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
                    </a>
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
                    <a
                        href=""
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Transactions
                    </a>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardActions>
                            <Button className="text-nowrap">
                                See all transactions
                            </Button>
                        </CardActions>
                    </CardHeader>
                </Card>

                <div
                    id="calendar-container"
                    className="bg-[url('../img/calendar-grid-3.png')] rounded-lg border-[4px] border-[#00000050] border-double"
                >
                    <div className="flex items-center gap-4 py-1">
                        <div className="w-full h-[18px] bg-[url('../img/calendar-decor.png')] opacity-50"></div>
                        <p className="underline decoration-[#ee3d00] decoration-[1.5px] decoration-wavy text-center text-3xl font-semibold text-shadow-[0_2px_4px_white,0_-2px_4px_white]">
                            2024
                        </p>
                        <div className="w-full h-[18px] bg-[url('../img/calendar-decor.png')] opacity-50"></div>
                    </div>
                    <div className="grid md:grid-cols-4 lg:grid-cols-6 place-items-end [&>div]:odd:bg-[#ffffff90] [&>div]:odd:backdrop-contrast-[1.75] [&>.month-card]:hover:shadow-[0_2px_8px_4px_#00000020] [&>.month-card]:hover:translate-y-[-2px] [&>.month-card]:hover:backdrop-contrast-[5] [&>.month-card]:cursor-pointer [&>div]:transition-shadow [&>div]:transition-transform ">
                        <div className="max-lg:hidden"></div>
                        <div className="max-lg:hidden"></div>
                        <div className=""></div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">October</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-t-[1px] border-r-[1px] border-b-[1px] border-[#00000050] !bg-[#ffa8f44f] backdrop-sepia-50 backdrop-contrast[1.5]">
                            <p className="font-[Fredoka] text-xl">November</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#000000c0] text-sm font-bold">
                                No Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-t-[1px] border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">December</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-1">
                        <div className="w-full h-[18px] bg-[url('../img/calendar-decor.png')] opacity-50"></div>
                        <p className="underline decoration-[green] decoration-[1.5px] decoration-wavy text-center text-3xl font-semibold text-shadow-[0_2px_4px_white,0_-2px_4px_white]">
                            2025
                        </p>
                        <div className="w-full h-[18px] bg-[url('../img/calendar-decor.png')] opacity-50"></div>
                    </div>
                    <div className="grid md:grid-cols-4 lg:grid-cols-6 border-l-1 border-t-1 border-[#00000050] [&>div]:odd:bg-[#ffffff90] [&>div]:odd:backdrop-contrast-[1.75] [&>div]:even:bg-[#ffffff50] [&>div]:even:backdrop-sepia-100 [&>div]:hover:shadow-[0_2px_8px_4px_#00000020,0_1px_0px_0px_#00000080_inset] [&>div]:hover:translate-y-[-2px] [&>div]:hover:backdrop-contrast-[5] [&>.month-card]:cursor-pointer [&>div]:transition-shadow [&>div]:transition-transform ">
                        <div className="month-card w-full h-[150px] p-3 flex flex-col  border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">January</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">February</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050] !bg-[#ffa8f44f] backdrop-sepia-50 backdrop-contrast[1.5]">
                            <p className="font-[Fredoka] text-xl">March</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#000000c0] text-sm font-bold">
                                No Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">April</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050] !bg-[#ffa8f44f] backdrop-sepia-50 backdrop-contrast[1.5]">
                            <p className="font-[Fredoka] text-xl">May</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#000000c0] text-sm font-bold">
                                No Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050] !bg-[#ffa8f44f] backdrop-sepia-50 backdrop-contrast[1.5]">
                            <p className="font-[Fredoka] text-xl">June</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#000000c0] text-sm font-bold">
                                No Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">July</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050] !bg-[#ffa8f44f] backdrop-sepia-50 backdrop-contrast[1.5]">
                            <p className="font-[Fredoka] text-xl">August</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#000000c0] text-sm font-bold">
                                No Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">September</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">October</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050] !bg-[#ffa8f44f] backdrop-sepia-50 backdrop-contrast[1.5]">
                            <p className="font-[Fredoka] text-xl">November</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#000000c0] text-sm font-bold">
                                No Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">December</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-1">
                        <div className="w-full h-[18px] bg-[url('../img/calendar-decor.png')] opacity-50"></div>
                        <p className="underline decoration-[#0000ff] decoration-[1.5px] decoration-wavy text-center text-3xl font-semibold text-shadow-[0_2px_4px_white,0_-2px_4px_white]">
                            2026
                        </p>
                        <div className="w-full h-[18px] bg-[url('../img/calendar-decor.png')] opacity-50"></div>
                    </div>
                    <div className="grid md:grid-cols-4 lg:grid-cols-6 border-l-1 border-t-1 border-[#00000050] [&>div]:odd:bg-[#ffffff90] [&>div]:odd:backdrop-contrast-[1.75] [&>div]:even:bg-[#ffffff50] [&>div]:even:backdrop-sepia-100 [&>div]:hover:shadow-[0_2px_8px_4px_#00000020,0_1px_0px_0px_#00000080_inset] [&>div]:hover:translate-y-[-2px] [&>div]:hover:backdrop-contrast-[5] [&>.month-card]:cursor-pointer [&>div]:transition-shadow [&>div]:transition-transform ">
                        <div className="month-card w-full h-[150px] p-3 flex flex-col  border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">January</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">February</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050] !bg-[#ffa8f44f] backdrop-sepia-50 backdrop-contrast[1.5]">
                            <p className="font-[Fredoka] text-xl">March</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#000000c0] text-sm font-bold">
                                No Transactions
                            </p>
                        </div>
                        <div className="month-card w-full h-[150px] p-3 flex flex-col bg-white border-r-[1px] border-b-[1px] border-[#00000050]">
                            <p className="font-[Fredoka] text-xl">April</p>
                            <p className="h-full text-base text-[#000000B2]">
                                2025
                            </p>

                            <p className="text-[#2F855A] text-lg font-bold">
                                + Rp 325.500
                            </p>
                            <p className="text-[#00000085] text-sm font-medium">
                                21 Transactions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
