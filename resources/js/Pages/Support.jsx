import React, { useRef, useState, useEffect } from "react";
import LandingPageLayout from "../Layouts/LandingPageLayout";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";

export default function Support() {
    const { flash } = usePage();
    const { data, setData, post, processing, errors } = useForm({
        fullName: "",
        email: "",
        category: "",
        description: "",
        image: null,
    });

    const imageInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleChange = (e) => {
        const { id, value, files, type } = e.target;
        setData(id, type === "file" ? files[0] : value);
        if (type === "file") {
            setImageUrl(URL.createObjectURL(files[0]));
        }
    };

    const handleSave = () => {
        post(route("support.store"), {
            forceFormData: true,
        });
    };

    const handlePickFile = () => {
        imageInputRef.current.click();
    };

    useEffect(() => {
        if (flash.status != null) {
            toast.success(flash.message);
        }
    }, [flash]);

    const errorClass = "mt-1 text-xs text-red-500";

    return (
        <LandingPageLayout>
            <div className="pb-20 pt-36 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto animate-fade-in text-slate-800">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
                        Support Center
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        Experiencing an issue with your booth or transactions?
                        Submit a ticket and our team will fix it ASAP.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-10 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-bold text-slate-700 mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    value={data.fullName}
                                    onChange={handleChange}
                                />
                                {errors.fullName && (
                                    <p className={errorClass}>
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-slate-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className={errorClass}>{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-bold text-slate-700 mb-2"
                            >
                                Issue Category
                            </label>
                            <select
                                id="category"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-600 appearance-none"
                                value={data.category}
                                onChange={handleChange}
                            >
                                <option value="" disabled defaultValue>
                                    Select an issue category...
                                </option>
                                <option value="Bug / Technical Issue">
                                    Bug / Technical Issue
                                </option>
                                <option value="Billing & Subscription">
                                    Billing & Subscription
                                </option>
                                <option value="Booth Management">
                                    Booth Management
                                </option>
                                <option value="Feature Request">
                                    Feature Request
                                </option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && (
                                <p className={errorClass}>{errors.category}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-bold text-slate-700 mb-2"
                            >
                                Issue Description (Max 500 characters)
                            </label>
                            <textarea
                                id="description"
                                rows="5"
                                placeholder="Please describe the issue you're facing in detail..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                value={data.description}
                                onChange={handleChange}
                            ></textarea>
                            {errors.description && (
                                <p className={errorClass}>
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                Attach Screenshot (Optional)
                            </label>
                            <div
                                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                                onClick={handlePickFile}
                            >
                                {data["image"] == null ? (
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <span className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                <span>Upload a file</span>
                                            </span>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                ) : (
                                    <img
                                        src={imageUrl}
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
                            <input
                                ref={imageInputRef}
                                id="image"
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleChange}
                            />
                            {errors.image && (
                                <p className={errorClass}>{errors.image}</p>
                            )}
                        </div>

                        <button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-sm hover:shadow-md mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={handleSave}
                            disabled={processing}
                        >
                            {processing ? "Sending..." : "Submit Issue"}
                        </button>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
}
