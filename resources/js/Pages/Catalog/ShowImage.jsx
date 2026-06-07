import Button from "../../Components/Buttons";
import { ArrowLeftIcon } from "../../Components/Icons";
import CatalogueLayout from "./CatalogLayout";
import { useCallback } from "react";

export default function ShowImage({ id, image }) {
    const handleBack = useCallback(() => {
        window.history.back();
        document.startViewTransition();
    });

    return (
        <CatalogueLayout hideHeader hideFooter disablePadding>
            <div className="flex items-center justify-center h-screen ">
                <div className="relative h-full p-4 box-border">
                    <img
                        className="h-full aspect-square object-cover rounded-lg"
                        src={image}
                        style={{ viewTransitionName: `product-image-${id}` }}
                    />

                    <Button
                        onClick={handleBack}
                        className="absolute top-6 left-6 z-100 mr-4 p-2 h-min w-min animate-[slide-from-bottom_0.5s_var(--ease-out-quint)] bg-[#00000050]"
                    >
                        <ArrowLeftIcon size={32} />
                    </Button>
                </div>
            </div>
        </CatalogueLayout>
    );
}
