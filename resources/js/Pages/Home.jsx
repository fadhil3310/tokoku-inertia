import { Link, Head } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import Button from '../Components/Buttons'
import Footer from '../Components/Footer'
import LandingPageLayout from '../Layouts/LandingPageLayout'

const faqs = [
    {
        question: 'Will I get technical support for my events?',
        answer: 'Yes, we provide dedicated technical support via WhatsApp and email for all event organizers to ensure your event runs smoothly.',
    },
    {
        question: 'Can my tenants customize their own catalogs?',
        answer: "Yes, once you invite tenants to your event, they can manage and customize their own catalogs under your event's umbrella.",
    },
    {
        question: 'How do I manage multiple events?',
        answer: "Simply sign in to your EO dashboard. From there, you can create new events, set up booth categories, and invite unlimited tenants.",
    },
    {
        question: 'Is my data and my tenants\' data secure?',
        answer: 'Absolutely. All transaction data, tenant information, and event details are encrypted and stored on secure servers with daily backups.',
    },
]

const features = [
    {
        title: 'Centralized Event Management',
        description: 'Easily create multiple events, assign various booth categories, and manage unlimited tenants from one powerful dashboard.',
        icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
    },
    {
        title: 'Comprehensive Analytics',
        description: "Track total event revenue in real-time, monitor individual tenant sales, and identify your top-performing booths.",
        icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        title: 'Boosted Visibility',
        description: 'Get your events featured directly on the Tokoku landing page to attract more visitors and potential tenants.',
        icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        ),
    },
]

function FaqItem({ question, answer, onToggle, isOpen }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <button
                onClick={onToggle}
                className="w-full font-medium text-sm flex px-6 py-4 justify-between items-center text-left hover:cursor-pointer"
            >
                <span className="text-gray-800 text-base">{question}</span>
                <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <p className="mt-2 text-sm text-gray-500 px-6 pb-5 leading-relaxed">{answer}</p>
            )}
        </div>
    )
}

function EventCard({ id, title, date, city, image }) {
    return (
        <Link href={`/detail/event/${id}`} className="group w-64 md:w-72 shrink-0 bg-white hover:bg-gray-200 rounded-2xl overflow-hidden shadow-sm border border-gray-100 snap-start hover:shadow-md transition-shadow duration-300 flex flex-col">
            <div className="aspect-4/5 w-full overflow-hidden relative bg-gray-100">
                <img src={image} alt={title} className="group-hover:brightness-90 w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col gap-2">
                <h4 className="font-bold text-lg text-gray-900 truncate">{title}</h4>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                    <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span className="truncate">{date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                    <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="truncate">{city}</span>
                </div>
            </div>
        </Link>
    )
}

export default function Home({ upcomingEvents, pastEvents }) {
    const featuredEvent = upcomingEvents?.[0] || pastEvents?.[0];
    
    const [activeIndex, setActiveIndex] = useState(null);
    const [heroSlide, setHeroSlide] = useState(featuredEvent ? 0 : 1);

    // Auto-rotate hero slider only if a featured event exists
    useEffect(() => {
        if (!featuredEvent) return;

        const timer = setInterval(() => {
            setHeroSlide((prev) => (prev === 0 ? 1 : 0));
        }, 8000); 

        return () => clearInterval(timer);
    }, [featuredEvent]);

    return (
        <LandingPageLayout title={"Tokoku"}>
            {/* HERO SECTION */}
            <section className="pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden relative text-white min-h-150 flex items-center">
                
                {/* Background layers cross-fade based on active slide */}
                {featuredEvent && (
                    <div
                        className={`absolute inset-0 z-1 bg-cover bg-center mix-blend-overlay transition-opacity duration-1000 ${heroSlide === 0 ? 'opacity-50' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${featuredEvent.image}')` }}
                    />
                )}
                <div
                    className={`absolute inset-0 z-1 bg-cover bg-center mix-blend-overlay transition-opacity duration-1000 ${(!featuredEvent || heroSlide === 1) ? 'opacity-50' : 'opacity-0'}`}
                    style={{ backgroundImage: "url('https://www.anime-expo.org/wp-content/uploads/2017/04/anime-expo-los-angeles-convention-explore-exhibit-hall.jpg')" }}
                />
                <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-900" />

                {/* Content Container */}
                <div className="max-w-7xl mx-auto w-full grid relative z-10">
                    
                    {/* SLIDE 0: Featured Event (Only render if it exists) */}
                    {featuredEvent && (
                        <div className={`col-start-1 row-start-1 w-full flex flex-col-reverse lg:flex-row items-center gap-16 transition-all duration-700 ${heroSlide === 0 ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' : 'opacity-0 translate-y-8 -z-10 pointer-events-none'}`}>
                            <div className="lg:w-1/2 text-center lg:text-left flex flex-col h-full sm:justify-center">
                                <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4 block">
                                    Featured Event
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
                                    {featuredEvent.title}
                                </h2>
                                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0 mb-8 line-clamp-3">
                                    {featuredEvent.description}
                                </p>
                                
                                <div className="flex flex-col justify-start gap-6 mb-8 text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <span className="font-medium">{featuredEvent.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        <span className="font-medium">{featuredEvent.city} {featuredEvent.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
                                <div className="w-80 aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img src={featuredEvent.image} alt={featuredEvent.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SLIDE 1: Subscription / Platform Info */}
                    <div className={`col-start-1 row-start-1 w-full flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${(!featuredEvent || heroSlide === 1) ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' : 'opacity-0 translate-y-8 -z-10 pointer-events-none'}`}>
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                                Empowering <br className="hidden lg:block"/> Event <br className="hidden lg:block"/> Organizers.
                            </h2>
                            <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                                The ultimate platform to manage multiple events, organize booth categories, and track tenant sales all in one place.
                            </p>
                        </div>
                        <Button
                            href="/login"
                            className="flex sm:hidden px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Get Started
                        </Button>
                        <div className="lg:w-1/2 w-full text-slate-900">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
                                {/* STARTER PLAN */}
                                <div className="bg-white rounded-2xl flex flex-col px-8 py-8 shadow-xl relative">
                                    <h3 className="font-bold text-xl text-gray-800 mb-2">Starter</h3>
                                    <div className="mb-6">
                                        <span className="font-black text-3xl text-blue-600">Free</span>
                                    </div>
                                    <ul className="text-slate-600 mb-8 space-y-1">
                                        {[
                                            { text: '1 Event', included: true },
                                            { text: '1 Booth Category', included: true },
                                            { text: 'Up to 10 Tenants', included: true },
                                            { text: 'Landing Page Feature', included: false },
                                            { text: 'Advanced Analytics', included: false },
                                        ].map((item) => (
                                            <li key={item.text} className="py-2 text-sm border-b border-slate-100 flex items-center">
                                                <span className={`font-bold mr-3 ${item.included ? 'text-blue-500' : 'text-gray-300'}`}>
                                                    {item.included ? '✓' : '✗'}
                                                </span>
                                                <span className={item.included ? 'text-gray-700' : 'text-gray-400'}>{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={'mt-auto w-full py-3 justify-center'} href={'/signup'} variant={'outline'}>
                                        Start Free
                                    </Button>
                                </div>

                                {/* PRO PLAN */}
                                <div className="bg-white rounded-2xl flex flex-col px-8 py-8 shadow-2xl relative border-2 border-blue-500 sm:scale-105 z-10">
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-1.5 rounded-full text-white font-bold text-xs uppercase tracking-wide shadow-sm">
                                        Best Deal
                                    </span>
                                    <h3 className="font-bold text-xl text-gray-800 mb-2">Pro</h3>
                                    <div className="mb-6 flex items-end gap-1">
                                        <span className="font-black text-3xl text-blue-600">Rp 199k</span>
                                        <span className="text-slate-500 text-sm font-medium mb-1">/month</span>
                                    </div>
                                    <ul className="text-slate-600 mb-8 space-y-1">
                                        {[
                                            'Unlimited Events',
                                            'Unlimited Booth Categories',
                                            'Unlimited Tenants',
                                            'Featured on Tokoku Landing Page',
                                            'Comprehensive Sales Analytics',
                                        ].map((item) => (
                                            <li key={item} className="py-2 text-sm border-b border-slate-100 flex items-start">
                                                <span className="font-bold text-blue-500 mr-3 mt-0.5">✓</span>
                                                <span className="text-gray-800 font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="mt-auto w-full py-3 justify-center bg-blue-600 hover:bg-blue-700 text-white" href={'/signup'}>
                                        Try 14 Days Free
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Navigation Dots (Only display if featured event exists) */}
                {featuredEvent && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        <button onClick={() => setHeroSlide(0)} className={`w-3 h-3 rounded-full transition-all duration-300 ${heroSlide === 0 ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/80'}`} aria-label="Show Featured Event" />
                        <button onClick={() => setHeroSlide(1)} className={`w-3 h-3 rounded-full transition-all duration-300 ${heroSlide === 1 ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/80'}`} aria-label="Show Pricing" />
                    </div>
                )}
            </section>

            {/* UPCOMING EVENTS SECTION */}
            <section className="pt-10 px-6 max-w-7xl mx-auto w-full mt-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                        <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                        </span>
                        Events
                    </h2>
                </div>
                
                {!upcomingEvents || upcomingEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">No ongoing events</h3>
                        <p className="text-gray-500 text-center">There are currently no events happening right now. Check back later!</p>
                    </div>
                ) : (
                    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                )}
            </section>

            {/* PAST EVENTS SECTION */}
            <section className="pt-4 pb-14 px-6 max-w-7xl mx-auto w-full">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                        Past Events
                    </h2>
                    <p className="text-gray-500 mt-2">Discover and secure your tenant spot before they sell out.</p>
                </div>
                
                {!pastEvents || pastEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">No past events</h3>
                        <p className="text-gray-500 text-center">Stay tuned! Past events will be listed here.</p>
                    </div>
                ) : (
                    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                        {pastEvents.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                )}
            </section>

            {/* FEATURES SECTION */}
            <section className="px-6 py-24 bg-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Built for Event Organizers</h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to orchestrate seamless events and empower your tenants.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-blue-100/50">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-3">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* FAQ SECTION */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FaqItem 
                                key={faq.question} 
                                {...faq} 
                                isOpen={activeIndex === index} 
                                onToggle={() => setActiveIndex(activeIndex === index ? null : index)} 
                            />
                        ))}
                    </div>
                </div>
            </section>
        </LandingPageLayout>
    )
}