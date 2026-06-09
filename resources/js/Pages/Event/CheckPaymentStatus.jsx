import React, { useCallback } from "react";
import { Head, Link } from "@inertiajs/react";
import Header from "../../Components/Header";
import Button from "../../Components/Buttons";

function StatusSectionFailed({ info }) {
    return (
        <StatusSection
            icon={
                <svg
                    className="w-16 h-16 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
            title="Payment Failed"
            message="Oops, there's something wrong when we try to process your ticket registration payment (╯‵□′)╯︵┻━┻"
        >
            <Link href="/" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors border border-gray-200">
                Return to Home
            </Link>
        </StatusSection>
    );
}

function StatusSectionSuccess({ info }) {
    return (
        <StatusSection
            icon={
                <svg
                    className="w-16 h-16 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
            title="Booking Completed"
            message="Your ticket booth registration has been fully paid and successfully completed!"
        >
            <Link href="/" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm">
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
                    className="w-16 h-16 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
            title="Payment Pending"
            message="Your booth allocation is secured temporarily. Please complete your transaction to finalize the booking."
        >
            <Button className="w-full py-2.5 px-5 font-semibold text-sm" onClick={handleButtonClick}>
                Complete Payment Now
            </Button>
        </StatusSection>
    );
}

function StatusSection({ icon, title, message, children }) {
    return (
        <div className="flex flex-col items-center text-center p-2">
            <div className="mb-4">{icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">{message}</p>
            {children}
        </div>
    );
}

export default function CheckPaymentStatus({ status, info }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-16">
            <Head title="Registration Payment Status - Tokoku" />

            {/* Global Context Navigation Navbar */}
            <Header />

            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 mt-16 flex justify-center items-center">
                <div className="w-full max-w-md bg-white border border-gray-100 shadow-md rounded-2xl p-6 md:p-8 animate-[slide-from-bottom_0.35s_var(--ease-out-quint)]">
                    {status === "pending" ? (
                        <StatusSectionPending info={info} />
                    ) : status === "completed" ? (
                        <StatusSectionSuccess info={info} />
                    ) : (
                        <StatusSectionFailed info={info} />
                    )}
                </div>
            </main>
        </div>
    );
}