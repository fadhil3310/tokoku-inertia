import { Link, Head } from '@inertiajs/react'
import Button from './Buttons'

export default function Header () {
    return (
        <header className="fixed top-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 transition-all duration-300 left-0">
            <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
                        T
                    </div>
                    <span className="text-xl font-bold text-gray-800 tracking-tight">Tokoku</span>
                </Link>
                <div className="flex items-center gap-4 ml-auto">
                    <Button href="/login" className="hidden sm:flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    )
}