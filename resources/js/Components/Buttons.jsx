import React from "react";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { Link } from '@inertiajs/react';

// CVA styling komponen biar ada variant (primary, outline, ghost, danger)
// style button utama untuk seluruh variant button
const buttonVariants = cva(
    "w-full cursor-pointer space-x-2 inline-flex items-center justify-center rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            variant: {
                primary:    "bg-blue-500 text-white hover:bg-blue-700",
                outline:    "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
                ghost:      "text-blue-500 hover:bg-blue-50",
                secondary:  "text-[#364153] bg-[#F3F4F6] hover:bg-[#F0F0F0]",
                danger:     "bg-red-500 text-white hover:bg-red-600",
            },
            size: {
                sm:  "px-3 py-1.5 text-sm",
                md:  "px-4 py-[15px] text-base",
                lg:  "px-6 py-3 text-lg",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export default function Button({ className, variant, size, href, children, submit = false, ...props }) {
    const classes = twMerge(buttonVariants({ variant, size }), className);

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={submit ? "submit" : "button"} className={classes} {...props}>
            {children}
        </button>
    );
}