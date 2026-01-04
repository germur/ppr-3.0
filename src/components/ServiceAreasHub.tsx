import { MapPin, ArrowRight, Search, CheckCircle, Shield } from 'lucide-react';
import React, { useState } from 'react';

const regions = [
    {
        name: "Central Florida",
        counties: "Orange, Seminole, Osceola",
        link: "/service-areas/central-florida/",
        featured: true,
        icon: "🎢",
        bgClass: "bg-blue-50"
    },
    {
        name: "South Florida",
        counties: "Miami-Dade, Broward, Palm Beach",
        link: "/service-areas/south-florida/",
        featured: true,
        icon: "🌴",
        bgClass: "bg-blue-50"
    },
    {
        name: "Tampa Bay",
        counties: "Hillsborough, Pinellas, Pasco",
        link: "/service-areas/tampa-bay/",
        featured: false,
        icon: "⛵",
        bgClass: "bg-white"
    },
    {
        name: "Southwest Florida",
        counties: "Lee, Collier",
        link: "/service-areas/southwest-florida/",
        featured: false,
        icon: "🏖️",
        bgClass: "bg-white"
    },
    {
        name: "Treasure Coast",
        counties: "St. Lucie, Martin, Palm Beach (North)",
        link: "/service-areas/treasure-coast/",
        featured: false,
        icon: "⚓",
        bgClass: "bg-white"
    }
];

interface City {
    name: string;
    slug: string;
    radius?: string;
}

export default function ServiceAreasHub({ cities = [] }: { cities?: City[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <section className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-6 text-slate-900">Serving Florida Homeowners & Businesses 24/7</h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    From the Gulf Coast to the Atlantic, our fleets are positioned for 60-minute emergency response.
                </p>

                {/* Visual Map Placeholder */}
                <div className="w-full h-48 bg-slate-100 rounded-2xl flex items-center justify-center mb-12 border border-slate-200">
                    <p className="text-slate-400 flex items-center gap-2">
                        <MapPin className="w-6 h-6" /> Florida Service Map Visualization
                    </p>
                </div>
            </div>

            {/* Programmatic Search Block */}
            <div className="mb-16 max-w-2xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Enter your city (e.g. Naples)..."
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-sm"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {searchTerm && (
                        <div className="absolute top-16 left-0 w-full bg-white shadow-xl rounded-xl border border-slate-100 p-4 z-10 max-h-60 overflow-y-auto">
                            <p className="text-sm text-slate-500 mb-2">Service Locations:</p>
                            <ul>
                                {filteredCities.length > 0 ? filteredCities.map((city) => (
                                    <a key={city.slug} href={`/service-areas/${city.slug}/`} className="block p-2 hover:bg-slate-50 rounded cursor-pointer flex justify-between items-center group/item transition-colors">
                                        <span className="font-medium text-slate-700">{city.name}</span>
                                        <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover/item:opacity-100" />
                                    </a>
                                )) : (
                                    <li className="p-2 text-slate-400 text-sm">No locations found. We might still serve you, call us!</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {regions.map((region) => (
                    <a
                        href={region.link}
                        key={region.name}
                        className={`group p-8 border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-300 relative overflow-hidden ${region.featured ? 'md:col-span-1 lg:col-span-1 min-h-[300px] flex flex-col justify-between' : 'bg-white hover:border-blue-200'
                            } ${region.bgClass}`}
                    >
                        {region.featured && (
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform duration-500">
                                {region.icon}
                            </div>
                        )}

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="text-4xl">{region.icon}</div>
                                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
                                    <ArrowRight className="text-slate-400 w-5 h-5 group-hover:text-white transition-colors" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                                {region.name}
                            </h3>
                            <p className="text-slate-600 flex items-start gap-2 text-sm leading-relaxed">
                                <MapPin size={16} className="mt-1 shrink-0 text-blue-500" />
                                {region.counties}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            {/* Trust Block */}
            <div className="bg-slate-900 text-white rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
                <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                            <Shield className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Serving Statewide</h4>
                            <p className="text-slate-400 text-sm">Property Restoration</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 border-l border-r border-white/10 px-8">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Insurance Approved</h4>
                            <p className="text-slate-400 text-sm">Working with ALL Florida carriers</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        {/* Placeholder for Badge */}
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-2 text-yellow-400 font-bold border border-yellow-500/50">
                            FL
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Rapid Response</h4>
                            <p className="text-slate-400 text-sm">Disaster Response Team Ready</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
