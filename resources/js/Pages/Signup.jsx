import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import DashboardLayout from "./DashboardLayout";
import { EyeCloseIcon, EyeOpenIcon, GoogleIcon } from "../Components/Icons";
import Button from "../Components/Buttons";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen text-gray-700 flex justify-center">
                <main className="min-w-full lg:min-w-5xl bg-white shadow rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <div className="flex flex-1 flex-col p-12 space-y-4">
                        {/* <Link href="/" clLinkssName="text-gray-700">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11.0303 8.53033C11.3232 8.23744 11.3232 7.76256 11.0303 7.46967C10.7374 7.17678 10.2626 7.17678 9.96967 7.46967L5.96967 11.4697C5.82322 11.6161 5.75 11.8081 5.75 12C5.75 12.1017 5.77024 12.1987 5.80691 12.2871C5.84351 12.3755 5.89776 12.4584 5.96967 12.5303L9.96967 16.5303C10.2626 16.8232 10.7374 16.8232 11.0303 16.5303C11.3232 16.2374 11.3232 15.7626 11.0303 15.4697L8.31066 12.75H18C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H8.31066L11.0303 8.53033Z" />
                            </svg>
                        </Link> */}
                        <div className="flex flex-col lg:my-6">
                            <h1 className="text-2xl xl:text-3xl font-bold">
                                Tokoku
                            </h1>
                            <p>Create an account</p>
                        </div>
                        <form
                            action="home.html"
                            method="get"
                            className="mt-6 flex flex-col space-y-4"
                        >
                            <span className="text-sm">Booth Data</span>
                            <div className="flex items-center">
                                <input
                                    required
                                    className="w-full px-8 py-4 pl-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="booth_name"
                                    placeholder="Booth Name"
                                />
                                <div className="absolute translate-x-4 fill-current">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 7.25V7.13012C7.25 4.96238 8.71761 3.06964 10.8171 2.52979C11.5931 2.33024 12.4069 2.33024 13.1829 2.52979C15.2824 3.06964 16.75 4.96238 16.75 7.13013V7.25H18.2511C18.8224 7.25 19.3072 7.66898 19.3901 8.23423L19.6087 9.72668C20.0393 12.6651 20.0393 15.6507 19.6087 18.5891C19.4008 20.0081 18.2565 21.1052 16.83 21.2531L16.2011 21.3183C13.4079 21.608 10.5921 21.608 7.79887 21.3183L7.17 21.2531C5.74346 21.1052 4.59917 20.0081 4.39125 18.5891C3.96071 15.6507 3.96071 12.6651 4.39125 9.72668L4.60993 8.23423C4.69275 7.66898 5.17759 7.25 5.74887 7.25H7.25ZM11.1906 3.98252C11.7216 3.84599 12.2784 3.84599 12.8094 3.98252C14.2458 4.3519 15.25 5.64693 15.25 7.13013V7.25H8.75V7.13012C8.75 5.64693 9.75415 4.3519 11.1906 3.98252ZM7.25 8.75V11C7.25 11.4142 7.58579 11.75 8 11.75C8.41421 11.75 8.75 11.4142 8.75 11V8.75H15.25V11C15.25 11.4142 15.5858 11.75 16 11.75C16.4142 11.75 16.75 11.4142 16.75 11V8.75H17.9496L18.1246 9.94414C18.534 12.7384 18.534 15.5774 18.1246 18.3717C18.0161 19.1118 17.4193 19.684 16.6753 19.7611L16.0464 19.8264C13.356 20.1054 10.644 20.1054 7.95359 19.8264L7.32472 19.7611C6.58068 19.684 5.98385 19.1118 5.87541 18.3717C5.46599 15.5774 5.46599 12.7384 5.87541 9.94414L6.05037 8.75H7.25Z"/></svg>
                                </div>
                            </div><span className="text-sm">Personal Data</span>
                            <div className="flex items-center">
                                <input
                                    required
                                    className="w-full px-8 py-4 pl-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="name"
                                    placeholder="Name"
                                />
                                <div className="absolute translate-x-4 fill-current">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75 7.5C7.75 5.15279 9.65279 3.25 12 3.25C14.3472 3.25 16.25 5.15279 16.25 7.5C16.25 9.84721 14.3472 11.75 12 11.75C9.65279 11.75 7.75 9.84721 7.75 7.5ZM12 4.75C10.4812 4.75 9.25 5.98122 9.25 7.5C9.25 9.01878 10.4812 10.25 12 10.25C13.5188 10.25 14.75 9.01878 14.75 7.5C14.75 5.98122 13.5188 4.75 12 4.75Z"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.75C6.75736 14.75 5.75 15.7574 5.75 17V18.1883C5.75 18.2064 5.76311 18.2218 5.78097 18.2247C9.89972 18.8972 14.1003 18.8972 18.219 18.2247C18.2369 18.2218 18.25 18.2064 18.25 18.1883V17C18.25 15.7574 17.2426 14.75 16 14.75H15.6591C15.6328 14.75 15.6066 14.7542 15.5815 14.7623L14.716 15.045C12.9512 15.6212 11.0488 15.6212 9.28398 15.045L8.41847 14.7623C8.39342 14.7542 8.36722 14.75 8.34087 14.75H8ZM4.25 17C4.25 14.9289 5.92893 13.25 8 13.25H8.34087C8.52536 13.25 8.70869 13.2792 8.88407 13.3364L9.74959 13.6191C11.2119 14.0965 12.7881 14.0965 14.2504 13.6191L15.1159 13.3364C15.2913 13.2792 15.4746 13.25 15.6591 13.25H16C18.0711 13.25 19.75 14.9289 19.75 17V18.1883C19.75 18.9415 19.2041 19.5837 18.4607 19.7051C14.1819 20.4037 9.8181 20.4037 5.53927 19.7051C4.79588 19.5837 4.25 18.9415 4.25 18.1883V17Z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    required
                                    className="w-full px-8 py-4 pl-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                />
                                <div className="absolute translate-x-4 fill-current">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M2.80369 8.3533C2.52355 10.9562 2.53604 13.9582 2.92586 16.5505C3.14156 17.9849 4.31223 19.0845 5.7573 19.2102L7.26753 19.3414C10.4166 19.6152 13.5834 19.6152 16.7325 19.3414L18.2427 19.2102C19.6878 19.0845 20.8585 17.9849 21.0742 16.5505C21.464 13.9582 21.4765 10.9564 21.1963 8.35345C21.1601 8.05169 21.1194 7.75034 21.0742 7.44949C20.8585 6.0151 19.6878 4.91545 18.2427 4.78983L16.7325 4.65855C13.5834 4.38481 10.4166 4.38481 7.26753 4.65855L5.7573 4.78983C4.31223 4.91545 3.14156 6.0151 2.92586 7.44949C2.88063 7.75028 2.83991 8.05159 2.80369 8.3533ZM7.39743 6.15292C10.46 5.88669 13.54 5.88669 16.6026 6.15292L18.1128 6.2842C18.8671 6.34977 19.4782 6.92379 19.5908 7.67254C19.6025 7.7503 19.6139 7.82809 19.625 7.90592L14.064 10.9954C12.7804 11.7085 11.2196 11.7085 9.93599 10.9954L4.37505 7.90596C4.38611 7.82812 4.39749 7.75031 4.40918 7.67254C4.52178 6.92379 5.13287 6.34977 5.8872 6.2842L7.39743 6.15292ZM19.8085 9.51989C20.0025 11.7876 19.9299 14.0725 19.5908 16.3274C19.4782 17.0762 18.8671 17.6502 18.1128 17.7158L16.6026 17.8471C13.54 18.1133 10.46 18.1133 7.39743 17.8471L5.8872 17.7158C5.13287 17.6502 4.52178 17.0762 4.40918 16.3274C4.07009 14.0725 3.99753 11.7877 4.1915 9.51992L9.20752 12.3066C10.9442 13.2714 13.0558 13.2714 14.7924 12.3066L19.8085 9.51989Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center relative">
                                <input
                                    required
                                    id="password"
                                    className="w-full px-8 py-4 pl-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                />
                                <div className="absolute translate-x-4 fill-current">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.5 16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16C13.5 16.8284 12.8284 17.5 12 17.5C11.1716 17.5 10.5 16.8284 10.5 16Z" />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M7.62165 10.5971L7.30621 7.75816C7.26577 7.39418 7.26577 7.02684 7.30621 6.66286L7.32898 6.45796C7.57046 4.28457 9.27907 2.56492 11.4509 2.30941C11.8157 2.26649 12.1843 2.26649 12.5491 2.30941C14.7209 2.56492 16.4295 4.28458 16.671 6.45797L16.6937 6.66286C16.7342 7.02684 16.7342 7.39418 16.6937 7.75815L16.3783 10.5971L17.0649 10.6519C18.1476 10.7384 19.0317 11.5523 19.2073 12.6242C19.5733 14.8598 19.5733 17.1401 19.2073 19.3758C19.0317 20.4477 18.1476 21.2616 17.0649 21.348L15.5688 21.4675C13.1934 21.6571 10.8067 21.6571 8.43128 21.4675L6.93515 21.348C5.85242 21.2616 4.96832 20.4477 4.7928 19.3758C4.42673 17.1401 4.42673 14.8598 4.7928 12.6242C4.96832 11.5523 5.85242 10.7384 6.93515 10.6519L7.62165 10.5971ZM11.6261 3.79914C11.8745 3.76992 12.1255 3.76992 12.3738 3.79914C13.8525 3.97309 15.0157 5.1439 15.1802 6.62361L15.2029 6.82851C15.2311 7.08239 15.2311 7.33862 15.2029 7.59251L14.8818 10.483C12.9626 10.3594 11.0374 10.3594 9.1182 10.483L8.79704 7.59251C8.76883 7.33862 8.76883 7.08239 8.79704 6.82851L8.8198 6.62361C8.98422 5.1439 10.1475 3.97309 11.6261 3.79914ZM15.4494 12.0277C13.1535 11.8445 10.8466 11.8445 8.55065 12.0277L7.05452 12.1472C6.65959 12.1787 6.33711 12.4756 6.27309 12.8666C5.9333 14.9417 5.9333 17.0583 6.27309 19.1334C6.33711 19.5244 6.65959 19.8213 7.05452 19.8528L8.55065 19.9722C10.8466 20.1555 13.1535 20.1555 15.4494 19.9722L16.9455 19.8528C17.3405 19.8213 17.6629 19.5244 17.727 19.1334C18.0668 17.0583 18.0668 14.9417 17.727 12.8666C17.6629 12.4756 17.3405 12.1787 16.9455 12.1472L15.4494 12.0277Z"
                                        />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    className="absolute right-0 -translate-x-4 fill-current hover:cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeCloseIcon />
                                    ) : (
                                        <EyeOpenIcon />
                                    )}
                                </button>
                            </div>
                            <Button>
                                Sign in
                            </Button>
                        </form>
                        <Link href="/login" className="text-center">
                            Already have an account?{" "}
                            <span className="underline font-bold text-blue-500">
                                Sign in
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
                        className="lg:w-3/5 min-h-52 bg-blue-100 text-center bg-cover"
                        style={{
                            backgroundImage: `url("https://www.anime-expo.org/wp-content/uploads/2017/04/anime-expo-los-angeles-convention-explore-exhibit-hall.jpg",)`,
                        }}
                    ></div>
                </main>
            </div>
        </>
    );
}
