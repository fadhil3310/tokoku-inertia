import React from "react";
import { HomeIcon, TokokuIcon } from "../../Components/Icons";

export default function DatabaseError({ error, status }) {
    return (
        <div className="w-full h-screen flex justify-center items-center p-10">
            <div className="flex flex-col text-center">
                <TokokuIcon size={80} className="mx-auto"/>
                <h1 className="font-bold text-[20px] md:text-[28px] mt-5">{status}</h1>
                <h1 className="font-bold text-[18px] md:text-[20px] mb-5">{status === 503 ? 'SERVICE UNAVAILABLE' : 'INTERNAL SERVER ERROR'}</h1>
                <p className="font-normal text-[15px]">{error}</p>
                {/* <p className="font-normal text-[15px] mt-5"></p> */}
            </div>
        </div>
    );
}
