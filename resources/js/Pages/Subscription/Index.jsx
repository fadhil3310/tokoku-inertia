import React, { useMemo, useState } from "react";
import { HomeIcon, ChevronRightIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { Head, Link, router } from "@inertiajs/react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { toast } from "sonner";

// Helper utility to format currencies uniformly
function formatRupiah(amount) {
    if (amount == 0) return "Free";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function Subscription({ plans = [], currentSubscription = null }) {
    const [processingPlanId, setProcessingPlanId] = useState(null);

    // Determine if the user is currently on any premium plan
    const activePlanId = useMemo(() => {
        if (!currentSubscription || currentSubscription.status === 'expired') return null;
        return currentSubscription.plan_id;
    }, [currentSubscription]);

    // Checking if the user is on the free/starter plan (no premium plan active)
    const isStarterActive = !activePlanId;

    const handleSubscriptionAction = async (planId) => {
        setProcessingPlanId(planId);
        try {
            const response = await fetch(route("subscription.checkout"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                body: JSON.stringify({
                    planId: planId,
                    method: "midtrans",
                }),
            });

            const data = await response.json();
            
            if (data.orderId == null || data.paymentUrl == null) {
                throw new Error("Invalid check out transaction parameter mappings returned.");
            }

            // Open the Midtrans Snap page in a separate browser tab
            window.open(data.paymentUrl, "_blank");

            // Redirect the main application view directly into the polling loader screen wrapper
            router.visit(route("subscription.checkPaymentStatus", { orderId: data.orderId }), {
                viewTransition: true,
            });

        } catch (error) {
            console.error("Subscription purchase check out initiation failed:", error);
            toast.error("Failed to initiate checkout process. Please try again.");
        } finally {
            setProcessingPlanId(null);
        }
    };

    return (
        <DashboardLayout>
            <Head title="Subscription Management" />
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
                        href={"/subscription"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Subscription
                    </Link>
                </nav>

                <div className="rounded-lg p-4 md:p-8 max-w-5xl mx-auto">
                    
                    {/* --- CURRENT SUBSCRIPTION BANNER --- */}
                    {currentSubscription && (
                        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Your Active Subscription</p>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {currentSubscription.plan_name} Tier Plan
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Active cycle window valid until: <strong className="text-gray-900">{currentSubscription.end_date}</strong>
                                </p>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <span 
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize border ${
                                        currentSubscription.status === "active"
                                            ? "bg-green-50 text-green-600 border-green-200"
                                            : currentSubscription.status === "pending"
                                            ? "bg-amber-50 text-amber-500 border-amber-200"
                                            : "bg-red-50 text-red-500 border-red-200"
                                    }`}
                                >
                                    {currentSubscription.status}
                                </span>
                                
                                <Button 
                                    onClick={() => handleSubscriptionAction(currentSubscription.plan_id)}
                                    className="text-sm py-2 px-4 shadow-sm"
                                    disabled={processingPlanId !== null}
                                >
                                    {processingPlanId === currentSubscription.plan_id ? "Processing..." : "Renew Plan"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* --- SECTION HEADING --- */}
                    <div className="rounded-lg p-6 md:p-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center sm:text-left">
                            Subscription Plan
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl mx-auto items-stretch">
                            
                            {/* --- HARDCODED STARTER PLAN CARD --- */}
                            <div className={`bg-white rounded-xl flex flex-col px-8 py-8 shadow relative transition-all ${isStarterActive ? "border-2 border-blue-500" : ""}`}>
                                <h3 className="font-bold text-xl mb-4">Starter</h3>
                                <div className="mb-5">
                                    <span className="font-bold text-2xl text-blue-500">Free</span>
                                </div>
                                <ul className="text-slate-600 mb-5 flex-1">
                                    {[
                                        { text: '10 Products', included: true },
                                        { text: 'No Analytics', included: false },
                                        { text: 'No Custom Catalog', included: false },
                                    ].map((item) => (
                                        <li key={item.text} className="py-2 text-sm border-b border-slate-200">
                                            <span className={`font-bold mr-1 ${item.included ? 'text-blue-500' : 'text-gray-400'}`}>
                                                {item.included ? '✓' : '✗'}
                                            </span>
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    className={`mt-auto ${isStarterActive ? "opacity-50 cursor-not-allowed" : ""}`} 
                                    variant={isStarterActive ? "outline" : "default"} 
                                    disabled={isStarterActive}
                                >
                                    {isStarterActive ? "Current Plan" : "Downgrade"}
                                </Button>
                            </div>

                            {/* --- DYNAMIC PRO / PREMIUM PLAN CARDS --- */}
                            {plans.filter(plan => plan.price > 0).map((plan) => {
                                const isCurrentTier = activePlanId === plan.id;
                                const isProcessing = processingPlanId === plan.id;
                                
                                return (
                                    <div 
                                        key={plan.id} 
                                        className={`bg-white rounded-xl flex flex-col px-8 py-8 shadow relative border-2 sm:scale-105 transition-all ${
                                            isCurrentTier ? "border-blue-500 shadow-md" : "border-blue-500"
                                        }`}
                                    >
                                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 px-4 py-1 rounded-full text-white font-medium text-sm text-nowrap">
                                            Popular
                                        </span>
                                        <h3 className="font-bold text-xl mb-4">{plan.name}</h3>
                                        <div className="mb-5">
                                            <span className="font-bold text-2xl text-blue-500">
                                                {formatRupiah(plan.price)}
                                            </span>
                                            <span className="text-slate-600">/month</span>
                                        </div>
                                        
                                        <ul className="text-slate-600 mb-5 space-y-0 flex-1">
                                            {plan.description && Array.isArray(plan.description) ? (
                                                plan.description.map((feature, idx) => (
                                                    <li key={idx} className="py-2 text-sm border-b border-slate-200 flex items-start gap-1">
                                                        <span className="font-bold text-blue-500 mr-1">✓</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-sm text-gray-400 italic py-2">Features loaded dynamically</li>
                                            )}
                                        </ul>

                                        <Button 
                                            className={`w-full mt-auto ${(isCurrentTier || processingPlanId !== null) ? "opacity-50 cursor-not-allowed" : ""}`} 
                                            variant={isCurrentTier ? "outline" : "default"}
                                            disabled={isCurrentTier || processingPlanId !== null}
                                            onClick={() => handleSubscriptionAction(plan.id)}
                                        >
                                            {isCurrentTier ? "Current Plan" : isProcessing ? "Processing..." : "Upgrade"}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                </div>
            </div>
        </DashboardLayout>
    );
}