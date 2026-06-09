import React from 'react';
import LandingPageLayout from '@/Layouts/LandingPageLayout';
import { Head, Link } from '@inertiajs/react';

// Helper utility to format currencies uniformly
function formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function Pricing({ plans = [] }) {
    return (
        <LandingPageLayout>
            <Head title="Pricing" />
            
            <div className="bg-slate-50 min-h-screen pb-24 pt-36 px-6">
                <div className="max-w-5xl mx-auto">
                    
                    {/* --- HEADER --- */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Transparent Pricing, No Hidden Fees</h1>
                        <p className="text-lg text-slate-600">Choose the perfect plan for your event needs. Upgrade anytime as your business grows.</p>
                    </div>

                    {/* --- PRICING CARDS GRID --- */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                        
                        {/* --- HARDCODED STARTER PLAN CARD --- */}
                        <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-md transition-all duration-300 flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                                <p className="text-slate-500 min-h-[48px]">Perfect for testing the waters and organizing small scale events.</p>
                            </div>

                            <div className="mb-6">
                                <span className="font-black text-3xl text-blue-600">Free</span>
                            </div>

                            {/* Hardcoded Feature Checklist */}
                            <ul className="text-slate-600 mb-8 space-y-1 flex-1">
                                {[
                                    { text: '1 Event', included: true },
                                    { text: '1 Booth Category', included: true },
                                    { text: 'Up to 10 Tenants', included: true },
                                    { text: 'Landing Page Feature', included: false },
                                    { text: 'Advanced Analytics', included: false },
                                ].map((item) => (
                                    <li key={item.text} className="py-2 text-sm border-b border-slate-100 flex items-center">
                                        <span className={`font-bold mr-3 text-base ${item.included ? 'text-blue-500' : 'text-gray-300'}`}>
                                            {item.included ? '✓' : '✗'}
                                        </span>
                                        <span className={item.included ? 'text-gray-700' : 'text-gray-400'}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link 
                                href="/signup"
                                className="w-full text-center font-bold py-4 rounded-xl transition-colors bg-slate-100 hover:bg-slate-200 text-slate-900"
                            >
                                Get Started Free
                            </Link>
                        </div>

                        {/* --- DYNAMIC PREMIUM PLANS FROM DATABASE --- */}
                        {plans.map((plan) => (
                            <div 
                                key={plan.id} 
                                className="relative bg-white rounded-3xl p-8 border border-blue-500 shadow-xl shadow-blue-100 transform md:-translate-y-2 transition-all duration-300 flex flex-col"
                            >
                                {/* Most Popular Badge */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-blue-600 text-white text-sm font-bold uppercase tracking-wider py-1 px-4 rounded-full text-nowrap">
                                        Most Popular
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    <p className="text-slate-500 min-h-[48px]">
                                        {plan.description ?? "The ultimate tier for professional Event Organizers."}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <span className="text-4xl font-black text-slate-900">
                                        {formatRupiah(plan.price)}
                                    </span>
                                    <span className="text-slate-500 font-medium text-sm ml-1">/month</span>
                                </div>

                                {/* Features List loaded dynamically from the casted JSON column array */}
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.description && Array.isArray(plan.description) ? (
                                        plan.description.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-slate-600 text-sm">{feature}</span>
                                            </li>
                                        ))
                                    ) : (
                                        // Fallback default array loop if description isn't saved as a string array format
                                        [
                                            "Unlimited Products & Tenants",
                                            "Full Sale Analytics",
                                            "Custom Domain Integration",
                                            "Priority WhatsApp Support"
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-slate-600 text-sm">{feature}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>

                                <Link 
                                    href="/subscription"
                                    className="w-full text-center font-bold py-4 rounded-xl transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                                >
                                    Upgrade to {plan.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </LandingPageLayout>
    );
}