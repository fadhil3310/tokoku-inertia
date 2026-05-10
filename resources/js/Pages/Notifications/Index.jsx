import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { CheckIcon, ChevronRightIcon, HomeIcon } from "../../Components/Icons";
import NotificationItem from "./NotificationItem";
import Button from "../../Components/Buttons";
import { Link, Head } from "@inertiajs/react";

// TODO: nanti fetch data notifications dari controller, utk skrng dummy dulu
const NOTIFICATIONS = [
    {
        id: 1,
        type: "sale",
        title: "New Sale: Keychain Demon Slayer",
        description: "Order #P001 has been successfully paid by the customer.",
        time: "15:00",
        date: "January 22, 2026",
        unread: true,
    },
    {
        id: 2,
        type: "sale",
        title: "New Sale: Sticker Jujutsu Kaisen",
        description:
            "You just received a new order. Check your transaction list for more details.",
        time: "10:00",
        date: "January 21, 2026",
        unread: true,
    },
    {
        id: 3,
        type: "system",
        title: "System Update",
        description:
            "The platform has been updated to version 2.0. Check out the new features.",
        time: "08:00",
        date: "January 20, 2026",
        unread: false,
    },
];

export default function Notifications() {
    const [activeTab, setActiveTab] = useState("all");
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const unreadCount = notifications.filter((n) => n.unread).length;

    const markAllAsRead = () =>
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

    const displayed =
        activeTab === "unread"
            ? notifications.filter((n) => n.unread)
            : notifications;

    return (
        <DashboardLayout>
            <Head title="Notifications" />
            <div className="w-full p-4 lg:p-6 min-h-screen antialiased">
                <nav className="flex items-center space-x-2 text-sm mb-6">
                    <Link
                        href={"/dashboard"}
                        className="flex items-center text-gray-700 hover:text-blue-500 fill-current"
                    >
                        <HomeIcon />
                    </Link>
                    <ChevronRightIcon />
                    <Link
                        href={"/notifications"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Notifications
                    </Link>
                </nav>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Notifications
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your store activities and alerts.
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between px-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <Button
                                variant={'ghost'}
                                onClick={() => setActiveTab("all")}
                                className={`py-4 text-sm font-semibold border-b-2 transition-colors cursor-pointer w-fit rounded-none ${
                                    activeTab === "all"
                                        ? "text-blue-600 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700 border-transparent"
                                }`}
                            >
                                All Notifications
                            </Button>
                            <Button
                                variant={'ghost'}
                                onClick={() => setActiveTab("unread")}
                                className={`py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer w-fit rounded-none ${
                                    activeTab === "unread"
                                        ? "text-blue-600 border-blue-600 font-semibold"
                                        : "text-gray-500 hover:text-gray-700 border-transparent"
                                }`}
                            >
                                Unread ({unreadCount})
                            </Button>
                        </div>

                        <Button
                            variant={'ghost'}
                            onClick={markAllAsRead}
                            className="text-sm font-medium text-blue-500 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
                        >
                            <CheckIcon />
                            Mark all as read
                        </Button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {displayed.length > 0 ? (
                            displayed.map((n) => (
                                <NotificationItem key={n.id} notification={n} />
                            ))
                        ) : (
                            <p className="p-8 text-center text-sm text-gray-400">
                                No notifications here.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
