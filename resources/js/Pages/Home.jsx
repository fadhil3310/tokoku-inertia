import { Link, Head } from '@inertiajs/react'
import { useState } from 'react'
import Button from '../Components/Buttons'

const faqs = [
    {
        question: 'Will I get technical support?',
        answer: 'Yes, we provide technical support via WhatsApp and email for all packages.',
    },
    {
        question: 'Can I have custom catalog?',
        answer: "Yes, your catalog can be customized to your company's branding.",
    },
    {
        question: 'How do I manage a booth?',
        answer: "Simply sign in to the dashboard, and then manage your booth — it's that easy!",
    },
    {
        question: 'Is my data secure?',
        answer: 'Your data is encrypted and stored on secure servers with daily backups.',
    },
]

const features = [
    {
        title: 'Real-time Sales Tracking',
        description: 'See every transaction and KPI, just like in the dashboard reference.',
        icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: 'Effortless Order Management',
        description: "Simplify order workflow from start to finish. F&B or merch, we've got you.",
        icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 11m8 4v10M4 11v10" />
            </svg>
        ),
    },
    {
        title: 'Performance Insights',
        description: 'Gain clarity on revenue and top products to grow your business.',
        icon: (
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
]

function FaqItem({ question, answer, onToggle, isOpen }) {
    return (
        <div className="bg-white rounded-xl shadow-sm">
            <button
                onClick={onToggle}
                className="w-full font-medium text-sm flex px-6 py-4 justify-between items-center text-left hover:cursor-pointer"
            >
                <span>{question}</span>
                <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <p className="mt-3 text-sm text-gray-500 px-6 pb-4">{answer}</p>
            )}
        </div>
    )
}

export default function Home() {
    const [activeIndex, setActiveIndex] = useState(null)
    return (
        <>
            <Head title="Tokoku" />
            <div className="flex flex-col min-h-screen bg-gray-100">

                <header className="fixed top-0 right-0 z-20 h-16 bg-white border-b border-gray-400 transition-all duration-300 left-0">
                    <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                T
                            </div>
                            <span className="text-xl font-bold text-gray-700">Tokoku</span>
                        </Link>
                        <div className="flex items-center gap-2 ml-auto">
                            <Link href="/login" className="font-medium text-blue-500">Sign in</Link>
                        </div>
                    </div>
                </header>

                <section className="py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative text-white">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('https://www.anime-expo.org/wp-content/uploads/2017/04/anime-expo-los-angeles-convention-explore-exhibit-hall.jpg')" }}
                    />
                    <div className="absolute inset-0 z-0 bg-slate-900/60" />

                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 mt-12 relative z-10">

                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                                Empowering <br /> Artists & Local <br /> Businesses.
                            </h2>
                            <p className="mt-8 text-lg md:text-xl text-slate-200 leading-relaxed font-medium max-w-xl">
                                The easiest way to track sales, orders, and items <br className="hidden lg:flex" /> for F&B or event merch booths.
                            </p>
                        </div>

                        <div className="lg:w-1/2 w-full text-slate-900">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">

                                <div className="bg-white rounded-xl flex flex-col px-8 py-8 shadow relative">
                                    <h3 className="font-bold text-xl mb-4">Starter</h3>
                                    <div className="mb-5">
                                        <span className="font-bold text-2xl text-blue-500">Free</span>
                                    </div>
                                    <ul className="text-slate-600 mb-5">
                                        {[
                                            { text: '10 Products', included: true },
                                            { text: 'No Analytics', included: false },
                                            { text: 'No Custom Catalog', included: false },
                                        ].map((item) => (
                                            <li key={item.text} className="py-2 text-sm border-b border-slate-200">
                                                <span className={`font-bold mr-1 ${item.included ? 'text-blue-500' : 'text-gray-400'}`}>
                                                    {item.included ? '✓' : '✗'}
                                                </span>
                                                {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={'mt-auto'} href={'/register'} variant={'outline'}>
                                        Start Free
                                    </Button>
                                </div>

                                <div className="bg-white rounded-xl flex flex-col px-8 py-8 shadow relative border-2 border-blue-500 sm:scale-105">
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 px-4 py-1 rounded-full text-white font-medium text-sm">
                                        Popular
                                    </span>
                                    <h3 className="font-bold text-xl mb-4">Pro</h3>
                                    <div className="mb-5">
                                        <span className="font-bold text-2xl text-blue-500">Rp 199.000</span>
                                        <span className="text-slate-600">/month</span>
                                    </div>
                                    <ul className="text-slate-600 mb-5">
                                        {[
                                            '100 Products',
                                            'Sale Analytics',
                                            'Custom Catalog',
                                            'Custom Domain',
                                        ].map((item) => (
                                            <li key={item} className="py-2 text-sm border-b border-slate-200">
                                                <span className="font-bold text-blue-500 mr-1">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button href={'/register'}>
                                        Try 14 Days Trial
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 w-full md:w-[400px]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-100">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <FaqItem key={faq.question} {...faq} isOpen={activeIndex === index} onToggle={() => setActiveIndex(activeIndex === index ? null : index)} />
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="px-6 py-16 bg-white">
                    <div className="max-w-7xl mx-auto flex gap-16 justify-center text-sm">
                        <div className="flex flex-col gap-3">
                            <span className="font-bold text-gray-900 mb-1">Product</span>
                            <Link href="#" className="hover:text-blue-500">Features</Link>
                            <Link href="#" className="hover:text-blue-500">Pricing</Link>
                            <Link href="#" className="hover:text-blue-500">Integrations</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-bold text-gray-900 mb-1">Company</span>
                            <Link href="#" className="hover:text-blue-500">About Us</Link>
                            <Link href="#" className="hover:text-blue-500">Contact</Link>
                            <Link href="#" className="hover:text-blue-500">Support</Link>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
                        © 2026 Tokoku. All rights reserved.
                    </div>
                </footer>

            </div>
        </>
    )
}