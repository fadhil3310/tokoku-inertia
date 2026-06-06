import React, { useEffect } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, usePage, router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardActions,
} from "../../Components/Card";
import {
    CircleAddIcon,
    HomeIcon,
    ChevronRightIcon,
} from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { toast } from "sonner";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

export default function Index({ events = [], error }) {
    const { flash } = usePage();

    const data = events.map((e) => [
        e.id,
        e.name,
        e.date_start,
        e.date_end,
    ]);

    const columns = [
        "Id",
        "Name",
        "Start Date",
        "End Date",
        {
            name: 'Actions',
            formatter: (_, row) => {
                const id = row.cells[0].data;
                
                // Using Preact's 'h' to render elements inside Grid.js
                return h('div', { className: 'flex items-center space-x-1' }, [
                    h('a', {
                        href: `/detail/event/${id}`,
                        className: 'cursor-pointer inline-flex items-center justify-center rounded-md transition-colors px-3 py-1.5 text-sm text-blue-500 hover:bg-blue-50 font-medium'
                    }, 'Detail'),
                    h('a', {
                        href: route('events.edit', id),
                        className: 'cursor-pointer inline-flex items-center justify-center rounded-md transition-colors px-3 py-1.5 text-sm text-amber-500 hover:bg-amber-50 font-medium'
                    }, 'Edit'),
                    h('button', {
                        onClick: () => handleDelete(id),
                        className: 'cursor-pointer inline-flex items-center justify-center rounded-md transition-colors px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 font-medium'
                    }, 'Delete')
                ]);
            }
        }
    ];

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this event? This will also delete all associated tickets.")) {
            router.delete(route('events.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    useEffect(() => {
        if (flash.status != null) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <DashboardLayout>
            <Head title="Events" />
            <div className="p-4 lg:p-6 min-h-screen w-full">
                <nav className="flex items-center space-x-2 text-sm mb-6">
                    <Link
                        href={"/dashboard"}
                        className="flex items-center text-gray-700 hover:text-blue-500 fill-current"
                    >
                        <HomeIcon />
                    </Link>
                    <ChevronRightIcon />
                    <Link
                        href={"/events"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Events
                    </Link>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Events</CardTitle>
                        <CardActions>
                            <Button
                                className="text-nowrap"
                                href={route('events.create')}
                            >
                                <CircleAddIcon />
                                <span>Add Event</span>
                            </Button>
                        </CardActions>
                    </CardHeader>
                </Card>

                <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
                    <div className="overflow-x-auto">
                        <Grid
                            data={data}
                            columns={columns}
                            search={true}
                            language={{
                                search: {
                                    placeholder: "Search events...",
                                },
                            }}
                            pagination={{
                                limit: 10,
                            }}
                            sort={true}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}