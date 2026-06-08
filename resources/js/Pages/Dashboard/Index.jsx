import React from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import TenantDashboard from "./TenantDashboard";
import EventOrganizerDashboard from "./EventOrganizerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Index({ 
    user, 
    booth, 
    totalProducts, 
    recentTransactions, 
    recentEvent, 
    recentEvents, 
    recentTicketPayments, 
    totalRevenue, 
    totalBoothSpaceSold,
    percentageChange,
    stats
}) {
    return (
        <DashboardLayout user={user}>
            <Head title={user?.role === 'tenant' ? "Tenant Dashboard - Tokoku" : "EO Dashboard - Tokoku"} />
            
            {user?.role === 'tenant' ? (
                <TenantDashboard 
                    booth={booth}
                    stats={stats}
                />
            ) : user?.role === 'event organizer' ? (
                <EventOrganizerDashboard 
                    recentEvent={recentEvent}
                    totalRevenue={totalRevenue}
                    totalBoothSpaceSold={totalBoothSpaceSold}
                    recentTicketPayments={recentTicketPayments}
                />
            ) : user?.role === 'admin' ? (
                <AdminDashboard 
                    stats={stats}
                    recentEvents={recentEvents}
                    recentTicketPayments={recentTicketPayments}
                />
            ) : (
                <div className="p-6">
                    <p>Unauthorized role or view not found.</p>
                </div>
            )}
        </DashboardLayout>
    );
}