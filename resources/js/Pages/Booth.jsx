import React, { useState, useRef, useEffect } from "react";
import { Link, Head, usePage, useForm } from "@inertiajs/react";
import { EditIcon } from "../Components/Icons";
import DashboardLayout from "../Layouts/DashboardLayout";
import { CancelIcon, SaveIcon } from "../Components/Icons";
import Button from "../Components/Buttons";
import { toast } from "sonner";

export default function Booth({ booth }) {
    const { flash } = usePage();
    const fileInputRef = useRef(null);
    const [saveOpen, setSaveOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(booth.image);

    console.log(booth);

    const { data, setData, put, processing, errors } = useForm({
        name: booth.name,
        description: booth.description ?? "",
        image: booth.image,
        email: booth.email,
        phone: booth.phone,
        instagram: booth.instagram,
        twitter: booth.twitter,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    function handleSave() {
        setSaveOpen(false);
        put(route("booth.update", booth.id), {
            forceFormData: true,
        });
    }

    const handleInputChange = (e) => {
        const { id, value, files, type } = e.target;
        setData(id, type === "file" ? files[0] : value);
    };

    function handleCancel() {
        setCancelOpen(false);
    }

    useEffect(() => {
        if (flash?.status === "success") {
            toast.success(flash.message);
        } else if (flash?.status === "error") {
            toast.error(flash.message);
        }
    }, [flash]);

    const inputClass =
        "w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorClass = "mt-1 text-xs text-red-500";

    return (
        <DashboardLayout>
            <Head title="Booth Profile" />
            <div className="p-4 lg:p-6 w-full">
                <nav className="flex items-center space-x-2 text-sm mb-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center text-gray-700 hover:text-blue-500 fill-current"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.5578 5.53423C12.6873 4.69887 11.3127 4.69887 10.4422 5.53423L5.81574 9.97357C5.70239 10.0823 5.62614 10.224 5.5978 10.3785C5.04367 13.4004 5.00277 16.494 5.47681 19.5295L5.58933 20.25H8.56579V14.0387C8.56579 13.6244 8.90158 13.2887 9.31579 13.2887H14.6842C15.0984 13.2887 15.4342 13.6244 15.4342 14.0387V20.25H18.4107L18.5232 19.5295C18.9972 16.494 18.9563 13.4004 18.4022 10.3785C18.3739 10.224 18.2976 10.0823 18.1843 9.97357L13.5578 5.53423ZM9.40363 4.45191C10.8546 3.05965 13.1454 3.05965 14.5964 4.45191L19.2228 8.89125C19.5634 9.21804 19.7925 9.64373 19.8776 10.108C20.4621 13.2956 20.5053 16.559 20.0052 19.7609L19.8245 20.9184C19.7497 21.3971 19.3374 21.75 18.8529 21.75H14.6842C14.27 21.75 13.9342 21.4142 13.9342 21V14.7887H10.0658V21C10.0658 21.4142 9.73 21.75 9.31579 21.75H5.14706C4.66258 21.75 4.25029 21.3971 4.17554 20.9184L3.99478 19.7609C3.49473 16.559 3.53788 13.2956 4.12241 10.108C4.20754 9.64373 4.43662 9.21804 4.77719 8.89125L9.40363 4.45191Z"
                            />
                        </svg>
                    </Link>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.96967 7.46967C10.2626 7.17678 10.7374 7.17678 11.0303 7.46967L15.0303 11.4697C15.3232 11.7626 15.3232 12.2374 15.0303 12.5303L11.0303 16.5303C10.7374 16.8232 10.2626 16.8232 9.96967 16.5303C9.67678 16.2374 9.67678 15.7626 9.96967 15.4697L13.4393 12L9.96967 8.53033C9.67678 8.23744 9.67678 7.76256 9.96967 7.46967Z"
                        />
                    </svg>
                    <span className="text-gray-700">Booth Profile</span>
                </nav>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-700 mb-2">
                        Booth Profile
                    </h1>
                    <p className="text-gray-600">Manage your booth.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Booth Logo
                            </h2>
                            <div className="flex flex-col lg:flex-row gap-4 items-center">
                                <div className="flex flex-col items-center mx-auto mb-4">
                                    <div className="relative">
                                        <div className="w-48 h-48 bg-gray-300 rounded-full overflow-hidden border border-gray-200">
                                            <img
                                                src={
                                                    previewUrl ??
                                                    "/images/placeholder.png"
                                                }
                                                alt="Booth Picture"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <label
                                            htmlFor="image"
                                            className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors transform translate-x-1 translate-y-1 cursor-pointer"
                                        >
                                            <EditIcon size={18} />
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                    <span className="px-4 text-sm text-gray-700">
                                        Make sure image is below 5MB
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Booth Information
                            </h2>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Booth Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter booth name.."
                                    value={data?.name}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                />
                                {errors.name && (
                                    <p className={errorClass}>{errors.name}</p>
                                )}
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
                                    placeholder="Enter booth description.."
                                    value={data?.description}
                                    onChange={handleInputChange}
                                    className={inputClass}
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
                                Contact
                            </h2>
                            {[
                                {
                                    id: "email",
                                    label: "Email",
                                    type: "email",
                                    placeholder: "contact@yourcompany.com",
                                    value: data?.email,
                                },
                                {
                                    id: "phone",
                                    label: "Phone",
                                    type: "tel",
                                    placeholder: "0812345678",
                                    value: data?.phone,
                                },
                                {
                                    id: "instagram",
                                    label: "Instagram",
                                    type: "text",
                                    placeholder: "https://instagram.com/",
                                    value: data?.instagram,
                                },
                                {
                                    id: "twitter",
                                    label: "X",
                                    type: "text",
                                    placeholder: "https://x.com/",
                                    value: data?.twitter,
                                },
                            ].map((field) => (
                                <div key={field.id}>
                                    <label
                                        htmlFor={field.id}
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.id}
                                        type={field.type}
                                        value={field.value ?? ""}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        className={inputClass}
                                    />
                                    {errors[field.id] && (
                                        <p className={errorClass}>
                                            {errors[field.id]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Status
                            </h2>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Visibility:
                                    </span>
                                    <span className="text-gray-700 font-medium">
                                        Public
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Created:
                                    </span>
                                    <span className="text-gray-700 font-medium">
                                        4 April 2025
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-3">
                            <Button
                                size={"sm"}
                                onClick={() => setSaveOpen(true)}
                            >
                                <SaveIcon />
                                <span>Save Profile</span>
                            </Button>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => setCancelOpen(true)}
                            >
                                <CancelIcon />
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {saveOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setSaveOpen(false)}
                    />
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Save Booth Profile?
                        </h3>
                        <p className="text-sm text-gray-500">
                            You can always change this later.
                        </p>
                        <div className="flex flex-row-reverse gap-3 mt-4">
                            <Button size={"sm"} onClick={handleSave}>
                                Save
                            </Button>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => setSaveOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {cancelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setCancelOpen(false)}
                    />
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Discard Booth Profile?
                        </h3>
                        <p className="text-sm text-gray-500">
                            All changes will be lost.
                        </p>
                        <div className="flex flex-row-reverse gap-3 mt-4">
                            <Button
                                size={"sm"}
                                variant={"danger"}
                                onClick={handleCancel}
                            >
                                Yes, discard
                            </Button>
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => setCancelOpen(false)}
                            >
                                No, keep editing
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
