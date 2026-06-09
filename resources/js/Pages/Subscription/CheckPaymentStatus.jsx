import React, { useCallback } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Button from "../../Components/Buttons";
import { Head, Link } from "@inertiajs/react";
import { HomeIcon, ChevronRightIcon } from "../../Components/Icons";

function StatusSectionFailed() {
    return (
        <StatusSection
            icon={
                <svg
                    width="64"
                    height="64"
                    fill="red"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939 8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12l3.005-3.005Z"></path>
                </svg>
            }
            title="Checkout Failed"
            message="Oops, there's something wrong when we try to process your subscription payment (╯‵□′)╯︵┻━┻"
        >
            <Link 
                href={route('subscription.index')} 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium text-sm transition-colors border border-gray-200"
            >
                Back to Plans
            </Link>
        </StatusSection>
    );
}

function StatusSectionSuccess() {
    return (
        <StatusSection
            icon={
                <svg
                    width="64"
                    height="64"
                    fill="green"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M7.483 5.26A2.486 2.486 0 0 0 5.29 7.422a39.402 39.402 0 0 0 0 9.154 2.486 2.486 0 0 0 2.193 2.163c2.977.333 6.057.333 9.034 0a2.486 2.486 0 0 0 2.192-2.163c.256-2.185.328-4.386.216-6.58a.2.2 0 0 1 .059-.152l1.038-1.04a.198.198 0 0 1 .339.125 40.903 40.903 0 0 1-.162 7.822c-.215 1.836-1.69 3.275-3.516 3.48a42.5 42.5 0 0 1-9.366 0c-1.827-.205-3.302-1.644-3.516-3.48a40.903 40.903 0 0 1 0-9.504c.214-1.837 1.69-3.275 3.516-3.48a42.502 42.502 0 0 1 9.366 0 3.989 3.989 0 0 1 1.76.64.19.19 0 0 1 .025.295l-.803.803a.211.211 0 0 1-.25.033 2.488 2.488 0 0 0-.898-.28 41.001 41.001 0 0 0-9.034 0Z"></path>
                    <path d="M21.03 6.03a.75.75 0 1 0-1.06-1.06l-8.47 8.47-2.47-2.47a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l9-9Z"></path>
                </svg>
            }
            title="Upgrade Success"
            message="Your subscription tier has been fully paid and upgraded successfully!"
        >
            <Link 
                href="/dashboard" 
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
            >
                Go to Dashboard
            </Link>
        </StatusSection>
    );
}

function StatusSectionPending({ info }) {
    const handleButtonClick = useCallback(() => {
        if (info?.paymentUrl) {
            window.open(info.paymentUrl, "_blank");
        }
    }, [info]);

    return (
        <StatusSection
            icon={
                <svg
                    width="64"
                    height="64"
                    fill="orange"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12.75 7a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 .352.636l3 1.875a.75.75 0 1 0 .796-1.272l-2.648-1.655V7Z"></path>
                    <path
                        fillRule="evenodd"
                        d="M12 3.25a8.75 8.75 0 1 0 0 17.5 8.75 8.75 0 0 0 0-17.5ZM4.75 12a7.25 7.25 0 1 1 14.5 0 7.25 7.25 0 0 1-14.5 0Z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            }
            title="Payment Pending"
            message="Your upgrade request is processing. Please finalize transaction parameters within the gateway page."
        >
            {info?.paymentUrl && (
                <Button className="w-full py-2" onClick={handleButtonClick}>
                    Click here to do payment
                </Button>
            )}
        </StatusSection>
    );
}

function StatusSection({ icon, title, message, children }) {
    return (
        <div className="flex flex-col items-center text-center p-4">
            <div className="mb-2">{icon}</div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{title}</p>
            <p className="mb-6 text-gray-600 text-sm max-w-xs">{message}</p>
            {children}
        </div>
    );
}

export default function CheckPaymentStatus({ status, info }) {
    return (
        <DashboardLayout>
            <Head title="Subscription Payment Status" />
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
                        href={route("subscription.index")}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Subscription
                    </Link>
                    <ChevronRightIcon />
                    <span className="text-gray-400">Status</span>
                </nav>

                <div className="w-full flex justify-center mt-10">
                    <div className="w-full max-w-md bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-8 animate-[slide-from-bottom_0.35s_var(--ease-out-quint)]">
                        {status === "pending" ? (
                            <StatusSectionPending info={info} />
                        ) : status === "completed" || status === "active" ? (
                            <StatusSectionSuccess />
                        ) : (
                            <StatusSectionFailed />
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}