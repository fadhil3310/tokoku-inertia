import { useState } from "react";
import {
    CatalogueIcon,
    EmailIcon,
    EyeCloseIcon,
    EyeOpenIcon,
    GoogleIcon,
    LockIcon,
    UserIcon,
} from "../Components/Icons";
import { Link, Head } from "@inertiajs/react";
import Button from "../Components/Buttons";

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

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        boothName: "",
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle sign up logic
        console.log(form);
    };

    return (
        <>
            <Head title="Signup" />

            <div className="min-h-screen bg-gray-100 text-gray-700 flex justify-center items-center">
                <main className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row">
                    <div className="flex flex-1 flex-col p-12 space-y-4">
                        <div className="flex flex-col lg:my-6">
                            <h1 className="text-2xl xl:text-3xl font-bold">
                                Tokoku
                            </h1>
                            <p className="">Create an account</p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-4 flex flex-col space-y-4"
                        >
                            <span className="text-sm font-medium">
                                Booth Data
                            </span>

                            <InputField
                                icon={<CatalogueIcon />}
                                placeholder="Booth Name"
                                value={form.boothName}
                                onChange={handleChange("boothName")}
                                required
                            />

                            <span className="text-sm font-medium">
                                Personal Data
                            </span>

                            <InputField
                                icon={<UserIcon />}
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange("name")}
                                required
                            />

                            <InputField
                                icon={<EmailIcon />}
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange("email")}
                                required
                            />

                            <InputField
                                icon={<LockIcon />}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange("password")}
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

                            <Button
                                type="submit"
                                className={'mt-5'}
                            >
                                Sign up
                            </Button>
                        </form>

                        <Link href="/login" className="text-center">
                            Already have an account?{" "}
                            <span className="underline font-bold text-blue-500">
                                Sign in
                            </span>
                        </Link>

                        <p className="text-center text-sm ">Or continue with</p>

                        <div className="w-full flex-1">
                            <div className="flex flex-col items-center">
                                <Button variant={'secondary'}>
                                    <GoogleIcon/>
                                    <span>
                                        Sign up with Google
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
                                    and its
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
                        className="lg:w-3/5 min-h-52 bg-blue-100 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://www.anime-expo.org/wp-content/uploads/2017/04/anime-expo-los-angeles-convention-explore-exhibit-hall.jpg')",
                        }}
                        role="img"
                        aria-label="Tokoku booth showcase"
                    />
                </main>
            </div>
        </>
    );
}
