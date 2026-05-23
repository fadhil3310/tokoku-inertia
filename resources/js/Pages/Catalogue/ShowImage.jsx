import Button from "../../Components/Buttons";
import { ArrowLeftIcon } from "../../Components/Icons";
import CatalogueLayout from "./CatalogueLayout";
import { useCallback } from "react";

export default function ShowImage({ id, image }) {
    const handleBack = useCallback(() => {
        window.history.back();
        document.startViewTransition();
    });

    return (
        <CatalogueLayout hideHeader hideFooter disablePadding>
            <div className="flex items-center justify-center gap-2 h-screen p-4">
                <Button onClick={handleBack} className="mr-4 h-min w-min animate-[slide-from-bottom_0.5s_var(--ease-out-quint)]">
                    <ArrowLeftIcon size={42} />
                </Button>

                <img
                    className="h-full aspect-square object-cover rounded-lg"
                    src={"/storage/" + image}
                    style={{ viewTransitionName: `product-image-${id}` }}
                />
            </div>
        </CatalogueLayout>
    );
}
