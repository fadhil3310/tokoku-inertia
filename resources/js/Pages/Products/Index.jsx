import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Link, Head } from "@inertiajs/react";
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

export default function Index({ products, error }) {
    return (
        <DashboardLayout>
            <Head title="Products" />
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
                        href={"/products"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Products
                    </Link>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardActions>
                            <Button variant="outline" className="text-nowrap">
                                <CatalogueIcon />
                                <span>Open Catalog</span>
                            </Button>
                            <Button className="text-nowrap" href="/products/create">
                                <CircleAddIcon />
                                <span>Add Product</span>
                            </Button>
                        </CardActions>
                    </CardHeader>
                </Card>

                <div className="bg-white rounded-lg p-4 md:p-6">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="relative flex-1">
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 fill-current"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.5 3.25C6.30558 3.25 2.75 6.80558 2.75 11C2.75 15.1944 6.30558 18.75 10.5 18.75C12.2035 18.75 13.8129 18.2187 15.0881 17.3107L20.4697 22.6924C20.7626 22.9853 21.2374 22.9853 21.5303 22.6924C21.8232 22.3995 21.8232 21.9247 21.5303 21.6318L16.1486 16.2501C17.0567 15.0249 17.75 13.4155 17.75 11.75C17.75 11.3358 17.4142 11 17 11C16.5858 11 16.25 11.3358 16.25 11.75C16.25 14.4874 14.0374 16.75 11 16.75C7.68629 16.75 5 14.0137 5 10.75C5 7.48629 7.68629 4.75 11 4.75C14.0374 4.75 16.25 6.98629 16.25 9.75C16.25 10.1642 16.5858 10.5 17 10.5C17.4142 10.5 17.75 10.1642 17.75 9.75C17.75 8.0465 17.0567 6.43707 16.1486 5.21194C14.8129 4.30393 13.2035 3.75 11.5 3.75C6.73858 3.75 2.75 7.48629 2.75 12C2.75 15.1944 6.30558 18.75 10.5 18.75Z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-1/2 md:w-1/4 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                            />
                        </div>
                        <button className="flex items-center justify-center bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-50">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="text-gray-600"
                            >
                                <path d="M6 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-18C11.88 1 11 1.88 11 3s.88 2 2 2 2-.88 2-2-.88-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-18c-1.12 0-2 .88-2 2s.88 2 2 2 2-.88 2-2-.88-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-300">
                                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                                        Id
                                    </th>
                                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                                        Description
                                    </th>
                                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                                        Price
                                    </th>
                                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                                        Stock
                                    </th>
                                    <th className="text-left py-4 px-2 font-semibold text-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products != null ?
                                    products.data.map((e, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-white transition-colors"
                                        >
                                            <td className="py-4 px-2 text-gray-700">
                                                {e.id}
                                            </td>
                                            <td className="py-4 px-2 text-gray-700">
                                                <p className="font-medium">
                                                    {e.name}
                                                </p>
                                            </td>
                                            <td className="py-4 px-2 text-gray-600 text-sm">
                                                {e.description}
                                            </td>
                                            <td className="py-4 px-2 text-gray-700 font-medium">
                                                {e.price}
                                            </td>
                                            <td className="py-4 px-2 text-gray-600 text-sm">
                                                {e.stock}
                                            </td>
                                            <td className="py-4 px-2">
                                                <Button
                                                    href={route(
                                                        "products.show",
                                                        e.id,
                                                    )}
                                                    variant={"ghost"}
                                                >
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    )) : <tr>
                                            <td colSpan={6} className="text-red-500 text-center p-10">{error}</td>
                                        </tr>
                                    }
                            </tbody>
                        </table>
                    </div>

                    {/* TODO: PAGINATION INCOMPLETE */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="text-gray-600"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.7071 6.29289C16 6.58579 16 7.06066 15.7071 7.35355L10.0607 13L15.7071 18.6464C16 18.9393 16 19.4142 15.7071 19.7071C15.4142 20 14.9393 20 14.6464 19.7071L8.29289 13.3536C8 13.0607 8 12.5858 8.29289 12.2929L14.6464 5.93934C14.9393 5.64645 15.4142 5.64645 15.7071 5.93934C16 6.23223 16 6.70711 15.7071 7Z"
                                />
                            </svg>
                        </button>
                        <button className="px-3 py-1 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                            1
                        </button>
                        <button className="px-3 py-1 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-1 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                            3
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="text-gray-600"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.29289 6.29289C8.58579 6 9.06066 6 9.35355 6.29289L15.7071 12.6464C16 12.9393 16 13.4142 15.7071 13.7071L9.35355 20.0607C9.06066 20.3536 8.58579 20.3536 8.29289 20.0607C8 19.7678 8 19.2929 8.29289 19L13.9393 13.3536L8.29289 7.70711C8 7.41421 8 6.93934 8.29289 6.64645C8.58579 6.35355 9.06066 6.35355 9.35355 6.64645L8.29289 6.29289Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
