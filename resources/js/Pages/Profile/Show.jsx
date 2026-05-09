import { useState, useRef } from "react";
import { HomeIcon, ChevronRightIcon, EditIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { Link } from "@inertiajs/react";
import DashboardLayout from "../DashboardLayout";

export default function Profile() {
    const [avatarSrc, setAvatarSrc] = useState(
        "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
    const [showDialog, setShowDialog] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarSrc(url);
        }
    };

    return (
        <DashboardLayout>
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
                        Profile
                    </Link>
                </nav>

                <div className="bg-white rounded-lg p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                        Profile
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center md:items-start mx-auto">
                            <div className="relative">
                                <div className="w-48 h-48 bg-gray-300 rounded-lg overflow-hidden">
                                    <img
                                        src={avatarSrc}
                                        alt="Profile Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label
                                    htmlFor="image"
                                    className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors transform translate-x-1 translate-y-1 cursor-pointer"
                                >
                                    <EditIcon size={18} />
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-x divide-gray-300">
                                <div className="space-y-6 pr-6">
                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Johnny Silverhand"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="johnnysilverhand@gmail.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6 pr-6 md:px-6">
                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-2">
                                            Reset Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-2">
                                            Confirm Reset Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="md:pl-6 flex items-start">
                                    <Button
                                        size={"sm"}
                                        onClick={() => setShowDialog(true)}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className="absolute inset-0 bg-black/40"
                            onClick={() => setShowDialog(false)}
                        />
                        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                            <div className="px-6 pt-6 pb-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Save Profile?
                                </h3>
                                <p className="mt-2 text-sm text-gray-400">
                                    You can always change this later
                                </p>
                            </div>
                            <div className="px-6 py-4 flex flex-col-reverse sm:flex-row-reverse gap-3">
                                <Button onClick={() => setShowDialog(false)} size={'sm'}>
                                    Save
                                </Button>
                                <Button onClick={() => setShowDialog(false)} variant={'outline'} size={'sm'}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
