import React from "react";
import { Link } from "@inertiajs/react";
import Button from "../../Components/Buttons";
import { Icon } from "@iconify/react";

export default function AdminDashboard({
    stats,
    recentEvents,
    recentTicketPayments,
    user,
}) {
    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, Admin
                </h1>
                <p className="text-gray-500">
                    Here's what's happening with your events today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6">
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <p className="text-sm text-gray-500">Event Organizers</p>
                    <p className="text-3xl font-bold">
                        {stats.totalEventOrganizers}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <p className="text-sm text-gray-500">Tenants</p>
                    <p className="text-3xl font-bold">{stats.totalTenants}</p>
                </div>

                <div className="bg-white rounded-2xl p-6">
                    <p className="text-sm text-gray-500">Paid Tickets</p>
                    <p className="text-3xl font-bold">
                        {stats.totalPaidTickets}
                    </p>
                </div>

                <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 h-full">
                    <Button
                        href="/events/create"
                        className="flex-1 flex flex-col items-center justify-center gap-3 bg-white border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all rounded-2xl p-6 min-h-[120px]"
                        variant="ghost"
                    >
                        <Icon icon="bx:plus-circle" width={32} />
                        <span className="font-semibold">Create New Event</span>
                    </Button>
                    <Button
                        href="/events"
                        className="flex-1 flex flex-col items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white transition-all rounded-2xl p-6 min-h-[120px]"
                    >
                        <Icon icon="bx:calendar-event" width={32} />
                        <span className="font-semibold">Manage All Events</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-lg text-gray-900">
                            Most Recent Event
                        </h2>
                        <Link
                            href="/events"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            View Details &rarr;
                        </Link>
                    </div>

                    {recentEvents.length > 0 ? (
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            {recentEvents.length > 0 ? (
                                <>
                                    <div className="w-full sm:w-48 aspect-video bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                                        {recentEvents.poster ? (
                                            <img
                                                src={recentEvents.poster}
                                                className="w-full h-full object-cover"
                                                alt="Event Poster"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Icon
                                                    icon="bx:image"
                                                    width={48}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-700 border border-green-100 text-xs font-bold uppercase mb-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            Active
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {recentEvents.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                            {recentEvents.description}
                                        </p>

                                        <div className="mt-auto flex items-center gap-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Icon
                                                    icon="bx:map"
                                                    width={18}
                                                    className="text-gray-400"
                                                />
                                                <span className="truncate">
                                                    {recentEvents.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-900 text-center">
                                    <p>No events yet.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                <Icon icon="bx:calendar-x" width={32} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">
                                No Active Events
                            </h3>
                            <p className="text-gray-500 text-sm max-w-sm mb-4">
                                You haven't created any events yet. Get started
                                by creating your first event.
                            </p>
                            <Button
                                href="/events/create"
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                Create Event
                            </Button>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
                    <h2 className="font-bold text-lg text-gray-900 mb-6">
                        Recent Registrations
                    </h2>
                    <div className="space-y-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                                    TN
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 text-sm truncate">
                                        Tenant Store {i}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        Booked VIP Booth A{i}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-bold text-sm text-gray-900">
                                        Rp2M
                                    </p>
                                    <p className="text-xs text-green-600 font-medium">
                                        Paid
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        href="/payment"
                        variant="outline"
                        className="w-full mt-6 justify-center"
                    >
                        View All Transactions
                    </Button>
                </div>
            </div>
        </div>
    );
}
