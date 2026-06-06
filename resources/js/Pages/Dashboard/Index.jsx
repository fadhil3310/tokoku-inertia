import React from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "./DashboardLayout";
import TenantDashboard from "./TenantDashboard";
import EventOrganizerDashboard from "./EventOrganizerDashboard";

export default function Index({ 
    user, 
    booth, 
    totalProducts, 
    recentTransactions, 
    recentEvent, 
    totalRevenue, 
    totalBoothSpaceSold 
}) {
    return (
        <DashboardLayout user={user}>
            <Head title={user?.role === 'tenant' ? "Tenant Dashboard - Tokoku" : "EO Dashboard - Tokoku"} />
            
            {user?.role === 'tenant' ? (
                <TenantDashboard 
                    booth={booth}
                    totalProducts={totalProducts}
                    recentTransactions={recentTransactions}
                />
            ) : user?.role === 'event organizer' ? (
                <EventOrganizerDashboard 
                    recentEvent={recentEvent}
                    totalRevenue={totalRevenue}
                    totalBoothSpaceSold={totalBoothSpaceSold}
                />
            ) : (
                <div className="p-6">
                    <p>Unauthorized role or view not found.</p>
                </div>
            )}
        </DashboardLayout>
    );
}