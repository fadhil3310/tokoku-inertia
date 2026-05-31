import { useMemo, useState } from "react";
import CatalogLayout from "./CatalogLayout";
import { SearchIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";
import { ProductCategories } from "../../Shared/productCategories";
import { cn } from "../../Utilities/cn";
import { Link } from "@inertiajs/react";

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

function ProductFilter() {
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
            <form action="/catalog" method="GET">
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

                <div className="flex gap-1 mt-3 overflow-auto">
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
                />
            </form>
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

function ProductPagination({ links }) {
    return (
        <div className="flex justify-center items-center mt-4 ">
            <div className="flex gap-2 overflow-auto items-center">
                {links.map((item, i) => (
                    <Button
                        href={item.url}
                        size="sm"
                        variant={item.active ? "primary" : "outline"}
                        className="w-min h-min"
                        disabled={
                            (i == 0 || i == links.length - 1) && !item.active
                        }
                    >
                        {i == 0
                            ? "Prev"
                            : i == links.length - 1
                            ? "Next"
                            : item.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default function Index({ products }) {
    return (
        <CatalogLayout>
            <ProductFilter />

            {products.data?.length == 0 ? (
                <div className="w-full mt-5 mb-5 flex items-center justify-center">
                    <p>No product</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-7">
                    {products.data.map((item) => (
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

            <ProductPagination links={products.links} />
        </CatalogLayout>
    );
}
