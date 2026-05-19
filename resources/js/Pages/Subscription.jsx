import { useState, useRef } from "react";
import { HomeIcon, ChevronRightIcon, EditIcon } from "../Components/Icons";
import Button from "../Components/Buttons";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "./DashboardLayout";

export default function Subscription() {
    return (
        <DashboardLayout>
            <Head title="Subscription"/>
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
                        href={"/subscription"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Subscription
                    </Link>
                </nav>

                <div className="rounded-lg p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                        Subscription Plan
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl mx-auto">
                        {/* Starter Plan Card */}
                        <div className="bg-white rounded-xl flex flex-col px-8 py-8 shadow relative">
                            <h3 className="font-bold text-xl mb-4">Starter</h3>
                            <div className="mb-5">
                                <span className="font-bold text-2xl text-blue-500">Free</span>
                            </div>
                            <ul className="text-slate-600 mb-5">
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
                            <Button className={'mt-auto opacity-50 cursor-not-allowed'} variant={'outline'} disabled>
                                Current Plan
                            </Button>
                        </div>

                        {/* Pro Plan Card */}
                        <div className="bg-white rounded-xl flex flex-col px-8 py-8 shadow relative border-2 border-blue-500 sm:scale-105">
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 px-4 py-1 rounded-full text-white font-medium text-sm">
                                Popular
                            </span>
                            <h3 className="font-bold text-xl mb-4">Pro</h3>
                            <div className="mb-5">
                                <span className="font-bold text-2xl text-blue-500">Rp 199.000</span>
                                <span className="text-slate-600">/month</span>
                            </div>
                            <ul className="text-slate-600 mb-5">
                                {[
                                    '100 Products',
                                    'Sale Analytics',
                                    'Custom Catalog',
                                    'Custom Domain',
                                ].map((item) => (
                                    <li key={item} className="py-2 text-sm border-b border-slate-200">
                                        <span className="font-bold text-blue-500 mr-1">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button className={'mt-auto'} href={'/upgrade'}>
                                Upgrade
                            </Button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </DashboardLayout>
    );
}
