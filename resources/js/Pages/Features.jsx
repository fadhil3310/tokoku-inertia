import React from "react";
import LandingPageLayout from "../Layouts/LandingPageLayout";

export default function Features() {
    return (
        <LandingPageLayout title="Features">
            <div className="pb-20 pt-36 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto animate-fade-in text-slate-800">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Powerful Features
                    </h2>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                        Everything you need to manage your booth, track sales,
                        and grow your local business effortlessly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-2">
                            Real-time Analytics
                        </h3>
                        <p className="text-sm text-gray-600">
                            Monitor your revenue and performance directly.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-2">
                            Effortless Orders
                        </h3>
                        <p className="text-sm text-gray-600">
                            Streamlined POS interface to reduce wait times.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-2">Custom Catalog</h3>
                        <p className="text-sm text-gray-600">
                            Easily organize products and your branding.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-2">
                            Secure Cloud Sync
                        </h3>
                        <p className="text-sm text-gray-600">
                            Data backed up securely, access anywhere.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-2">
                            Multi-Staff Access
                        </h3>
                        <p className="text-sm text-gray-600">
                            Manage roles and track team activity.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-2">Mobile Optimized</h3>
                        <p className="text-sm text-gray-600">
                            Works perfectly on tablets and phones.
                        </p>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
