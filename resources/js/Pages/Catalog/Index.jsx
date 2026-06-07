import { useMemo, useState } from "react";
import CatalogLayout from "./CatalogLayout";
import { SearchIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { ProductCategories } from "../../Shared/productCategories";
import { cn } from "../../Utilities/cn";
import { Link, usePage } from "@inertiajs/react";

function ProductCategoryChip({ value, selected, children, onClick }) {
    return (
        <button
            className={cn(
                "shrink-0 px-4 py-1.5 bg-[#F3F4F6] rounded-2xl text-[#4A5565] font-medium cursor-pointer text-sm",
                selected && "bg-[#2B7FFF] text-white"
            )}
            onClick={() => onClick(value)}
            type="button"
        >
            {children}
        </button>
    );
}

// --- NEW BOOTH PROFILE COMPONENT ---
function BoothProfile({ booth }) {
    if (!booth) return null;

    return (
        <div className="p-6 mb-6 shadow-sm rounded-xl bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-gray-100">
            {/* Booth Image / Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                {booth.image ? (
                    <img
                        src={`/storage/${booth.image}`}
                        alt={booth.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400 font-bold text-3xl uppercase">
                        {booth.name?.charAt(0) || "B"}
                    </span>
                )}
            </div>

            <div className="flex flex-col text-center sm:text-left flex-1">
                {/* Title & Live Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {booth.name}
                    </h1>

                    {/* Only show this if current_event exists */}
                    {booth.current_event && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold uppercase tracking-wide w-fit mx-auto sm:mx-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Live at {booth.current_event.name}
                        </span>
                    )}
                </div>

                <p className="text-sm text-blue-600 font-medium mb-4">
                    by {booth.owner?.name || "Unknown Owner"}
                </p>

                {/* Event Info Box */}
                {booth.current_event && (
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200 w-fit mx-auto sm:mx-0">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4 text-gray-400 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                ></path>
                            </svg>
                            <span>
                                <span className="font-semibold text-gray-900">
                                    Booth:
                                </span>{" "}
                                {booth.current_event.booth_number}
                            </span>
                        </div>
                        <div className="hidden sm:block w-px bg-gray-300"></div>{" "}
                        {/* Divider */}
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4 text-gray-400 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                ></path>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                            </svg>
                            <span>{booth.current_event.location}</span>
                        </div>
                    </div>
                )}

                {booth.description && (
                    <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                        {booth.description}
                    </p>
                )}
            </div>
        </div>
    );
}
// -----------------------------------

function ProductFilter({ boothId }) {
    // goofy ahh framework, doesnt even provide a proper way to get url params.
    // having to rely on native js api for most stuff, whoever uses inertia in a commercial project is a retard and need their iq checked.
    const [searchQuery, setSearchQuery] = useState(
        new URLSearchParams(window.location.search).get("search") ?? ""
    );
    const [selectedCategory, setSelectedCategory] = useState(
        new URLSearchParams(window.location.search).get("category") ?? ""
    );

    return (
        <div className="p-4 shadow-sm rounded-xl bg-white">
            <form action={route("catalog", boothId)} method="GET">
                <div className="flex gap-3">
                    <div className="w-full flex items-center gap-2 px-3 py-2 border-1 border-[#D1D5DC] rounded-lg">
                        <SearchIcon />
                        <input
                            type="text"
                            name="search"
                            className="w-full sm placeholder:text-[#757575] text-sm focus:outline-0"
                            placeholder="Search something..."
                            value={searchQuery}
                            onChange={(ev) => setSearchQuery(ev.target.value)}
                        />
                    </div>

                    <Button className="w-auto px-6 py-2" submit>
                        Search
                    </Button>
                </div>

                <div className="flex gap-1 mt-3 overflow-auto scrollbar-hide">
                    <ProductCategoryChip
                        selected={selectedCategory == ""}
                        value={""}
                        onClick={setSelectedCategory}
                    >
                        All Category
                    </ProductCategoryChip>
                    {ProductCategories.map((x) => (
                        <ProductCategoryChip
                            key={x.value}
                            value={x.value}
                            selected={selectedCategory == x.value}
                            onClick={setSelectedCategory}
                        >
                            {x.label}
                        </ProductCategoryChip>
                    ))}
                </div>

                <input
                    type="text"
                    name="category"
                    value={selectedCategory}
                    hidden
                    readOnly
                />
            </form>
        </div>
    );
}

function ProductCard({ boothId, productId, name, image, price }) {
    const formattedPrice = useMemo(() => {
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Math.abs(price));
        return formatted;
    }, [price]);

    return (
        <Link
            href={route("catalog.show", { boothId, id: productId })}
            viewTransition
        >
            <div className="w-full flex flex-col bg-white rounded-xl border-1 border-[#E5E7EB] cursor-pointer hover:shadow-sm hover:translate-y-[-5px] transition-transform">
                <div className="w-full shrink-0 p-2 bg-[#F3F4F6] rounded-t-xl">
                    <img
                        className="w-full aspect-square object-cover rounded-lg"
                        style={{
                            viewTransitionName: `product-image-${productId}`,
                        }}
                        src={image}
                        alt={name}
                    />
                </div>
                <div className="flex flex-col h-full shrink-1 p-2">
                    <h2
                        className="h-full mb-2 font-medium text-xs text-gray-900"
                        style={{
                            viewTransitionName: `product-name-${productId}`,
                        }}
                    >
                        {name}
                    </h2>
                    <div className="flex">
                        <p
                            className="w-full text-[#2B7FFF] font-semibold text-base"
                            style={{
                                viewTransitionName: `product-price-${productId}`,
                            }}
                        >
                            {formattedPrice}
                        </p>
                        <p className="shrink-0 text-[#99A1AF] text-xs mt-1"></p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function ProductPagination({ links }) {
    if (!links || links.length <= 3) return null; // Hide if only Prev/Next exist

    return (
        <div className="flex justify-center items-center mt-6">
            <div className="flex gap-2 overflow-auto items-center pb-2 scrollbar-hide">
                {links.map((item, i) => (
                    <Button
                        key={i}
                        href={item.url}
                        size="sm"
                        variant={item.active ? "primary" : "outline"}
                        className="w-min h-min whitespace-nowrap"
                        disabled={
                            (i == 0 || i == links.length - 1) && !item.url
                        }
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html:
                                    i == 0
                                        ? "Prev"
                                        : i == links.length - 1
                                        ? "Next"
                                        : item.label,
                            }}
                        />
                    </Button>
                ))}
            </div>
        </div>
    );
}

// Ensure you destructure 'booth' from the Inertia props
export default function Index({ products, booth }) {
    console.log("atu", booth);
    return (
        <CatalogLayout>
            {/* Added the Booth Profile Here */}
            <BoothProfile booth={booth} />

            <ProductFilter boothId={booth.id} />

            {!products?.data || products.data.length == 0 ? (
                <div className="w-full mt-10 mb-10 flex flex-col items-center justify-center text-gray-500">
                    <svg
                        className="w-12 h-12 mb-3 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.905.553l-.92 1.838a1 1 0 01-.894.553H9.305a1 1 0 01-.894-.553l-.92-1.838A1 1 0 006.586 13H4"
                        ></path>
                    </svg>
                    <p>No products found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-7">
                    {products.data.map((item) => (
                        <ProductCard
                            key={item.id}
                            boothId={booth.id}
                            productId={item.id}
                            image={item.image_path}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            )}

            <ProductPagination links={products?.links || []} />
        </CatalogLayout>
    );
}
