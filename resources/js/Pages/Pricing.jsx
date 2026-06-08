import React from 'react';
import LandingPageLayout from '@/Layouts/LandingPageLayout';
import { Head, Link } from '@inertiajs/react';

export default function Pricing({ plans }) {
    
    const defaultPlans = [
        {
            id: 1,
            name: "Starter",
            price: 0,
            description: "Perfect for testing the waters and small events.",
            features: [
                "Up to 10 Products",
                "Basic Event Management",
                "Standard Help Center Access",
                "No Custom Domain"
            ],
            buttonText: "Get Started Free",
            buttonLink: "/signup",
            isPopular: false
        },
        {
            id: 2,
            name: "Pro",
            price: 199000,
            description: "The ultimate tier for professional Event Organizers.",
            features: [
                "Unlimited Products & Tenants",
                "Full Sale Analytics",
                "Custom Domain Integration",
                "Priority WhatsApp Support"
            ],
            buttonText: "Upgrade to Pro",
            buttonLink: "/subscription",
            isPopular: true
        }
    ];

    const displayPlans = plans && plans.length > 0 ? plans : defaultPlans;

    return (
        <LandingPageLayout>
            <Head title="Pricing" />
            
            <div className="bg-slate-50 min-h-screen pb-24 pt-36 px-6">
                <div className="max-w-5xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Transparent Pricing, No Hidden Fees</h1>
                        <p className="text-lg text-slate-600">Choose the perfect plan for your event needs. Upgrade anytime as your business grows.</p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {displayPlans.map((plan) => (
                            <div 
                                key={plan.id} 
                                className={`relative bg-white rounded-3xl p-8 border ${plan.isPopular ? 'border-blue-500 shadow-xl shadow-blue-100 transform md:-translate-y-2' : 'border-slate-200 shadow-md'} transition-all duration-300 flex flex-col`}
                            >
                                {/* Badge Popular */}
                                {plan.isPopular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <span className="bg-blue-600 text-white text-sm font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    <p className="text-slate-500 min-h-[48px]">{plan.description}</p>
                                </div>

                                <div className="mb-8">
                                    <span className="text-5xl font-black text-slate-900">
                                        {plan.price === 0 ? 'Free' : `Rp ${plan.price.toLocaleString('id-ID')}`}
                                    </span>
                                    {plan.price > 0 && <span className="text-slate-500 font-medium">/month</span>}
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-slate-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link 
                                    href={plan.buttonLink}
                                    className={`w-full text-center font-bold py-4 rounded-xl transition-colors ${
                                        plan.isPopular 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                                    }`}
                                >
                                    {plan.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </LandingPageLayout>
    );
}