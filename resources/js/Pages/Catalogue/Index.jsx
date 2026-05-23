import { useMemo, useState } from "react";
import CatalogueLayout from "./CatalogueLayout";
import { SearchIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { ProductCategories } from "../../Shared/productCategories";
import { cn } from "../../Utilities/cn";
import { Link } from "@inertiajs/react";

function ProductCategoryChip({ selected, children, onClick }) {
    return (
        <button
            className={cn(
                "shrink-0 px-4 py-1.5 bg-[#F3F4F6] rounded-2xl text-[#4A5565] font-medium cursor-pointer text-sm",
                selected && "bg-[#2B7FFF] text-white"
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function ProductFilter({ search, category, onSearchChange, onCategoryChange }) {
    return (
        <div className="p-4 shadow-sm rounded-xl bg-white">
            <div className="flex gap-3">
                <div className="w-full flex items-center gap-2 px-3 py-2 border-1 border-[#D1D5DC] rounded-lg">
                    <SearchIcon />
                    <input
                        type="text"
                        className="w-full sm placeholder:text-[#757575] text-sm focus:outline-0"
                        placeholder="Search something..."
                        value={search}
                        onChange={(ev) => onSearchChange(ev.target.value)}
                    />
                </div>

                <Button className="w-auto px-6 py-2">Search</Button>
            </div>

            <div className="flex gap-1 mt-3 overflow-auto">
                <ProductCategoryChip
                    selected={category == ""}
                    onClick={() => onCategoryChange("")}
                >
                    All Category
                </ProductCategoryChip>
                {ProductCategories.map((x) => (
                    <ProductCategoryChip
                        key={x.value}
                        selected={category == x.value}
                        onClick={() => onCategoryChange(x.value)}
                    >
                        {x.label}
                    </ProductCategoryChip>
                ))}
            </div>
        </div>
    );
}

function ProductCard({ productId, name, image, price, sold }) {
    const formattedPrice = useMemo(() => {
        const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(Math.abs(price));
        return formatted;
    }, [price]);

    return (
        <Link href={route("catalog.show", productId)} viewTransition>
            <div className="w-full flex flex-col bg-white rounded-xl border-1 border-[#E5E7EB] cursor-pointer hover:shadow-sm hover:translate-y-[-5px] transition-transform">
                <div className="w-full shrink-0 p-2 bg-[#F3F4F6] rounded-t-xl">
                    <img
                        className="w-full aspect-square object-cover rounded-lg"
                        style={{
                            viewTransitionName: `product-image-${productId}`,
                        }}
                        src={image}
                    />
                </div>
                <div className="flex flex-col h-full shrink-1 p-2">
                    <h2
                        className="h-full mb-2 font-medium text-xs"
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
                        <p className="shrink-0 text-[#99A1AF] text-xs">
                            {sold} sold
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function Index({ products }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <CatalogueLayout>
            <ProductFilter
                search={searchQuery}
                onSearchChange={setSearchQuery}
                category={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            {products?.length == 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                    <p>No product</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-7">
                    {products.map((item) => (
                        <ProductCard
                            key={item.id}
                            productId={item.id}
                            image={"/storage/" + item.image}
                            name={item.name}
                            price={item.price}
                            sold={25}
                        />
                    ))}
                </div>
            )}
        </CatalogueLayout>
    );
}
