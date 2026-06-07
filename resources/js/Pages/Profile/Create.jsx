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
                    <Button onClick={onConfirm} size={"sm"}>
                        {confirmLabel}
                    </Button>
                    <Button onClick={onClose} size={"sm"} variant={"outline"}>
                        {title === "Save User?" ? "Cancel" : "No"}
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
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        image: null,
        role: "",
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
        post(route("profile.store"), {
            forceFormData: true,
        });
    };

    const handleCancel = () => {
        setCancelDialogOpen(false);
        window.location.href = route("profile.index");
    };

    const inputClass =
        "w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";

    const errorClass = "mt-1 text-xs text-red-500";

    return (
        <DashboardLayout>
            <Head title="Add User" />
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
                        href={"/profile"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Users
                    </Link>
                    <ChevronRightIcon />
                    <Link
                        href={"/profile/create"}
                        className="flex items-center text-gray-700 hover:text-blue-500"
                    >
                        Add User
                    </Link>
                </nav>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-700 mb-2">
                        Add New User
                    </h1>
                    <p className="text-gray-600">Create a new user account.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                User Information
                            </h2>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Full Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter full name.."
                                    className={inputClass}
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className={errorClass}>{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email *
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address.."
                                    className={inputClass}
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className={errorClass}>{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Security
                            </h2>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter password.."
                                        className={inputClass}
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className={errorClass}>
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Profile Picture
                            </h2>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Image
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
                                User Role
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-gray-600 mb-1"
                                    >
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        className={inputClass}
                                        value={data.role}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Choose role
                                        </option>
                                        <option value="admin">Admin</option>
                                        <option value="tenant">Tenant</option>
                                        <option value="event organizer">Event Organizer</option>
                                    </select>
                                    {errors.role && (
                                        <p className={errorClass}>
                                            {errors.role}
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
                                size={"sm"}
                            >
                                <SaveIcon />
                                <span>
                                    {processing ? "Saving..." : "Save User"}
                                </span>
                            </Button>
                            <Button
                                onClick={() => setCancelDialogOpen(true)}
                                disabled={processing}
                                size={"sm"}
                                variant={"outline"}
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
                    title="Save User?"
                    message="You can edit users later on user page."
                    confirmLabel="Save"
                    confirmClassName="bg-blue-500 hover:bg-blue-400"
                    onConfirm={handleSave}
                />

                <Dialog
                    isOpen={cancelDialogOpen}
                    onClose={() => setCancelDialogOpen(false)}
                    title="Discard this User?"
                    message="All changes will be lost."
                    confirmLabel="Yes"
                    confirmClassName="bg-red-500 hover:bg-red-400"
                    onConfirm={handleCancel}
                />
            </div>
        </DashboardLayout>
    );
}
