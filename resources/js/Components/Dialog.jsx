import { AnimatePresence, motion } from "motion/react";
import Button from "./Buttons";
import { cn } from "../Utilities/cn";

export default function Dialog({
    isOpen,
    title,
    message,
    image = null,
    showConfirm = true,
    confirmLabel = "Ok",
    confirmClassName = "",
    onConfirm,
    showClose = true,
    closeLabel = "Close",
    closeClassName = "",
    onClose,
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        className="fixed inset-0 bg-black/40 transition-opacity"
                        onClick={onClose}
                    />
                    <motion.div
                        className="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl overflow-hidden"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 1.1 }}
                        transition={{
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        <div className="px-6 pt-6 pb-4 text-center">
                            {image && <img src={image} />}
                            <h3 className="text-lg font-semibold text-gray-800">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-400">
                                {message}
                            </p>
                        </div>
                        <div
                            className={cn(
                                "flex flex-row-reverse gap-2 px-6 py-4 bg-white",
                                confirmClassName
                            )}
                        >
                            {showConfirm && (
                                <Button onClick={onConfirm} size={"sm"}>
                                    {confirmLabel}
                                </Button>
                            )}

                            {showClose && (
                                <Button
                                    onClick={onClose}
                                    size={"sm"}
                                    variant={"outline"}
                                    className={closeClassName}
                                >
                                    {closeLabel}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
