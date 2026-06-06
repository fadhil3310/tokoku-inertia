import { Link, Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { TransactionsIcon, HomeIcon, PaymentIcon, ProductsIcon, BoothIcon, BellIcon } from "../Components/Icons";
import Button from "../Components/Buttons";
import { Toaster, toast } from 'sonner';
import { Icon } from '@iconify/react';

export default function DashboardLayout({ children }) {
    const { url } = usePage();
    const { auth } = usePage().props;
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [mobileVisible, setMobileVisible] = useState(false);
    const userId = auth?.user?.id;

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
        { href: "/transactions", label: "Transactions", icon: TransactionsIcon },
        { href: "/payment-link", label: "Payment Link", icon: PaymentIcon },
        { href: "/products", label: "Products", icon: ProductsIcon },
        { href: "/booth", label: "Booth", icon: BoothIcon },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col min-h-screen bg-gray-100">
                {mobileVisible && <div onClick={() => setMobileVisible(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}
                <aside className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-400 flex flex-col lg:z-30 ${collapsed ? 'lg:w-64' : 'lg:w-24'}  ${!mobileVisible ? "-translate-x-full" : ""} lg:translate-x-0 transition-all`}>
                    <div className="flex items-center h-16 px-4">
                        <Link href="/" className="flex items-center gap-3">
                            {collapsed && (
                                <>
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                        T
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-gray-700">
                                            Nama Toko
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            by Tokoku
                                        </span>
                                    </div>
                                </>
                            )}
                        </Link>
                        <Button onClick={() => {(mobileVisible && collapsed) ? setMobileVisible(!mobileVisible) : setCollapsed(!collapsed)}} variant={'ghost'} size={'sm'} className={`w-fit ${collapsed ? 'ml-auto mt-3' : 'mx-auto'} ${mobileVisible ? "ml-5" : ""} text-black hover:bg-gray-100`}>
                            <Icon icon={collapsed ? "basil:caret-left-outline" : "basil:menu-outline"} width={24} />
                        </Button>
                    </div>
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <ul className="space-y-1">
                            {navItems.map(({ href, label, icon: Icon}) => {
                                const isActive = url === href;
                                return (
                                    <li key={href}>
                                    <Link
                                        href={href}
                                        className={`flex ${!collapsed && 'justify-center'} items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium ${isActive ? 'bg-[#DDEBFF] text-[#2B7FFF] hover:bg-[#b7d5ff]' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                        <Icon size="24"/>
                                        {collapsed && <span>{label}</span>}
                                    </Link>
                                </li>
                                )
                            })}
                        </ul>
                    </nav>
                </aside>

                <header className="fixed top-0 right-0 z-20 h-16 bg-white border-b border-gray-200 transition-all duration-300 left-0">
                    <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
                        <Button onClick={() => setMobileVisible(!mobileVisible)} variant={'ghost'} size={'sm'} className={`w-fit text-black hover:bg-gray-100`}>
                            <Icon icon="basil:menu-outline" width={24} />
                        </Button>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 lg:hidden"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                T
                            </div>
                            <span className="text-xl font-bold text-gray-700">
                                Tokoku
                            </span>
                        </Link>

                        <div className="flex items-center gap-2 ml-auto">
                            <div className="relative">
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setNotifOpen(!notifOpen)}
                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                                >
                                    <BellIcon />
                                </Button>
                                {notifOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200 font-medium">
                                            Notifications
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                                                <p className="text-sm font-medium text-gray-700">
                                                    Order Completed
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    5 minutes ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 border-t border-gray-200">
                                            <Link
                                                href="/notifications"
                                                className="text-blue-500 text-sm"
                                            >
                                                View all notifications
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 text-gray-700"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                        Ad
                                    </div>
                                    <span className="hidden md:inline text-sm font-medium">
                                        Admin
                                    </span>
                                </Button>
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                        <Link
                                            href={`/profile/${userId}`}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/subscription"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Subscription
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className={`pt-16 pb-16 lg:pb-0 ${collapsed ? 'lg:ml-64' : 'lg:ml-24'} flex flex-1 min-h-screen`}>
                    {children}
                </main>

                <footer className="fixed bottom-0 lg:hidden right-0 z-20 h-16 bg-white border-t border-gray-200 left-0">
                    <div className="flex items-center justify-around h-full">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center flex-1 py-2 text-gray-500 hover:text-blue-500 text-xs gap-1"
                            >
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </footer>
                <Toaster />
            </div>
        </>
    );
}
