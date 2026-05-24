import { Link, Head } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import React from "react";

export default function LandingPageLayout({ title, children }) {
    return (
        <div>
            <Head title={title} />
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
}
