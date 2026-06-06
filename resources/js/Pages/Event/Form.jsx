import React, { useState, useEffect } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Link, Head, useForm } from "@inertiajs/react";
import Button from "../../Components/Buttons";
import {
    CancelIcon,
    ChevronRightIcon,
    HomeIcon,
    SaveIcon,
} from "../../Components/Icons";

const Dialog = ({ isOpen, onClose, title, message, confirmLabel, confirmClassName, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose} />
            <div className="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="mt-2 text-sm text-gray-400">{message}</p>
                </div>
                <div className="flex flex-row-reverse gap-2 px-6 py-4 bg-white">
                    <Button onClick={onConfirm} size={'sm'} className={confirmClassName}>
                        {confirmLabel}
                    </Button>
                    <Button onClick={onClose} size={'sm'} variant={'outline'}>
                        {title === "Save Event?" ? "Cancel" : "No"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

let nextTicketId = 1;
function newTicket() {
    return { id: `new-${nextTicketId++}`, name: "", description: "", price: 0, location: "", coordinates: "", map: null };
}

export default function Form({ event }) {
    const isEdit = !!event;
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [createdDate, setCreatedDate] = useState("");

    const { data, setData, post, processing, errors, transform } = useForm({
        name: event?.name || "",
        description: event?.description || "",
        terms: event?.terms ? event.terms.join('\n') : "",
        date_start: event?.date_start_formatted || "",
        date_end: event?.date_end_formatted || "",
        poster: null, 
        location: event?.location || "",
        coordinates: event?.coordinates || "",
        map: null,
        contact: event?.contact || "",
        max_participants: event?.max_participants || "",
        visibility: event?.visibility || "unlisted",
        tickets: event?.tickets?.length 
            ? event.tickets.map(t => ({ ...t, map: null })) // Strip existing map so input type="file" stays empty
            : [newTicket()],
    });

    useEffect(() => {
        const dateObj = event ? new Date(event.created_at) : new Date();
        setCreatedDate(dateObj.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
    }, [event]);

    const handleChange = (e) => {
        const { id, value, files, type } = e.target;
        setData(id, type === "file" ? files[0] : value);
    };

    const handleTicketChange = (id, field, value) => {
        setData("tickets", data.tickets.map((ticket) => 
            ticket.id === id ? { ...ticket, [field]: value } : ticket
        ));
    };

    const addTicket = () => setData("tickets", [...data.tickets, newTicket()]);
    
    const removeTicket = (id) => setData("tickets", data.tickets.filter(t => t.id !== id));

    const handleSave = () => {
        setSaveDialogOpen(false);
        
        transform((data) => ({
            ...data,
            terms: data.terms ? data.terms.split('\n').map(t => t.trim()).filter(t => t !== "") : null,
            // Inertia requires POST for multipart/form-data, so we spoof PUT for updates
            ...(isEdit && { _method: 'put' }),
        }));

        const submitRoute = isEdit ? route("events.update", event.id) : route("events.store");

        post(submitRoute, {
            forceFormData: true,
        });
    };

    const handleCancel = () => {
        setCancelDialogOpen(false);
        window.location.href = route("events.index");
    };

    const inputClass = "w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorClass = "mt-1 text-xs text-red-500";

    return (
        <DashboardLayout user={{role: "event organizer"}}>
            <Head title={isEdit ? "Edit Event" : "Create Event"} />
            <div className="w-full p-4 lg:p-6">
                <nav className="flex items-center space-x-2 text-sm mb-6">
                    <Link href={"/dashboard"} className="flex items-center text-gray-700 hover:text-blue-500 fill-current">
                        <HomeIcon />
                    </Link>
                    <ChevronRightIcon />
                    <Link href={"/events"} className="flex items-center text-gray-700 hover:text-blue-500">
                        Events
                    </Link>
                    <ChevronRightIcon />
                    <span className="text-gray-700">{isEdit ? "Edit Event" : "Create Event"}</span>
                </nav>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-700 mb-2">{isEdit ? "Edit Event" : "Create New Event"}</h1>
                    <p className="text-gray-600">Setup event details, locations, and ticketing options.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Event Information</h2>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Event Name *</label>
                                <input id="name" type="text" placeholder="e.g., Summer Festival 2026" className={inputClass} value={data.name} onChange={handleChange} />
                                {errors.name && <p className={errorClass}>{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea id="description" rows="3" placeholder="Describe the event..." className={inputClass} value={data.description} onChange={handleChange} />
                                {errors.description && <p className={errorClass}>{errors.description}</p>}
                            </div>
                            <div>
                                <label htmlFor="terms" className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions <span className="text-gray-400 font-normal">(Separate each rule with an Enter)</span></label>
                                <textarea id="terms" rows="4" placeholder="Rule 1&#10;Rule 2&#10;Rule 3" className={inputClass} value={data.terms} onChange={handleChange} />
                                {errors.terms && <p className={errorClass}>{errors.terms}</p>}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Event Location</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                                    <input id="location" type="text" placeholder="e.g., Main Stadium" className={inputClass} value={data.location} onChange={handleChange} />
                                    {errors.location && <p className={errorClass}>{errors.location}</p>}
                                </div>
                                <div>
                                    <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700 mb-2">Coordinates</label>
                                    <input id="coordinates" type="text" placeholder="-6.2088, 106.8456" className={inputClass} value={data.coordinates} onChange={handleChange} />
                                    {errors.coordinates && <p className={errorClass}>{errors.coordinates}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="map" className="block text-sm font-medium text-gray-700 mb-2">Location Map (Image)</label>
                                <input id="map" type="file" accept="image/*" className={inputClass} onChange={handleChange} />
                                {isEdit && event?.map_url && (
                                    <a href={event.map_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm text-blue-500 hover:text-blue-700">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        View Current Map Image
                                    </a>
                                )}
                                {errors.map && <p className={errorClass}>{errors.map}</p>}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-700">Tickets & Booths</h2>
                                <button type="button" onClick={addTicket} className="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                                    + Add Ticket Type
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {data.tickets.map((ticket, index) => (
                                    <div key={ticket.id} className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded-r-lg relative group">
                                        <button type="button" onClick={() => removeTicket(ticket.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <path d="M18 6L6 18M6 6l12 12"/>
                                            </svg>
                                        </button>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-8">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Ticket Name *</label>
                                                <input type="text" value={ticket.name} onChange={(e) => handleTicketChange(ticket.id, 'name', e.target.value)} placeholder="e.g., VIP, Regular" className={inputClass} />
                                                {errors[`tickets.${index}.name`] && <p className={errorClass}>{errors[`tickets.${index}.name`]}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Price (Rp) *</label>
                                                <input type="number" value={ticket.price} onChange={(e) => handleTicketChange(ticket.id, 'price', e.target.value)} placeholder="0" min="0" className={inputClass} />
                                                {errors[`tickets.${index}.price`] && <p className={errorClass}>{errors[`tickets.${index}.price`]}</p>}
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                                <input type="text" value={ticket.description} onChange={(e) => handleTicketChange(ticket.id, 'description', e.target.value)} placeholder="Ticket perks or details..." className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Specific Location (Optional)</label>
                                                <input type="text" value={ticket.location} onChange={(e) => handleTicketChange(ticket.id, 'location', e.target.value)} placeholder="e.g., Gate A, VIP Lounge" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Coordinates</label>
                                                <input type="text" value={ticket.coordinates} onChange={(e) => handleTicketChange(ticket.id, 'coordinates', e.target.value)} className={inputClass} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Specific Map Image (Optional)</label>
                                                <input type="file" accept="image/*" onChange={(e) => handleTicketChange(ticket.id, 'map', e.target.files[0])} className={inputClass} />
                                                
                                                {isEdit && ticket.map_url && (
                                                    <a href={ticket.map_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm text-blue-500 hover:text-blue-700">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                        View Current Ticket Map
                                                    </a>
                                                )}
                                                {errors[`tickets.${index}.map`] && <p className={errorClass}>{errors[`tickets.${index}.map`]}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Publish Settings</h2>
                            <div>
                                <label htmlFor="visibility" className="block text-sm font-medium text-gray-600 mb-1">Visibility</label>
                                <select id="visibility" className={inputClass} value={data.visibility} onChange={handleChange}>
                                    <option value="public">Public</option>
                                    <option value="unlisted">Unlisted</option>
                                    <option value="private">Private</option>
                                </select>
                                {errors.visibility && <p className={errorClass}>{errors.visibility}</p>}
                            </div>
                            <div className="flex items-center justify-between text-sm pt-1">
                                <span className="text-gray-600">{isEdit ? "Last Updated:" : "Created:"}</span>
                                <span className="text-gray-700 font-medium">{createdDate}</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Schedule</h2>
                            <div>
                                <label htmlFor="date_start" className="block text-sm font-medium text-gray-600 mb-1">Start Date & Time *</label>
                                <input id="date_start" type="datetime-local" className={inputClass} value={data.date_start} onChange={handleChange} />
                                {errors.date_start && <p className={errorClass}>{errors.date_start}</p>}
                            </div>
                            <div>
                                <label htmlFor="date_end" className="block text-sm font-medium text-gray-600 mb-1">End Date & Time *</label>
                                <input id="date_end" type="datetime-local" className={inputClass} value={data.date_end} onChange={handleChange} />
                                {errors.date_end && <p className={errorClass}>{errors.date_end}</p>}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Capacity & Contact</h2>
                            <div>
                                <label htmlFor="max_participants" className="block text-sm font-medium text-gray-600 mb-1">Max Participants</label>
                                <input id="max_participants" type="number" placeholder="Leave empty for unlimited" className={inputClass} value={data.max_participants} onChange={handleChange} />
                                {errors.max_participants && <p className={errorClass}>{errors.max_participants}</p>}
                            </div>
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-600 mb-1">Contact Info</label>
                                <input id="contact" type="text" placeholder="Email or Phone Number" className={inputClass} value={data.contact} onChange={handleChange} />
                                {errors.contact && <p className={errorClass}>{errors.contact}</p>}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700">Event Poster</h2>
                            <div>
                                <input id="poster" type="file" accept="image/*" className={inputClass} onChange={handleChange} />
                                {isEdit && event?.poster_url && (
                                    <a href={event.poster_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm text-blue-500 hover:text-blue-700">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        View Current Poster
                                    </a>
                                )}
                                {errors.poster && <p className={errorClass}>{errors.poster}</p>}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <Button onClick={() => setSaveDialogOpen(true)} disabled={processing} size={'sm'} className="w-full justify-center">
                                <SaveIcon />
                                <span>{processing ? "Saving..." : "Save Event"}</span>
                            </Button>
                            <Button onClick={() => setCancelDialogOpen(true)} disabled={processing} size={'sm'} variant={'outline'} className="w-full justify-center">
                                <CancelIcon />
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <Dialog
                    isOpen={saveDialogOpen}
                    onClose={() => setSaveDialogOpen(false)}
                    title="Save Event?"
                    message="Ensure all event details and ticket types are correct. You can edit this later."
                    confirmLabel="Save"
                    confirmClassName="bg-blue-500 hover:bg-blue-400"
                    onConfirm={handleSave}
                />

                <Dialog
                    isOpen={cancelDialogOpen}
                    onClose={() => setCancelDialogOpen(false)}
                    title="Discard Changes?"
                    message="All unsaved changes, including configured tickets, will be lost."
                    confirmLabel="Yes, discard"
                    confirmClassName="bg-red-500 hover:bg-red-400"
                    onConfirm={handleCancel}
                />
            </div>
        </DashboardLayout>
    );
}