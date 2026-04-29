import { Droplets, Flame, Wind, Hammer, Building2, ArrowRight, Bug } from 'lucide-react';
import BentoCard from './ui/BentoCard';

export default function BentoGridServices() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Our Core Services</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Comprehensive solutions for every property need. Whether it's an emergency or a dream project, we have the expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">

                    {/* 1. Water Damage (Large - 2x2) */}
                    <BentoCard href="/restoration/water-damage/" className="md:col-span-2 md:row-span-2 bg-blue-600 text-white flex flex-col justify-end">
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent z-10" />
                        {/* Placeholder Image */}
                        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Water Damage" />

                        <div className="relative z-20">
                            <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Droplets className="text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-2">Water Damage Restoration</h3>
                            <p className="text-blue-100 mb-6 max-w-md">Rapid extraction, drying, and dehumidification to prevent structural damage and mold growth.</p>
                            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">Learn More <ArrowRight size={16} /></span>
                        </div>
                    </BentoCard>

                    {/* 2. Kitchen Remodeling (Tall - 1x2) */}
                    <BentoCard href="/remodeling/kitchen/" className="md:col-span-1 md:row-span-2 bg-orange-100 flex flex-col justify-between group">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                        <img src="https://images.unsplash.com/photo-1556912173-3db996ea0661?q=80&w=2669&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Kitchen Remodeling" />

                        <div className="relative z-20 bg-white/90 backdrop-blur-sm p-4 rounded-xl mt-auto">
                            <Hammer className="text-orange-500 mb-2" size={24} />
                            <h3 className="text-xl font-bold text-slate-900">Kitchen & Bath Remodeling</h3>
                            <p className="text-slate-500 text-sm mt-1">View Portfolio</p>
                        </div>
                    </BentoCard>

                    {/* 3. Mold Remediation (Small) */}
                    <BentoCard href="/restoration/mold-remediation/" className="bg-white border border-slate-200 hover:border-green-400">
                        <div className="h-full flex flex-col justify-between">
                            <div className="bg-green-100 text-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                <Bug size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Mold Remediation</h3>
                                <p className="text-slate-500 text-xs mt-1">Safe containment & removal protocols.</p>
                            </div>
                        </div>
                    </BentoCard>

                    {/* 4. Fire & Smoke (Small) */}
                    <BentoCard href="/restoration/fire-damage/" className="bg-white border border-slate-200 hover:border-red-400">
                        <div className="h-full flex flex-col justify-between">
                            <div className="bg-red-100 text-red-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                <Flame size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Fire & Smoke Repair</h3>
                                <p className="text-slate-500 text-xs mt-1">Soot cleaning, odor removal & rebuilding.</p>
                            </div>
                        </div>
                    </BentoCard>

                    {/* 5. Storm Recovery (Wide - 2x1) */}
                    <BentoCard href="/restoration/storm-damage/" className="md:col-span-2 bg-slate-800 text-white flex items-center justify-between">
                        <div className="absolute inset-0 bg-slate-800 z-0"></div>
                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Wind className="text-blue-400" />
                                <h3 className="text-2xl font-bold">Storm Recovery</h3>
                            </div>
                            <p className="text-slate-400 text-sm max-w-xs">Hurricane preparation and post-storm reconstruction services.</p>
                        </div>
                        <div className="relative z-10 bg-slate-700/50 p-3 rounded-full hover:bg-slate-600 transition-colors">
                            <ArrowRight size={24} />
                        </div>
                    </BentoCard>

                    {/* 6. Commercial (Wide - 2x1) */}
                    <BentoCard href="/commercial/" className="md:col-span-2 bg-white border border-slate-200 flex items-center justify-between group overflow-hidden">
                        <div className="relative z-10 p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Building2 className="text-slate-500 group-hover:text-orange-500 transition-colors" />
                                <h3 className="text-2xl font-bold text-slate-900">Commercial Services</h3>
                            </div>
                            <p className="text-slate-500 text-sm">Large-loss recovery and tenant build-outs.</p>
                        </div>
                        <div className="relative h-full w-1/3">
                            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Commercial" />
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
}
