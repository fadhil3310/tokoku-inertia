import React, { useState } from 'react';
import LandingPageLayout from '@/Layouts/LandingPageLayout';
import { Head } from '@inertiajs/react';

export default function HelpCenter() {
    const [activeFaq, setActiveFaq] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "How do I upgrade to the Pro tier?",
            answer: "You can easily upgrade your account by navigating to the 'Subscription' menu on your dashboard. Select the Pro plan and click 'Upgrade'. Payments are securely processed via Midtrans, supporting QRIS, Bank Transfers, and Paylater."
        },
        {
            id: 2,
            question: "Is my event and tenant data secure?",
            answer: "Absolutely. We implement strict tenant data isolation within our secure cloud infrastructure. Your product catalogs, transaction logs, and tenant information remain entirely private and protected from unauthorized access."
        },
        {
            id: 3,
            question: "How can I set up a custom domain for my event?",
            answer: "Custom domain integration is a premium feature exclusive to our Pro users. Once upgraded, please reach out to our technical support team to assist you with pointing your custom domain to our servers."
        },
        {
            id: 4,
            question: "Are the payment gateways currently processing live transactions?",
            answer: "Currently, our payment environment is operating in Sandbox (Testing) mode to ensure system stability. You can simulate transactions using standard testing credentials provided by Midtrans."
        }
    ];

    const toggleFaq = (id) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <LandingPageLayout>
            <Head title="Help Center" />
            
            <div className="bg-white min-h-screen pb-20 pt-36 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-black text-slate-950 tracking-tight mb-4">Help Center</h1>
                        <p className="text-lg text-slate-600 font-medium">Find answers to your questions or get in touch with our dedicated support team.</p>
                    </div>

                    {/* Accordion FAQ */}
                    <div className="space-y-4 mb-16">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white hover:border-blue-500 transition-colors duration-200">
                                <button 
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-semibold text-slate-900 text-lg">{faq.question}</span>
                                    <svg 
                                        className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === faq.id ? 'max-h-40 p-6 pt-0 border-t border-slate-100 bg-slate-50/50' : 'max-h-0'}`}>
                                    <p className="text-slate-600 leading-relaxed pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Card Support */}
                    <div className="border border-slate-200 rounded-2xl p-8 text-center bg-slate-50 shadow-sm">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Still need assistance?</h3>
                        <p className="text-slate-600 mb-6">Our technical team is ready to help you resolve any issues regarding your event setups or tenant management.</p>
                        <a 
                            href="https://wa.me/6281234567890" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
