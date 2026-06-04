export interface ServiceFeature {
    title: string;
    description: string;
    icon: string;
    link: string;
    image: string; // New field for card image
}

export interface LocalRealityFeature {
    icon: string;
    title: string;
    description: string;
}

export interface RegionData {
    slug: string;
    name: string;
    heroH1: string;
    heroBadgeText: string; // New field
    introText: string;
    metaDescription: string;
    mapEmbed: string;
    coverImage: string;
    localRealityImage: string; // New field
    localRealityFeatures: LocalRealityFeature[]; // New field
    serviceFeatures: ServiceFeature[];
}

export const regions: RegionData[] = [
    {
        slug: "central-florida",
        name: "Central Florida",
        heroH1: "Expert Restoration & Remodeling Services in Central Florida",
        heroBadgeText: "Serving Orange, Seminole & Osceola Counties",
        introText: "From the historic bungalows in Sanford to the modern estates in Windermere, Central Florida homes face unique challenges. Dealing with the humidity of Orange County and the storm patterns unique to the I-4 corridor requires a specialized approach. Paramount Property Restoration provides licensed solutions tailored to the Greater Orlando area.",
        metaDescription: "Paramount Property Restoration provides 24/7 disaster recovery services across Central Florida, including Orlando, Kissimmee, and Sanford. Licensed & Insured.",
        mapEmbed: "https://www.google.com/maps/d/embed?mid=1JyX....",
        coverImage: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&q=80",
        localRealityImage: "https://images.unsplash.com/photo-1583845112239-9721390f013c?auto=format&fit=crop&q=80",
        localRealityFeatures: [
            { icon: "thunderstorm", title: "Afternoon Storms", description: "Rapid flooding from daily severe thunderstorms common in the I-4 corridor." },
            { icon: "water_voc", title: "Lake & Swamp Humidity", description: "Persistent moisture from inland lakes causing hidden mold growth." },
            { icon: "roofing", title: "Wind Damage", description: "Roof and siding damage from tropical storms impacting inland areas." },
            { icon: "local_shipping", title: "I-4 Rapid Response", description: "Fleet positioned for fast access to Orlando, Sanford, and Kissimmee." }
        ],
        serviceFeatures: [
            {
                title: "Storm Flood Extraction",
                description: "Fast water removal for summer storm floods typical in Orlando.",
                icon: "flood",
                link: "/restoration/water-damage",
                image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80"
            },
            {
                title: "Mold Remediation",
                description: "Humidity control for lakefront properties in Winter Park.",
                icon: "water_voc",
                link: "/restoration/mold-remediation",
                image: "https://images.unsplash.com/photo-1620138942284-a16f2c0022d4?auto=format&fit=crop&q=80"
            },
            {
                title: "Kitchen Remodeling",
                description: "Modernizing homes in Kissimmee and Altamonte Springs.",
                icon: "countertops",
                link: "/remodeling-services/kitchen-remodeling",
                image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80"
            },
            {
                title: "Fire Damage Repair",
                description: "Complete restoration for kitchen and electrical fires.",
                icon: "fire_extinguisher",
                link: "/restoration/fire-damage",
                image: "https://images.unsplash.com/photo-1581457497148-360d00f5c1d6?auto=format&fit=crop&q=80"
            },
            {
                title: "Hurricane Mitigation",
                description: "Board-ups and structural stabilization for inland winds.",
                icon: "security",
                link: "/restoration/storm-damage",
                image: "https://images.unsplash.com/photo-1565561148810-77042576dd46?auto=format&fit=crop&q=80"
            },
            {
                title: "Commercial Services",
                description: "Restoration for hotels and businesses in the Orlando metro.",
                icon: "domain",
                link: "/commercial",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        slug: "tampa-bay",
        name: "Tampa Bay",
        heroH1: "Premier Property Restoration Services in the Tampa Bay Area",
        heroBadgeText: "Serving Hillsborough, Pinellas & Pasco Counties",
        introText: "Protecting and restoring properties from Gulf storms. Serving Hyde Park, St. Petersburg, Clearwater, and surrounding estates with rapid response times.",
        metaDescription: "Expert water and fire damage restoration in Tampa, St. Petersburg, and Clearwater. Quick response times for flood cleanup and mold remediation.",
        mapEmbed: "https://www.google.com/maps/d/embed?mid=1JyX....",
        coverImage: "https://images.unsplash.com/photo-1678122394541-e9432f808728?auto=format&fit=crop&q=80",
        localRealityImage: "https://images.unsplash.com/photo-1502590464431-2956cf7a134b?auto=format&fit=crop&q=80",
        localRealityFeatures: [
            { icon: "water_drop", title: "Salt-Air Corrosion", description: "Specialized treatment preventing coastal material degradation." },
            { icon: "cyclone", title: "Mold & Humidity", description: "Industrial dehumidification for high-humidity environments." },
            { icon: "flood", title: "Storm Surges", description: "Flood-proofing and recovery protocols for hurricane zones." },
            { icon: "local_shipping", title: "Fleet Positioning", description: "Strategically placed fleets for fast bridge crossing during emergencies." }
        ],
        serviceFeatures: [
            {
                title: "Saltwater Extraction",
                description: "Specialized pumps and antimicrobial treatments for saltwater intrusion.",
                icon: "tsunami",
                link: "/restoration/water-damage",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80"
            },
            {
                title: "Humidity Control",
                description: "Advanced moisture detection and climate control for coastal homes.",
                icon: "hvac",
                link: "/restoration/mold-remediation",
                image: "https://images.unsplash.com/photo-1524021273932-d7f4be74c3d3?auto=format&fit=crop&q=80"
            },
            {
                title: "Hurricane Restoration",
                description: "Pre-storm board-up and post-storm structural stabilization.",
                icon: "security",
                link: "/restoration/storm-damage",
                image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80"
            },
            {
                title: "Coastal Remodeling",
                description: "Renovations using impact-resistant materials and moisture-proof finishes.",
                icon: "construction",
                link: "/remodeling-services",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
            },
            {
                title: "Fire & Smoke Repair",
                description: "Comprehensive smoke odor removal and structural repair.",
                icon: "fire_extinguisher",
                link: "/restoration/fire-damage",
                image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
            },
            {
                title: "Commercial Services",
                description: "Large-scale disaster recovery planning for businesses.",
                icon: "domain",
                link: "/commercial",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        slug: "south-florida",
        name: "South Florida",
        heroH1: "Premier Restoration Services in South Florida",
        heroBadgeText: "Serving Miami-Dade, Broward & Palm Beach",
        introText: "South Florida's architecture, from Art Deco in Miami to modern high-rises in Fort Lauderdale, demands adherence to the strictest building codes in the nation. We specialize in hurricane recovery and high-humidity mold prevention for Miami-Dade and Broward counties.",
        metaDescription: "24/7 Property Restoration in Miami, Fort Lauderdale, and West Palm Beach. We handle water extraction, fire repair, and mold removal.",
        mapEmbed: "https://www.google.com/maps/d/embed?mid=1JyX....",
        coverImage: "https://images.unsplash.com/photo-1549141097-4c7406a44139?auto=format&fit=crop&q=80",
        localRealityImage: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&q=80",
        localRealityFeatures: [
            { icon: "water_drop", title: "Tropical Humidity", description: "Constant moisture control to prevent rapid mold outbreaks." },
            { icon: "apartment", title: "High-Rise Logistics", description: "Specialized equipment for vertical extraction in condos." },
            { icon: "cyclone", title: "Hurricane Codes", description: "Rebuilding to the strictest wind-load standards in the US." },
            { icon: "traffic", title: "Traffic Response", description: "Motorcycle response units to bypass I-95 congestion." }
        ],
        serviceFeatures: [
            {
                title: "High-Rise Water Damage",
                description: "Specialized extraction for condos and apartments in Miami and Brickell.",
                icon: "apartment",
                link: "/restoration/water-damage",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"
            },
            {
                title: "Hurricane Recovery",
                description: "Board-up and structural drying meeting Miami-Dade hurricane codes.",
                icon: "cyclone",
                link: "/restoration/storm-damage",
                image: "https://images.unsplash.com/photo-1627065012579-22a832c38d82?auto=format&fit=crop&q=80"
            },
            {
                title: "Luxury Remodeling",
                description: "High-end renovations for estates in Boca Raton and West Palm Beach.",
                icon: "diamond",
                link: "/remodeling-services",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        slug: "southwest-florida",
        name: "Southwest Florida",
        heroH1: "Disaster Recovery for Southwest Florida",
        heroBadgeText: "Serving Lee & Collier Counties",
        introText: "Recovering from recent hurricanes like Ian and Idalia requires a partner who focuses on resilience. From canal homes in Cape Coral to retreats in Naples, we bring expertise in water damage mitigation and mold testing to Lee and Collier counties.",
        metaDescription: "Trusted restoration contractor for Naples, Fort Myers, and Cape Coral. Emergency water damage cleanup and mold testing services.",
        mapEmbed: "https://www.google.com/maps/d/embed?mid=1JyX....",
        coverImage: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80",
        localRealityImage: "https://images.unsplash.com/photo-1623945417316-24bb43d1a0da?auto=format&fit=crop&q=80",
        localRealityFeatures: [
            { icon: "tsunami", title: "Gulf Storm Surge", description: "Mitigation protocols for saltwater flooding damage." },
            { icon: "houseboat", title: "Canal Moisture", description: "Protecting waterfront properties from rising damp." },
            { icon: "calendar_month", title: "Seasonal Vacancy", description: "Remote monitoring for snowbird properties." },
            { icon: "speed", title: "Rapid Mobilization", description: "Pre-staged equipment for post-storm access." }
        ],
        serviceFeatures: [
            {
                title: "Canal Home Restoration",
                description: "Addressing unique moisture issues in waterfront properties.",
                icon: "houseboat",
                link: "/restoration/water-damage",
                image: "https://images.unsplash.com/photo-1596275825310-9b63484c9808?auto=format&fit=crop&q=80"
            },
            {
                title: "Post-Hurricane Mold",
                description: "Comprehensive mold testing and remediation for storm-affected structures.",
                icon: "biotech",
                link: "/restoration/mold-remediation",
                image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80"
            },
            {
                title: "Resilient Rebuilding",
                description: "Reconstruction focused on hardening homes against future storms.",
                icon: "foundation",
                link: "/remodeling-services",
                image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&q=80"
            }
        ]
    },
    {
        slug: "treasure-coast",
        name: "Treasure Coast",
        heroH1: "Restoration Services for the Treasure Coast",
        heroBadgeText: "Serving Port St. Lucie, Stuart & Jupiter",
        introText: "The Treasure Coast faces unique challenges from Atlantic storms and humidity. We provide rapid response restoration services from Port St. Lucie to Jupiter, preserving homes and businesses with expert care.",
        metaDescription: "Licensed restoration contractor serving Port St. Lucie, Stuart, and Jupiter. 24/7 water damage and mold remediation.",
        mapEmbed: "https://www.google.com/maps/d/embed?mid=1JyX....",
        coverImage: "https://images.unsplash.com/photo-1543419373-c61947e9c323?auto=format&fit=crop&q=80",
        localRealityImage: "https://images.unsplash.com/photo-1596275825310-9b63484c9808?auto=format&fit=crop&q=80",
        localRealityFeatures: [
            { icon: "water_drop", title: "Atlantic Humidity", description: "Controlling moisture in coastal properties." },
            { icon: "cyclone", title: "Hurricane Prep", description: "Storm readiness for the Atlantic coast." },
            { icon: "house", title: "Estate Protection", description: "Discreet services for luxury properties." },
            { icon: "local_shipping", title: "Regional Access", description: "Fast response along I-95 and Florida's Turnpike." }
        ],
        serviceFeatures: [
            {
                title: "Water Damage Repair",
                description: "Rapid extraction for floods and leaks.",
                icon: "flood",
                link: "/restoration/water-damage",
                image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80"
            },
            {
                title: "Mold Remediation",
                description: "Expert mold testing and removal.",
                icon: "biotech",
                link: "/restoration/mold-remediation",
                image: "https://images.unsplash.com/photo-1620138942284-a16f2c0022d4?auto=format&fit=crop&q=80"
            },
            {
                title: "Storm Recovery",
                description: "Post-hurricane cleanup and rebuilding.",
                icon: "cyclone",
                link: "/restoration/storm-damage",
                image: "https://images.unsplash.com/photo-1565561148810-77042576dd46?auto=format&fit=crop&q=80"
            }
        ]
    }
];
