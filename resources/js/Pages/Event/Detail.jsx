import { Link, Head, usePage } from '@inertiajs/react';
import Header from '../../Components/Header';

// --- Icons ---
const LinkIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);
const CalendarIcon = () => (
    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const ClockIcon = () => (
    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const MapPinIcon = () => (
    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const CatalogueIcon = () => (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
);
const MapIcon = () => (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
);

export default function EventDetail({ event }) {
    const { url, props: { auth } } = usePage();
    
    console.log(event);

    // "Event Not Found" Fallback State
    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col text-gray-800 font-sans">
                <Head title="Event Not Found - Tokoku" />
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center px-4 mt-16 text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                        <CalendarIcon />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Not Found</h1>
                    <p className="text-gray-500 mb-8 max-w-md">
                        We couldn't find the event you were looking for. It may have been removed, canceled, or the URL is incorrect.
                    </p>
                    <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                        Return to Homepage
                    </Link>
                </main>
            </div>
        );
    }

    // Normal Render State
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-16">
            <Head title={`${event.name} - Tokoku`} />

            {/* --- NAVBAR --- */}
            <Header/>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 mt-16">

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Event Details */}
                    <div className="lg:col-span-2">
                        {/* Detail Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-10">
                            
                            {/* 4:5 Poster Image */}
                            <div className="w-full max-w-100 mx-auto aspect-4/5 overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-100">
                                <img 
                                    src={event.image} 
                                    alt={event.name} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                                />
                            </div>

                            {/* Description Section */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                                    {event.description}
                                </p>
                            </section>

                            {/* Terms and Conditions Section */}
                            {event.terms && event.terms.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Terms and Conditions</h2>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                                        {event.terms.map((term, index) => (
                                            <li key={index} className="pl-1">
                                                <span className="ml-1">{term}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </section>
                            )}
                            
                        </div>
                    </div>

                    {/* Right Column: Sticky Ticket Card */}
                    <div className="lg:col-span-1 relative">
                        {/* Sticky container */}
                        <div className="sticky top-24 bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-6">
                            
                            <div className="flex items-center justify-between text-sm">
                                <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <button className="hover:text-gray-600 transition-colors hover:cursor-pointer"><LinkIcon /></button>
                                </div>
                            </div>
                            
                            {/* Key Details */}
                            <div className="flex flex-col gap-4 text-gray-600 text-sm">
                                <div className="flex items-start gap-3">
                                    <CalendarIcon />
                                    <span className="mt-0.5">{event.cardDate}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ClockIcon />
                                    <span className="mt-0.5">{event.cardTime}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPinIcon />
                                    <span className="mt-0.5 leading-snug">{event.venue}</span>
                                </div>

                                {event.coordinates && (
                                    <div className="w-full rounded-xl overflow-hidden border border-gray-200">
                                        <iframe
                                            title="Event Location"
                                            width="100%"
                                            height="200"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            src={`https://maps.google.com/maps?q=${event.coordinates}&z=15&output=embed`}
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                            </div>

                            <hr className="border-gray-100" />

                            {/* Organizer */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0 uppercase">
                                    {event.organizerName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">Organizer</p>
                                    <p className="font-semibold text-gray-900 text-sm">{event.organizerName}</p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Actions / Buttons */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Tenant Booths Start From</p>
                                    {event.price ? (
                                        <p className="font-bold text-2xl text-gray-900">{event.price}</p>
                                    ) : (
                                        <p className="font-bold text-xl text-gray-400">No Tickets Available</p>
                                    )}
                                </div>
                                {
                                    auth.user?.role !== 'event organizer' &&
                                    (
                                        <Link 
                                            href={event.price ? `/join/event/${event.id}` : undefined}
                                            className={`w-full flex items-center justify-center px-6 py-3.5 ${
                                                event.price && !event.hasEnded
                                                    ? "bg-blue-600 hover:bg-blue-700"
                                                    : "pointer-events-none cursor-not-allowed bg-gray-500"
                                            } text-white font-bold rounded-xl transition-colors shadow-sm`}
                                        >
                                            {event.price && !event.hasEnded ? "Book a Booth" : "Booth Booking Unavailable"}
                                        </Link>
                                    )
                                }
                                <div className="grid grid-cols-2 gap-3 mt-1">
                                    <Link 
                                        href={`/catalog/event/${event.id}`} 
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl text-sm transition-colors border border-blue-100"
                                    >
                                        <CatalogueIcon />
                                        Catalog
                                    </Link>
                                    <a 
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm transition-colors border border-gray-200"
                                    >
                                        <MapIcon />
                                        Maps
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}