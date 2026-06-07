import React, { useEffect } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, usePage } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardActions,
} from "../../Components/Card";
import {
    AddIcon,
    CatalogueIcon,
    CircleAddIcon,
    HomeIcon,
    ChevronRightIcon,
} from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { toast } from "sonner";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

export default function Index({ users, error }) {
    const { flash } = usePage();

    const data = users.map((u) => [
        u.id,
        u.name,
        u.email,
        u.image,
        u.created_at_humanreadable,
    ]);

    const columns = [
        "Id",
        "Name",
        "Email",
        "Image",
        "Created",
        {
            name: 'Actions',
            formatter: (_, row) => {
                const id = row.cells[0].data;
                return h('div', {
                    className: 'flex gap-2'
                }, [
                    h('a', {
                        href: route('profile.edit', id),
                        className: 'cursor-pointer inline-flex items-center justify-center rounded-md transition-colors px-3 py-1.5 text-sm text-amber-500 hover:bg-amber-50'
                    }, 'Edit'),
                    h('a', {
                        href: route('profile.destroy', id),
                        className: 'cursor-pointer inline-flex items-center justify-center rounded-md transition-colors px-3 py-1.5 text-sm text-red-500 hover:bg-red-50'
                    }, 'Delete'),
                ]);
            }
        }
    ];

    useEffect(() => {
        if (flash.status != null) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <DashboardLayout>
            <Head title="Users" />
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
                        href={"/profile"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Users
                    </Link>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardActions>
                            <Button
                                className="text-nowrap"
                                href="/profile/create"
                            >
                                <CircleAddIcon />
                                <span>Add User</span>
                            </Button>
                        </CardActions>
                    </CardHeader>
                </Card>

                <div className="bg-white rounded-lg p-4 md:p-6">
                    <div className="overflow-x-auto">
                        <Grid
                            data={data}
                            columns={columns}
                            search={true}
                            language={{
                                search: {
                                    placeholder: "Search profile...",
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