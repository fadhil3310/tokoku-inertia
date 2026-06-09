import { useState, useEffect } from "react";
import {
    CatalogueIcon,
    EmailIcon,
    EyeCloseIcon,
    EyeOpenIcon,
    GoogleIcon,
    LockIcon,
    UserIcon,
} from "../../Components/Icons";
import { Link, Head, useForm } from "@inertiajs/react";
import Button from "../../Components/Buttons";

function InputField({
    icon,
    type = "text",
    placeholder,
    value,
    onChange,
    required,
    error,
    children,
    ...props
}) {
    return (
        <div className="flex flex-col space-y-1">
            <div className="relative flex items-center">
                {icon && <span className="absolute left-4 pointer-events-none">{icon}</span>}
                <input
                    required={required}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full py-4 ${icon ? 'pl-12' : 'pl-4'} pr-12 rounded-lg font-medium bg-gray-100 border ${
                        error ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors`}
                    {...props}
                />
                {children}
            </div>
            {error && <span className="text-red-500 text-xs ml-1">{error}</span>}
        </div>
    );
}

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "", 
        role: "tenant", 
        boothName: "",
        boothIcon: null, 
        redirect: "", // Added redirect to state
    });

    // Capture the ?redirect= URL parameter on component mount
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const redirectParam = queryParams.get("redirect");
        if (redirectParam) {
            setData("redirect", redirectParam);
        }
    }, []);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const isStep1Valid = data.name.trim() !== "" && isEmailValid && data.password.length >= 8 &&data.password === data.password_confirmation;
    // const isStep1Valid = data.name.trim() !== "" && data.email.trim() !== "" && data.password !== "" && data.password_confirmation !== "";
    const isStep2Valid = data.role !== "";
    const isStep3Valid = data.boothName.trim() !== "";

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Inertia will automatically convert data to FormData because boothIcon is a File,
        // so you do not need to manually configure headers.
        post('/signup');
    };

    return (
        <>
            <Head title="Signup" />

            <div className="min-h-screen bg-gray-100 text-gray-700 flex justify-center items-center">
                <main className="w-full max-w-5xl min-h-214 bg-white shadow-lg rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row">
                    <div className="flex flex-1 flex-col p-12 space-y-4">
                        <div className="flex flex-col lg:my-6">
                            <h1 className="text-2xl xl:text-3xl font-bold">Tokoku</h1>
                            <p className="text-gray-500 mt-1">Create an account</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                            <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 || (step === 2 && data.role === 'event organizer') ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                            
                            {/* --- STEP 1: Personal Data --- */}
                            {step === 1 && (
                                <div className="flex flex-col flex-1 space-y-4 animate-fade-in">
                                    <span className="text-sm font-semibold text-gray-800">Personal Data</span>
                                    
                                    <InputField
                                        icon={<UserIcon />}
                                        placeholder="Full Name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        error={errors.name}
                                        required
                                    />
                                    <InputField
                                        icon={<EmailIcon />}
                                        type="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        error={errors.email}
                                        required
                                    />
                                    <InputField
                                        icon={<LockIcon />}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        error={errors.password}
                                        required
                                    >
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="w-fit absolute right-2 text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors cursor-pointer"
                                        >
                                            {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
                                        </Button>
                                    </InputField>

                                    <InputField
                                        icon={<LockIcon />}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        required
                                    />

                                    <Button 
                                        type="button" 
                                        onClick={handleNext} 
                                        className="mt-5"
                                        disabled={!isStep1Valid}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}

                            {/* --- STEP 2: Role Selection --- */}
                            {step === 2 && (
                                <div className="flex flex-col flex-1 space-y-4 animate-fade-in">
                                    <span className="text-sm font-semibold text-gray-800">I am a...</span>
                                    
                                    <div className="flex flex-col space-y-3">
                                        <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${data.role === 'tenant' ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center space-x-3">
                                                <input 
                                                    type="radio" 
                                                    name="role" 
                                                    value="tenant" 
                                                    checked={data.role === 'tenant'} 
                                                    onChange={(e) => setData('role', e.target.value)}
                                                    className="w-4 h-4 text-gray-800 focus:ring-gray-800 accent-blue-500"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-800">Tenant</span>
                                                    <span className="text-sm text-gray-500">I want to open a booth and sell items.</span>
                                                </div>
                                            </div>
                                        </label>

                                        <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${data.role === 'event organizer' ? 'border-gray-800 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center space-x-3">
                                                <input 
                                                    type="radio" 
                                                    name="role" 
                                                    value="event organizer" 
                                                    checked={data.role === 'event organizer'} 
                                                    onChange={(e) => setData('role', e.target.value)}
                                                    className="w-4 h-4 text-gray-800 focus:ring-gray-800 accent-blue-500"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-800">Event Organizer</span>
                                                    <span className="text-sm text-gray-500">I want to host and manage events.</span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    
                                    {errors.role && <span className="text-red-500 text-xs">{errors.role}</span>}

                                    <div className="flex space-x-3 mt-auto pt-6">
                                        <Button type="button" variant="secondary" onClick={handleBack} className="flex-1">
                                            Back
                                        </Button>
                                        {data.role === 'tenant' ? (
                                            <Button 
                                                type="button" 
                                                onClick={handleNext} 
                                                className="flex-1"
                                                disabled={!isStep2Valid}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button 
                                                type="submit" 
                                                disabled={processing || !isStep2Valid} 
                                                className="flex-1"
                                            >
                                                Sign up
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* --- STEP 3: Booth Data (Only for Tenants) --- */}
                            {step === 3 && data.role === 'tenant' && (
                                <div className="flex flex-col flex-1 space-y-4 animate-fade-in">
                                    <span className="text-sm font-semibold text-gray-800">Booth Setup</span>
                                    
                                    <InputField
                                        icon={<CatalogueIcon />}
                                        placeholder="Booth Name"
                                        value={data.boothName}
                                        onChange={(e) => setData("boothName", e.target.value)}
                                        error={errors.boothName}
                                        required
                                    />

                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium text-gray-600">Booth Icon (Optional)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            // Handle file objects properly for Inertia
                                            onChange={(e) => setData("boothIcon", e.target.files[0])}
                                            className="w-full py-3 px-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                                        />
                                        {errors.boothIcon && <span className="text-red-500 text-xs">{errors.boothIcon}</span>}
                                    </div>

                                    <div className="flex space-x-3 mt-auto pt-6">
                                        <Button type="button" variant="secondary" onClick={handleBack} className="flex-1">
                                            Back
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            disabled={processing || !isStep3Valid} 
                                            className="flex-1"
                                        >
                                            Sign up
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>

                        <div className="flex flex-col animate-fade-in">
                            <Link href={data.redirect ? `/login?redirect=${data.redirect}` : "/login"} className="text-center text-sm my-2">
                                Already have an account?{" "}
                                <span className="underline font-bold text-blue-500">Sign in</span>
                            </Link>

                            <p className="text-center text-sm my-2">Or continue with</p>

                            <div className="w-full flex flex-col items-center">
                                <Button variant="secondary" className="w-full">
                                    <GoogleIcon />
                                    <span className="ml-2">Sign up with Google</span>
                                </Button>
                            </div>
                        </div>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by Tokoku's <br />
                            <Link href="#" className="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </Link>
                            <span> and its </span>
                            <Link href="#" className="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                    <div
                        className="lg:w-3/5 min-h-52 bg-blue-100 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://www.anime-expo.org/wp-content/uploads/2017/04/anime-expo-los-angeles-convention-explore-exhibit-hall.jpg')",
                        }}
                        role="img"
                        aria-label="Tokoku booth showcase"
                    />
                </main>
            </div>
        </>
    );
}