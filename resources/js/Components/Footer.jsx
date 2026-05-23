import { Link } from "@inertiajs/react";

export default function Footer({ className }) {
    return (
        <footer className={(className ?? "") + " px-6 py-16 bg-white border-t border-gray-200"}>
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:gap-24 justify-center text-sm mb-12">
                <div className="flex flex-col gap-4">
                    <span className="font-bold text-gray-900 text-base mb-1">
                        Product
                    </span>
                    <Link
                        href="/features"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/integrations"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        Integrations
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="font-bold text-gray-900 text-base mb-1">
                        Company
                    </span>
                    <Link
                        href="/about-us"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/support"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        Support
                    </Link>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                        T
                    </div>
                    <span className="font-medium text-gray-900">Tokoku</span>
                </div>
                <p>© 2026 Tokoku. All rights reserved.</p>
            </div>
        </footer>
    );
}
