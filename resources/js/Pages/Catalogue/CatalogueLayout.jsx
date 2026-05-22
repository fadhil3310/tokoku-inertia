import Footer from "../../Components/Footer";

export default function CatalogueLayout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex shrink-0 bg-white px-4 py-3 shadow-md z-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        T
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-700">
                            Nama Toko
                        </span>
                        <span className="text-xs text-gray-500">by Tokoku</span>
                    </div>
                </div>
            </header>
            <div className="w-full h-full min-h-max flex justify-center p-4 bg-[#F9FAFB]">
                <main className="w-full max-w-[1000px] h-full">{children}</main>
            </div>

            <Footer className="shrink-0" />
        </div>
    );
}
