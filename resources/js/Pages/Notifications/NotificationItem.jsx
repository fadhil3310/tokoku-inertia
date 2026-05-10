import React from "react";
import { CatalogueIcon, SettingsIcon } from "../../Components/Icons";

export default function NotificationItem({ notification }) {

    const isSale = notification.type === "sale";

    return (
        <div
            className={`p-6 hover:bg-gray-50 transition-all flex items-start gap-4 ${!notification.unread ? "bg-gray-50/30" : ""}`}
        >
            <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-0.5 ${isSale ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
            >
                {isSale ? <CatalogueIcon /> : <SettingsIcon />}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3
                        className={`truncate pr-4 ${notification.unread ? "font-bold text-gray-800" : "font-semibold text-gray-500"}`}
                    >
                        {notification.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-400">
                            {notification.time}
                        </span>
                        <div
                            className={`w-2 h-2 rounded-full ${notification.unread ? "bg-red-500" : "bg-transparent"}`}
                        />
                    </div>
                </div>
                <p
                    className={`text-sm line-clamp-2 ${notification.unread ? "text-gray-600" : "text-gray-400"}`}
                >
                    {notification.description}
                </p>
                <p className="text-[11px] font-medium text-gray-400 mt-2 uppercase tracking-wider">
                    {notification.date}
                </p>
            </div>
        </div>
    );
}
