import React, { useState } from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import { EmailIcon, EyeCloseIcon, EyeOpenIcon, GoogleIcon, LockIcon } from "../../Components/Icons";
import Button from "../../Components/Buttons";

function InputField({
    icon,
    type = "text",
    placeholder,
    value,
    onChange,
    required,
    children,
}) {
    return (
        <div className="relative flex items-center">
            <span className="absolute left-4 pointer-events-none">{icon}</span>
            <input
                required={required}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full py-4 pl-12 pr-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
            />
            {children}
        </div>
    );
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen text-gray-700 bg-gray-100 flex justify-center">
                <main className="min-w-full lg:min-w-5xl bg-white shadow rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <div className="flex flex-1 flex-col p-12 space-y-4">
                        <Link href="/" className="text-gray-700">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" />
                            </svg>
                        </Link>
                        <div className="flex flex-col lg:my-6">
                            <h1 className="text-2xl xl:text-3xl font-bold">
                                Tokoku
                            </h1>
                            <p>Let's get you signed in</p>
                        </div>
                        <form
                            onSubmit={submit}
                            className="mt-6 flex flex-col space-y-4"
                        >
                            <InputField
                                icon={<EmailIcon />}
                                type="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            <InputField
                                icon={<LockIcon />}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                required
                            >
                                <Button
                                    type="button"
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="w-fit absolute right-2 text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors cursor-pointer"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeCloseIcon />
                                    ) : (
                                        <EyeOpenIcon />
                                    )}
                                </Button>
                            </InputField>
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                            <Button submit>
                                Sign in
                            </Button>
                        </form>
                        <Link href="/signup" className="text-center">
                            Don't have an account?{" "}
                            <span className="underline font-bold text-blue-500">
                                Sign Up
                            </span>
                        </Link>
                        <span className="text-center">Or continue with</span>
                        <div className="w-full flex-1">
                            <div className="flex flex-col items-center">
                                <Button variant={'secondary'}>
                                    <GoogleIcon/>
                                    <span>
                                        Sign in with Google
                                    </span>
                                </Button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by Tokoku's <br />
                                    <Link
                                        href="#"
                                        className="border-b border-gray-500 border-dotted"
                                    >
                                        Terms of Service
                                    </Link>
                                    <span> and its </span>
                                    <Link
                                        href="#"
                                        className="border-b border-gray-500 border-dotted"
                                    >
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="lg:w-3/5 min-h-52 bg-blue-100 text-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://www.anime-expo.org/wp-content/uploads/2017/04/anime-expo-los-angeles-convention-explore-exhibit-hall.jpg')",
                        }}
                    ></div>
                </main>
            </div>
        </>
    );
}
