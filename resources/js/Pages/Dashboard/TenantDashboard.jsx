import React from "react";
import { Link } from "@inertiajs/react";
import Button from "../../Components/Buttons";
import { CatalogueIcon, InvoicePaperIcon } from "../../Components/Icons";

export default function TenantDashboard({ booth, totalProducts, recentTransactions }) {
    return (
        <div className="p-4 lg:p-6 w-full">
            <nav className="flex items-center space-x-2 text-sm mb-6">
                <Link href="/" className="flex items-center text-gray-700 hover:text-blue-500 fill-current">
                    <svg width="24" height="24" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.5578 5.53423C12.6873 4.69887 11.3127 4.69887 10.4422 5.53423L5.81574 9.97357C5.70239 10.0823 5.62614 10.224 5.5978 10.3785C5.04367 13.4004 5.00277 16.494 5.47681 19.5295L5.58933 20.25H8.56579V14.0387C8.56579 13.6244 8.90158 13.2887 9.31579 13.2887H14.6842C15.0984 13.2887 15.4342 13.6244 15.4342 14.0387V20.25H18.4107L18.5232 19.5295C18.9972 16.494 18.9563 13.4004 18.4022 10.3785C18.3739 10.224 18.2976 10.0823 18.1843 9.97357L13.5578 5.53423ZM9.40363 4.45191C10.8546 3.05965 13.1454 3.05965 14.5964 4.45191L19.2228 8.89125C19.5634 9.21804 19.7925 9.64373 19.8776 10.108C20.4621 13.2956 20.5053 16.559 20.0052 19.7609L19.8245 20.9184C19.7497 21.3971 19.3374 21.75 18.8529 21.75H14.6842C14.27 21.75 13.9342 21.4142 13.9342 21V14.7887H10.0658V21C10.0658 21.4142 9.73 21.75 9.31579 21.75H5.14706C4.66258 21.75 4.25029 21.3971 4.17554 20.9184L3.99478 19.7609C3.49473 16.559 3.53788 13.2956 4.12241 10.108C4.20754 9.64373 4.43662 9.21804 4.77719 8.89125L9.40363 4.45191Z" />
                    </svg>
                </Link>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.96967 7.46967C10.2626 7.17678 10.7374 7.17678 11.0303 7.46967L15.0303 11.4697C15.3232 11.7626 15.3232 12.2374 15.0303 12.5303L11.0303 16.5303C10.7374 16.8232 10.2626 16.8232 9.96967 16.5303C9.67678 16.2374 9.67678 15.7626 9.96967 15.4697L13.4393 12L9.96967 8.53033C9.67678 8.23744 9.67678 7.76256 9.96967 7.46967Z" />
                </svg>
                <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-blue-500">
                    Dashboard
                </Link>
            </nav>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">Total Revenue</p>
                        <p className="text-3xl font-bold text-gray-800 mb-2">Rp120.000</p>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 border border-green-400 rounded-lg px-2 py-0.5 text-xs flex items-center gap-1">
                                20%
                            </span>
                            <span>from yesterday</span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100 text-green-400 fill-current">
                        <span className="font-bold">Rp</span>
                    </div>
                </div>
                
                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">Total Orders</p>
                        <p className="text-3xl font-bold text-gray-800 mb-2">100</p>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 border border-green-400 rounded-lg px-2 py-0.5 text-xs flex items-center gap-1">
                                10%
                            </span>
                            <span>from yesterday</span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100 text-green-400 fill-current">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.53033 6.53033C7.82322 6.23744 7.82322 5.76256 7.53033 5.46967C7.23744 5.17678 6.76256 5.17678 6.46967 5.46967L4.46967 7.46967C4.17678 7.76256 4.17678 8.23744 4.46967 8.53033L6.46967 10.5303C6.76256 10.8232 7.23744 10.8232 7.53033 10.5303C7.82322 10.2374 7.82322 9.76256 7.53033 9.46967L6.81066 8.75H17C17.4142 8.75 17.75 8.41421 17.75 8C17.75 7.58579 17.4142 7.25 17 7.25H6.81066L7.53033 6.53033Z" />
                            <path d="M16.4697 13.4697C16.1768 13.7626 16.1768 14.2374 16.4697 14.5303L17.1893 15.25H7C6.58579 15.25 6.25 15.5858 6.25 16C6.25 16.4142 6.58579 16.75 7 16.75H17.1893L16.4697 17.4697C16.1768 17.7626 16.1768 18.2374 16.4697 18.5303C16.7626 18.8232 17.2374 18.8232 17.5303 18.5303L19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697L17.5303 13.4697C17.2374 13.1768 16.7626 13.1768 16.4697 13.4697Z" />
                        </svg>
                    </div>
                </div>

                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">Total Products</p>
                        <p className="text-3xl font-bold text-gray-800 mb-2">{totalProducts || 25}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100 text-green-400 fill-current">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.53518 3.25C5.95006 3.25 5.40366 3.54243 5.07909 4.02927L1.48987 9.41311C1.27014 9.74271 1.24386 10.1648 1.42101 10.5191C3.38512 14.4473 6.11467 17.9432 9.44923 20.8014L11.2 22.3021C11.6603 22.6967 12.3397 22.6967 12.8 22.3021L14.5508 20.8014C17.8853 17.9432 20.6149 14.4473 22.579 10.5191C22.7561 10.1648 22.7299 9.74271 22.5101 9.41311L18.9209 4.02927C18.5963 3.54243 18.0499 3.25 17.4648 3.25H6.53518ZM6.32717 4.86132C6.37353 4.79178 6.45159 4.75 6.53518 4.75H8.87499L6.95987 9.34629C6.91576 9.45216 6.88246 9.56135 6.86002 9.67224C6.15619 9.61985 5.45296 9.55669 4.75057 9.48276L3.34486 9.33479L6.32717 4.86132ZM3.27865 10.8361C5.07205 14.1261 7.44021 17.0714 10.2732 19.5312L7.14775 11.1967C6.29541 11.1381 5.44387 11.064 4.59355 10.9745L3.27865 10.8361ZM8.78481 11.2902L12 19.864L15.2152 11.2902C13.0728 11.3876 10.9272 11.3876 8.78481 11.2902ZM16.8523 11.1967L13.7268 19.5312C16.5598 17.0714 18.9279 14.1261 20.7213 10.8361L19.4064 10.9745C18.5561 11.064 17.7046 11.1381 16.8523 11.1967ZM20.6551 9.33479L19.2494 9.48276C18.547 9.55669 17.8438 9.61985 17.14 9.67224C17.1175 9.56135 17.0842 9.45216 17.0401 9.34629L15.125 4.75H17.4648C17.5484 4.75 17.6265 4.79178 17.6728 4.86133L20.6551 9.33479ZM15.5917 9.77005C13.1988 9.89432 10.8012 9.89432 8.4083 9.77005L10.5 4.75H13.5L15.5917 9.77005Z" />
                        </svg>
                    </div>
                </div>

                <div className="rounded-lg transition-all duration-200 relative overflow-hidden flex items-start justify-between flex-1 gap-2">
                    <Button
                        href="/catalog"
                        target="_blank"
                        className={'flex items-center w-full h-full cursor-pointer'}
                        variant={'outline'}
                    >
                        <CatalogueIcon/>
                        <span>Open Catalog</span>
                    </Button>
                    <Button 
                        href={"/transactions/form"}
                        className={"flex items-center w-full h-full cursor-pointer"}
                    >
                        <InvoicePaperIcon />
                        <span>Create Invoice</span>
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1 flex flex-col">
                        <div className="mb-6">
                            <h2 className="font-bold text-gray-700 mb-1">Revenue Overview</h2>
                            <p className="text-xs text-gray-500">January - December 2026</p>
                        </div>

                        <div className="flex h-64 w-full gap-2 md:gap-4 mt-auto">
                            <div className="flex flex-col justify-between text-[10px] sm:text-xs text-gray-400 text-right pb-8 font-medium">
                                <span>1.000.000</span>
                                <span>750.000</span>
                                <span>500.000</span>
                                <span>250.000</span>
                                <span>0</span>
                            </div>

                            <div className="relative flex-1 flex items-end justify-between gap-1 sm:gap-2">
                                <div className="absolute inset-0 pb-8 flex flex-col justify-between pointer-events-none z-0">
                                    <div className="w-full border-t border-gray-200 border-dashed"></div>
                                    <div className="w-full border-t border-gray-200 border-dashed"></div>
                                    <div className="w-full border-t border-gray-200 border-dashed"></div>
                                    <div className="w-full border-t border-gray-200 border-dashed"></div>
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>

                                {/* Chart Bars */}
                                {[
                                    { month: 'Jan', val: '300.000', height: '30%' },
                                    { month: 'Feb', val: '450.000', height: '45%' },
                                    { month: 'Mar', val: '350.000', height: '35%' },
                                    { month: 'Apr', val: '500.000', height: '50%' },
                                    { month: 'May', val: '400.000', height: '40%' },
                                    { month: 'Jun', val: '650.000', height: '65%' },
                                    { month: 'Jul', val: '600.000', height: '60%' },
                                    { month: 'Aug', val: '800.000', height: '80%' },
                                    { month: 'Sep', val: '700.000', height: '70%' },
                                    { month: 'Oct', val: '900.000', height: '90%' },
                                    { month: 'Nov', val: '850.000', height: '85%' },
                                    { month: 'Dec', val: '1.000.000', height: '100%' }
                                ].map((data) => (
                                    <div key={data.month} className="relative flex flex-col items-center justify-end flex-1 h-full z-10">
                                        <div 
                                            className={`w-full sm:w-3/4 bg-blue-500 hover:bg-blue-600 rounded-t-sm md:rounded-t-md transition-all relative group cursor-pointer`} 
                                            style={{ height: data.height }}
                                        >
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-[10px] sm:text-xs py-1 px-2 rounded pointer-events-none transition-opacity z-20 whitespace-nowrap">
                                                Rp {data.val}
                                            </div>
                                        </div>
                                        <div className="h-8 flex items-end justify-center w-full">
                                            <span className="text-[10px] sm:text-xs text-gray-500">{data.month}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-white shadow rounded-lg p-3 md:p-6 transition-all duration-200 relative overflow-hidden flex items-start justify-between">
                    <div className="flex-1">
                        <h2 className="font-bold text-gray-700 mb-1">Recent Transactions</h2>
                        <div className="flex-1 space-y-4">
                            {recentTransactions?.length > 0 ? (
                                recentTransactions.map((transaction, index) => (
                                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-400 last:border-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-700">{transaction.customer_name || 'Customer'}</p>
                                            <p className="text-sm text-gray-600">{transaction.product?.name || 'Product'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">Rp{transaction.amount}</p>
                                            <span className="bg-green-100 px-2 py-0.5 text-xs rounded-lg">{transaction.status}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-400 last:border-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-700">John Doe</p>
                                            <p className="text-sm text-gray-600">Anime A5 Sticker</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">Rp20.000</p>
                                            <span className="bg-green-100 px-2 py-0.5 text-xs rounded-lg">Completed</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-400 last:border-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-700">Jane Doe</p>
                                            <p className="text-sm text-gray-600">Keychain</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">Rp15.000</p>
                                            <span className="bg-green-100 px-2 py-0.5 text-xs rounded-lg">Completed</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-gray-400 last:border-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-700">Sam Baldman</p>
                                            <p className="text-sm text-gray-600">Anime Poster</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">Rp40.000</p>
                                            <span className="bg-yellow-100 px-2 py-0.5 text-xs rounded-lg">Preorder</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}