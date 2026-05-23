import { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import {
    CancelIcon,
    ChevronRightIcon,
    HomeIcon,
    SaveIcon,
} from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { ProductCategories } from "../../Shared/productCategories";

const Dialog = ({
    isOpen,
    onClose,
    title,
    message,
    confirmLabel,
    confirmClassName,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/40 transition-opacity"
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">{message}</p>
                </div>
                <div className="flex flex-row-reverse gap-2 px-6 py-4 bg-white">
                    <Button
                        onClick={onConfirm}
                        size={'sm'}
                    >
                        {confirmLabel}
                    </Button>
                    <Button
                        onClick={onClose}
                        size={'sm'}
                        variant={'outline'}
                    >
                        {title === "Save Product?" ? "Cancel" : "No"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function Create() {
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [createdDate, setCreatedDate] = useState("");

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        sku: "",
        category: "",
        description: "",
        stock: "",
        price: "",
        image: null,
        status: "draft",
        visibility: "private",
    });

    useEffect(() => {
        const now = new Date();
        const formatted = now.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        setCreatedDate(formatted);
    }, []);

    const handleChange = (e) => {
        const { id, value, files, type } = e.target;
        setData(id, type === "file" ? files[0] : value);
    };

    const handleSave = () => {
        setSaveDialogOpen(false);
        post(route("products.store"), {
            forceFormData: true,
        });
    };

    const handleCancel = () => {
        setCancelDialogOpen(false);
        window.location.href = route("products.index");
    };

    const inputClass =
        "w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";

    const errorClass = "mt-1 text-xs text-red-500";

    return (
        <DashboardLayout>
            <Head title="Add Products" />
            <div className="w-full p-4 lg:p-6">
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
                    <ChevronRightIcon />
                    <Link
                        href={"/products/create"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Add Products
                    </Link>
                </nav>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-700 mb-2">
                        Add New Product
                    </h1>
                    <p className="text-gray-600">
                        Create a new product and add it to your catalog.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Product Information
                            </h2>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Product Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter product name.."
                                    className={inputClass}
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className={errorClass}>{errors.name}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="sku"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        SKU
                                    </label>
                                    <input
                                        id="sku"
                                        type="text"
                                        placeholder="e.g., ABC-2026-001"
                                        className={inputClass}
                                        value={data.sku}
                                        onChange={handleChange}
                                    />
                                    {errors.sku && (
                                        <p className={errorClass}>
                                            {errors.sku}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        className={inputClass}
                                        value={data.category}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Choose category
                                        </option>
                                        {ProductCategories.map(x => 
                                            <option key={x.value} value={x.value}>{x.label}</option>
                                        )}
                                        {/* <option value="sticker">Sticker</option>
                                        <option value="poster">Poster</option>
                                        <option value="print">Print</option>
                                        <option value="accessory">
                                            Accessory
                                        </option>
                                        <option value="food">Food</option>
                                        <option value="beverage">
                                            Beverage
                                        </option>
                                        <option value="clothing">
                                            Clothing
                                        </option> */}
                                    </select>
                                    {errors.category && (
                                        <p className={errorClass}>
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    placeholder="Enter product description.."
                                    className={inputClass}
                                    value={data.description}
                                    onChange={handleChange}
                                />
                                {errors.description && (
                                    <p className={errorClass}>
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Pricing & Stock
                            </h2>
                            <div>
                                <label
                                    htmlFor="stock"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Stock *
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    placeholder="0"
                                    className={inputClass}
                                    value={data.stock}
                                    onChange={handleChange}
                                />
                                {errors.stock && (
                                    <p className={errorClass}>{errors.stock}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Price *
                                </label>
                                <div className="relative">
                                    <input
                                        id="price"
                                        type="number"
                                        placeholder="0"
                                        className={`${inputClass} pl-12`}
                                        value={data.price}
                                        onChange={handleChange}
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                        Rp
                                    </span>
                                </div>
                                {errors.price && (
                                    <p className={errorClass}>{errors.price}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Product Image
                            </h2>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Image *
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className={inputClass}
                                    onChange={handleChange}
                                />
                                {errors.image && (
                                    <p className={errorClass}>{errors.image}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Product Status
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-600 mb-1"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        className={inputClass}
                                        value={data.status}
                                        onChange={handleChange}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="pending">Pending</option>
                                        <option value="published">
                                            Published
                                        </option>
                                        <option value="archived">
                                            Archived
                                        </option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className={errorClass}>
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="visibility"
                                        className="block text-sm font-medium text-gray-600 mb-1"
                                    >
                                        Visibility
                                    </label>
                                    <select
                                        id="visibility"
                                        className={inputClass}
                                        value={data.visibility}
                                        onChange={handleChange}
                                    >
                                        <option value="private">Private</option>
                                        <option value="public">Public</option>
                                    </select>
                                    {errors.visibility && (
                                        <p className={errorClass}>
                                            {errors.visibility}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center justify-between text-sm pt-1">
                                    <span className="text-gray-600">
                                        Created:
                                    </span>
                                    <span className="text-gray-700 font-medium">
                                        {createdDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <Button
                                onClick={() => setSaveDialogOpen(true)}
                                disabled={processing}
                                size={'sm'}
                            >
                                <SaveIcon />
                                <span>
                                    {processing ? "Saving..." : "Save Product"}
                                </span>
                            </Button>
                            <Button
                                onClick={() => setCancelDialogOpen(true)}
                                disabled={processing}
                                size={'sm'}
                                variant={'outline'}
                            >
                                <CancelIcon />
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <Dialog
                    isOpen={saveDialogOpen}
                    onClose={() => setSaveDialogOpen(false)}
                    title="Save Product?"
                    message="You can edit products later on product page."
                    confirmLabel="Save"
                    confirmClassName="bg-blue-500 hover:bg-blue-400"
                    onConfirm={handleSave}
                />

                <Dialog
                    isOpen={cancelDialogOpen}
                    onClose={() => setCancelDialogOpen(false)}
                    title="Discard this Product?"
                    message="All changes will be lost."
                    confirmLabel="Yes"
                    confirmClassName="bg-red-500 hover:bg-red-400"
                    onConfirm={handleCancel}
                />
            </div>
        </DashboardLayout>
    );
}