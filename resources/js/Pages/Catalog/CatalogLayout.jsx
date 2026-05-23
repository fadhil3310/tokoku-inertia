import { Link, router } from "@inertiajs/react";
import Footer from "../../Components/Footer";
import { ArrowLeftIcon } from "../../Components/Icons";
import { useCallback } from "react";
import { cn } from "../../Utilities/cn";

export default function CatalogLayout({ showBack, hideHeader, hideFooter, disablePadding, children }) {
    const handleBack = useCallback(() => {
        window.history.back();
        document.startViewTransition();
    });

    return (
        <div className="flex flex-col h-screen">
            <header className={cn("fixed top-0 left-0 flex shrink-0 w-full bg-white px-4 py-3 shadow-sm z-2", hideHeader && "hidden")}>
                <div className="flex items-center gap-3">
                    {showBack && (
                        <button onClick={handleBack} className="cursor-pointer">
                            <ArrowLeftIcon />
                        </button>
                    )}

                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg [view-transition-name:header-booth-logo]">
                        T
                    </div>
                    <div className="flex flex-col [view-transition-name:header-booth-identity]">
                        <span className="text-xl font-bold text-gray-700">
                            Nama Toko
                        </span>
                        <span className="text-xs text-gray-500">by Tokoku</span>
                    </div>
                </div>
            </header>
            <div className={cn("w-full h-full min-h-max flex justify-center box-border bg-[#F9FAFB]", !disablePadding && "p-4", !hideHeader && "pt-20", )}>
                <main className="w-full h-full max-w-[1000px]">{children}</main>
            </div>

            <Footer className={cn("shrink-0 [view-transition-name:footer]", hideFooter && "hidden")} />
        </div>
    );
}
