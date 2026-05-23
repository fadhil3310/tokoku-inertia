import { Link, Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { TransactionsIcon, HomeIcon, PaymentIcon, ProductsIcon, BoothIcon, BellIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { Toaster, toast } from 'sonner';
import { Icon } from '@iconify/react';

const EventsIcon = () => <Icon icon="bx:calendar-event" width={24} />;
const ProfileIcon = () => <Icon icon="bx:user-circle" width={24} />;

export default function EventOrganizerLayout({ children }) {
    const { url } = usePage();
    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [mobileVisible, setMobileVisible] = useState(false);

    // Specifically requested Nav Items for EO
    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
        { href: "/events", label: "Events", icon: EventsIcon },
        { href: "/payment", label: "Payment", icon: PaymentIcon },
        { href: "/profile", label: "Profile", icon: ProfileIcon },
    ];

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
                {mobileVisible && <div onClick={() => setMobileVisible(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" />}
                <aside className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 flex flex-col lg:z-30 ${collapsed ? 'lg:w-64' : 'lg:w-24'}  ${!mobileVisible ? "-translate-x-full" : ""} lg:translate-x-0 transition-all`}>
                    <div className="flex items-center h-16 px-4 border-b border-gray-100">
                        <Link href="/" className="flex items-center gap-3">
                            {collapsed && (
                                <>
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                        T
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-gray-800 tracking-tight leading-none">
                                            Tokoku EO
                                        </span>
                                    </div>
                                </>
                            )}
                        </Link>
                        <Button onClick={() => {(mobileVisible && collapsed) ? setMobileVisible(!mobileVisible) : setCollapsed(!collapsed)}} variant={'ghost'} size={'sm'} className={`w-fit ${collapsed ? 'ml-auto mt-1' : 'mx-auto'} ${mobileVisible ? "ml-5" : ""} text-gray-500 hover:bg-gray-100`}>
                            <Icon icon={collapsed ? "basil:caret-left-outline" : "basil:menu-outline"} width={24} />
                        </Button>
                    </div>
                    <nav className="flex-1 overflow-y-auto py-6 px-3">
                        <ul className="space-y-2">
                            {navItems.map(({ href, label, icon: IconComponent}) => {
                                const isActive = url.startsWith(href);
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`flex ${!collapsed && 'justify-center'} items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium ${isActive ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                        >
                                            <div className={isActive ? 'text-indigo-600' : 'text-gray-400'}>
                                                <IconComponent size="22"/>
                                            </div>
                                            {collapsed && <span>{label}</span>}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </aside>

                <header className="fixed top-0 right-0 z-20 h-16 bg-white border-b border-gray-200 transition-all duration-300 left-0 lg:left-0 pl-0">
                    <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
                        <Button onClick={() => setMobileVisible(!mobileVisible)} variant={'ghost'} size={'sm'} className={`w-fit text-gray-600 hover:bg-gray-100 lg:hidden`}>
                            <Icon icon="basil:menu-outline" width={24} />
                        </Button>
                        <div className="flex-1"></div>

                        <div className="flex items-center gap-3 ml-auto">
                            <div className="relative">
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setNotifOpen(!notifOpen)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                >
                                    <BellIcon />
                                </Button>
                                {notifOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 font-semibold text-gray-800">
                                            Notifications
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                                                <p className="text-sm font-medium text-gray-800">
                                                    New Ticket Sold
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    10 minutes ago
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>

                            <div className="relative">
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 text-gray-700 transition-colors pr-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                                        EO
                                    </div>
                                    <span className="hidden md:inline text-sm font-semibold">
                                        Organizer
                                    </span>
                                </Button>
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden py-1">
                                        <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium">Profile</Link>
                                        <Link href="/subscription" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium">Subscription</Link>
                                        <div className="h-px bg-gray-100 my-1"></div>
                                        <Link href="/logout" method="post" as="button" className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium">Sign out</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className={`pt-16 pb-16 lg:pb-0 ${collapsed ? 'lg:ml-64' : 'lg:ml-24'} flex flex-col flex-1 min-h-screen transition-all duration-300`}>
                    {children}
                </main>

                <footer className="fixed bottom-0 lg:hidden right-0 z-40 h-16 bg-white border-t border-gray-200 left-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-around h-full px-2">
                        {navItems.map((item) => {
                            const isActive = url.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center justify-center flex-1 py-1 ${isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'} text-[10px] gap-1 transition-colors`}
                                >
                                    <item.icon />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </footer>
                <Toaster position="top-right" />
            </div>
        </>
    );
}