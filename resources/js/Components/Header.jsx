import React, { useState } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import Button from "../Components/Buttons";

export default function Header() {
    const { url, props: { auth } } = usePage();
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <header className="fixed top-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 transition-all duration-300 left-0">
            <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
                        T
                    </div>
                    <span className="text-xl font-bold text-gray-800 tracking-tight">
                        Tokoku
                    </span>
                </Link>
                <div className="flex items-center gap-4 ml-auto">
                    {
                        auth ?
                        (
                            <div className="relative">
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 text-gray-700"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                        {auth.user.image ? (
                                            <img
                                                src={auth.user.image}
                                                alt={auth.user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            auth.user.name
                                                .split(' ')
                                                .slice(0, 2)
                                                .map(word => word[0])
                                                .join('')
                                                .toUpperCase()
                                        )}
                                    </div>
                                    <span className="hidden md:inline text-sm font-medium">{auth.user.name || ""}</span>
                                </Button>
                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                        <Link
                                            href="/dashboard"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={`/profile/${auth?.user.id}`}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )
                        :
                        (
                            <Button
                                href="/login"
                                className="hidden sm:flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Get Started
                            </Button>
                        )
                    }
                </div>
            </div>
        </header>
    );
}
