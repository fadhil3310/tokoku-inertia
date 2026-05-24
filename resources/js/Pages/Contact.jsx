import React from "react";
import LandingPageLayout from "../Layouts/LandingPageLayout";

export default function Contact() {
    return (
        <LandingPageLayout title="Contact">
            <div className="pb-20 pt-36 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto animate-fade-in text-slate-800 text-center">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Contact Us
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        Have any questions or need help setting up your booth?
                        Hit us up directly!
                    </p>
                </div>

                <div className="bg-white p-10 border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 max-w-md mx-auto">
                    <div className="mb-8 flex justify-center">
                        <img
                            src="images/whatsapp-logo.png"
                            alt="Logo WhatsApp"
                            className="w-20 h-20 object-contain drop-shadow-sm"
                        />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        WhatsApp Support
                    </h3>
                    <p className="text-slate-500 mb-8 text-sm">
                        Online: 09:00 - 18:00 WIB
                    </p>

                    <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-8 rounded-xl w-full block transition-colors shadow-md hover:shadow-lg"
                    >
                        Chat on WhatsApp
                    </a>

                    <p className="mt-5 text-sm text-slate-400 font-bold tracking-wide">
                        +62 812-3456-7890
                    </p>
                </div>
            </div>
        </LandingPageLayout>
    );
}
