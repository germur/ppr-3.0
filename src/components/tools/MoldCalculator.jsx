
import React, { useState, useEffect } from 'react';

export default function MoldCalculator() {
    const [sqft, setSqft] = useState(1500);
    const [samples, setSamples] = useState(2); // Baseline: 1 outdoor (control) + 1 indoor
    const [type, setType] = useState('residential');
    const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

    useEffect(() => {
        // Basic heuristics for pricing (Not binding quotes, just estimates)
        const baseFee = type === 'residential' ? 350 : 550; // Visual inspection fee
        const perSampleFee = 75; // Lab fee per sample

        // Estimate samples based on sqft if using defaults? 
        // Usually 1 sample per 1000 sqft + 1 outdoor control, + specific concern areas.
        // Let's create a logic:
        // Min samples = 2 (1 control, 1 inside)
        // Add 1 sample for every 1000 sq ft over 1000.

        const derivedSamples = Math.max(2, Math.ceil(sqft / 1000) + 1);
        // Allow user override? For now let's just use derived as a "Recommended" count shown in text, 
        // but calculation uses simple math.

        // Let's stick to a simpler model for the calculator UI:
        // Just base inspection + sample count.

        const minPrice = baseFee + (Math.max(2, samples) * perSampleFee);
        const maxPrice = minPrice * 1.25; // Buffer

        setEstimatedCost({ min: minPrice, max: maxPrice });
    }, [sqft, samples, type]);

    return (
        <div className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Property Type</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setType('residential')}
                                className={`flex-1 py-2 px-4 rounded-lg border ${type === 'residential' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                            >
                                Residential
                            </button>
                            <button
                                onClick={() => setType('commercial')}
                                className={`flex-1 py-2 px-4 rounded-lg border ${type === 'commercial' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-gray-200 text-gray-600'}`}
                            >
                                Commercial
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Property Size: <span className="text-blue-600">{sqft} sq ft</span>
                        </label>
                        <input
                            type="range"
                            min="500"
                            max="10000"
                            step="100"
                            value={sqft}
                            onChange={(e) => setSqft(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Samples Needed (Est): <span className="text-blue-600">{Math.max(2, samples)}</span>
                        </label>
                        <p className="text-xs text-gray-400 mb-2">Includes 1 outdoor control sample + indoor areas.</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSamples(Math.max(2, samples - 1))}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200"
                            >-</button>
                            <button
                                onClick={() => setSamples(samples + 1)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200"
                            >+</button>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-center items-center text-center">
                    <h4 className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-2">Estimated Inspection Cost</h4>
                    <div className="text-4xl font-extrabold text-slate-800 mb-1">
                        ${Math.round(estimatedCost.min)} - ${Math.round(estimatedCost.max)}
                    </div>
                    <p className="text-xs text-gray-400 max-w-xs leading-tight">
                        *Includes visual inspection, moisture mapping, thermal imaging prep, and 3rd party lab fees. Final quote provided on-site.
                    </p>

                    <a href="tel:7866022217" className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">call</span>
                        Lock in Price Now
                    </a>
                </div>
            </div>
        </div>
    );
}
