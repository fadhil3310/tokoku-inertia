import React from "react";
import LandingPageLayout from "../Layouts/LandingPageLayout";

export default function AboutUs() {
    return (
        <LandingPageLayout title="About Us">
            <div className="pb-20 pt-36 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto animate-fade-in text-slate-800">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        About Tokoku
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                        Empowering artists and local businesses with hassle-free
                        order and booth management.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                            Our Mission
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We understand how complicated it is to manage sales,
                            inventory, and queues while selling at large events.
                            Tokoku is here to cut through all that complexity.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Our platform is specifically designed to be
                            intuitive, lightweight, and fast, so you can focus
                            on what matters most: serving your customers.
                        </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl h-72 flex items-center justify-center shadow-inner">
                        <svg
                            className="w-24 h-24 text-blue-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                        </svg>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-slate-900 mb-10">
                        Our Team
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="w-20 h-20 mx-auto rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl font-bold mb-4">
                                V
                            </div>
                            <h4 className="font-bold text-lg text-slate-900">
                                Virgiano Fadhil
                            </h4>
                        </div>

                        <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="w-20 h-20 mx-auto rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl font-bold mb-4">
                                N
                            </div>
                            <h4 className="font-bold text-lg text-slate-900">
                                Nandana Rafi Ardika
                            </h4>
                        </div>

                        <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="w-20 h-20 mx-auto rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl font-bold mb-4">
                                R
                            </div>
                            <h4 className="font-bold text-lg text-slate-900">
                                Raihan Fauzi Rakhman
                            </h4>
                        </div>

                        <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="w-20 h-20 mx-auto rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center text-2xl font-bold mb-4">
                                M
                            </div>
                            <h4 className="font-bold text-lg text-slate-900">
                                Muhammad Fadil Tallei
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
