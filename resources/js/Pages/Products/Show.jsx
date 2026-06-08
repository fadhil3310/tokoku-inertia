import React, { useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, router } from "@inertiajs/react";
import { Card, CardHeader, CardTitle } from "../../Components/Card";
import { HomeIcon, ChevronRightIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";

function DeleteModal({ isOpen, onClose, onConfirm, productName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Delete Product
                </h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-gray-800">
                        {productName}
                    </span>
                    ? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function Show({ product, hasImage }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    console.log('/'+hasImage)

    function handleDelete() {
        router.delete(route("products.destroy", product.id), {
            onFinish: () => setShowDeleteModal(false),
        });
    }

    return (
        <DashboardLayout>
            <Head title={`Product - ${product.name}`} />

            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                productName={product.name}
            />

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
                        className="text-gray-700 hover:text-blue-500"
                    >
                        Products
                    </Link>
                    <ChevronRightIcon />
                    <span className="text-gray-500">{product.name}</span>
                </nav>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Product Detail</CardTitle>
                    </CardHeader>
                </Card>

                <div className="bg-white rounded-lg p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full">
                            <img
                                src={
                                    hasImage
                                        ? `/${product.image}`
                                        : "/images/placeholder.png"
                                }
                                alt={product.name}
                                className="w-full h-auto rounded-lg border"
                            />
                        </div>

                        <div className="flex flex-col justify-between my-3">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        {product.sku}
                                    </p>
                                </div>

                                <p className="text-gray-600">
                                    {product.description || "-"}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Price
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {product.price}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Stock
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {product.stock}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Category
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {product.category}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Status
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {product.status}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Visibility
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {product.visibility}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Created At
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {product.created_at}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="pt-4 flex gap-2">
                                    <Button href="/products" variant="outline">
                                        Back
                                    </Button>
                                    <Button
                                        href={route(
                                            "products.edit",
                                            product.id,
                                        )}
                                    >
                                        Edit
                                    </Button>
                                </div>
                                <div className="pt-4 flex gap-2">
                                    <Button
                                        variant="danger"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
