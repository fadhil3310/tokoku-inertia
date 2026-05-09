import React from "react";
import { HomeIcon, TokokuIcon } from "../../Components/Icons";

export default function DatabaseError() {
    return (
        <div className="w-full h-screen flex justify-center items-center p-10">
            <div className="flex flex-col text-center">
                <TokokuIcon size={80} className="mx-auto"/>
                <h1 className="font-bold text-[20px] md:text-[28px] my-5">SERVICE UNAVAILABLE</h1>
                <p className="font-normal text-[15px]">We're experiencing technical difficulties.<br/>Please try again later.</p>
                <p className="font-normal text-[15px] mt-5">(503)</p>
            </div>
        </div>
    );
}
