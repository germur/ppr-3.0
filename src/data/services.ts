export interface ServiceData {
    slug: string;
    name: string;
    heroTitle: string;
    description: string;
    theme: {
        primary: string;
        accent: string;
    };
    icon: string;
}

export const services: ServiceData[] = [
    {
        slug: "restoration/water-damage",
        name: "Water Damage Restoration",
        heroTitle: "Expert Water Damage Restoration", // City will be appended dynamically
        description: "Fast response to flood and leak emergencies. On-site in 60 minutes or less. We handle the insurance paperwork.",
        theme: {
            primary: "#1162d4", // Blue
            accent: "#f97316",  // Orange
        },
        icon: "water_drop",
    },
    {
        slug: "restoration/water-damage/structural-drying",
        name: "Structural Drying",
        heroTitle: "Structural Drying & Dehumidification",
        description: "Advanced drying technology to salvage hardwood floors, cabinets, and drywall. Prevent mold with scientific structural drying.",
        theme: {
            primary: "#1162d4", // Blue
            accent: "#f97316",  // Orange
        },
        icon: "air",
    },
    {
        slug: "restoration/mold-remediation",
        name: "Mold Remediation",
        heroTitle: "Professional Mold Remediation",
        description: "Certified mold inspection and removal. We identify the source, contain the spread, and restore healthy air quality.",
        theme: {
            primary: "#059669", // Emerald 600
            accent: "#0ea5e9",  // Sky Blue
        },
        icon: "biotech",
    },
    {
        slug: "restoration/fire-damage",
        name: "Fire Damage Restoration",
        heroTitle: "Fire & Smoke Damage Restoration",
        description: "Complete fire recovery services. From soot and smoke removal to structural reconstruction. We handle your insurance claim.",
        theme: {
            primary: "#dc2626", // Red 600
            accent: "#f59e0b",  // Amber
        },
        icon: "fire_extinguisher",
    },
    {
        slug: "restoration/fire-damage/soot-cleanup",
        name: "Soot & Smoke Cleanup",
        heroTitle: "Soot Cleanup & Removal",
        description: "Specialized soot removal for walls, ceilings, and contents. We use chem-sponges and thermal fogging to eliminate acidic residue.",
        theme: {
            primary: "#dc2626", // Red
            accent: "#f97316",  // Orange
        },
        icon: "cleaning_services",
    },
    {
        slug: "restoration/fire-damage/repair",
        name: "Fire Damage Repair",
        heroTitle: "Fire Restoration Contractors",
        description: "Full-service reconstruction from permits to paint. We handle structural repairs, electrical, and finishing for a complete recovery.",
        theme: {
            primary: "#ea580c", // Orange 600
            accent: "#c2410c",  // Orange 700
        },
        icon: "construction",
    },
    {
        slug: "restoration/fire-damage/contents-cleaning",
        name: "Contents Cleaning",
        heroTitle: "Contents Cleaning & Restoration",
        description: "We refuse to call it a total loss. Advanced ultrasonic cleaning and deodorization for electronics, textiles, and sentimental items.",
        theme: {
            primary: "#be123c", // Rose 700
            accent: "#f43f5e",  // Rose 500
        },
        icon: "checkroom", // Material symbol for clothes/wardrobe
    },
    {
        slug: "restoration/storm-damage",
        name: "Storm Damage Repair",
        heroTitle: "Hurricane & Storm Damage Repair",
        description: "Rapid response for wind and storm damage. Board-up services, roof tarping, and structural repairs.",
        theme: {
            primary: "#475569", // Slate 600
            accent: "#38bdf8",  // Sky Blue
        },
        icon: "cyclone",
    },
    {
        slug: "restoration/storm-damage/hurricane-recovery",
        name: "Hurricane Recovery",
        heroTitle: "Hurricane & Storm Damage Recovery",
        description: "Emergency board-ups, drone-assisted inspections, and complex insurance claim management for Florida homeowners.",
        theme: {
            primary: "#0f172a", // Slate 900
            accent: "#f97316",  // Orange
        },
        icon: "flood",
    },
    {
        slug: "kitchen-remodeling",
        name: "Kitchen Remodeling",
        heroTitle: "Modern Kitchen Remodeling",
        description: "Transform your kitchen with our expert design and build services. From custom cabinetry and islands to complete layout redesigns.",
        theme: {
            primary: "#d97706", // Amber 600
            accent: "#78350f",  // Amber 900
        },
        icon: "countertops",
    },
    {
        slug: "bathroom-remodeling",
        name: "Bathroom Remodeling",
        heroTitle: "Luxury Bathroom Renovations",
        description: "Create your perfect spa retreat. specialized in walk-in showers, vanity upgrades, and complete bathroom makeovers.",
        theme: {
            primary: "#0891b2", // Cyan 600
            accent: "#164e63",  // Cyan 900
        },
        icon: "bathtub", // Verify if this icon exists in Material Symbols, otherwise 'water' or 'spa'
    },
    {
        slug: "commercial-restoration",
        name: "Commercial Restoration",
        heroTitle: "Commercial Disaster Recovery",
        description: "Minimize business downtime. We handle large-scale water, fire, and storm restoration for hotels, offices, and condos.",
        theme: {
            primary: "#4f46e5", // Indigo 600
            accent: "#1e1b4b",  // Indigo 950
        },
        icon: "domain",
    },
    {
        slug: "restoration/water-damage/leak-repair",
        name: "Leak Repairs",
        heroTitle: "Precision Leak Detection & Repair",
        description: "Pinpoint hidden leaks without destruction. We use advanced thermal imaging and acoustic technology to find the source fast.",
        theme: {
            primary: "#2563eb", // Blue 600
            accent: "#1e3a8a",  // Blue 900
        },
        icon: "plumbing",
    },
    {
        slug: "restoration/board-up-services",
        name: "Roof Tarping",
        heroTitle: "Emergency Roof Tarping",
        description: "Immediate protection against rain and wind. Professional shrink-wrap and tarping services to prevent secondary water damage.",
        theme: {
            primary: "#334155", // Slate 700
            accent: "#0f172a",  // Slate 900
        },
        icon: "roofing",
    },
    {
        slug: "cleaning-services/biohazard-trauma",
        name: "Biohazard & Trauma Cleaning",
        heroTitle: "Biohazard & Trauma Scene Cleanup",
        description: "Certified and compassionate cleanup for crime scenes, unattended deaths, and biohazard accidents. 24/7 discreet response.",
        theme: {
            primary: "#1193d4", // Medical/Calm Blue
            accent: "#f97316",  // Orange (Warning/Safety)
        },
        icon: "biological", // 'biological' or 'sanitizer'
    },
    {
        slug: "cleaning-services/biohazard-trauma/crime-scene",
        name: "Crime Scene Cleanup",
        heroTitle: "Crime Scene Cleanup Services",
        description: "Professional remediation of crime scenes. We handle biological hazards with strict adherence to legal and safety protocols.",
        theme: {
            primary: "#1193d4",
            accent: "#0f172a",
        },
        icon: "policy",
    },
    {
        slug: "cleaning-services/biohazard-trauma/unattended-death",
        name: "Unattended Death Cleanup",
        heroTitle: "Unattended Death Remediation",
        description: "Respectful and thorough cleanup for unattended death discovery. We restore the property's safety and livability.",
        theme: {
            primary: "#64748b", // Muted slate for solemnity
            accent: "#1193d4",
        },
        icon: "church",
    },
    {
        slug: "cleaning-services/biohazard-trauma/industrial-accidents",
        name: "Industrial Accident Cleanup",
        heroTitle: "Industrial Accident Remediation",
        description: "OSHA-compliant cleanup for industrial workplace accidents. Minimizing downtime while ensuring employee safety.",
        theme: {
            primary: "#f59e0b", // Amber/Caution
            accent: "#1e293b",
        },
        icon: "factory",
    },
    {
        slug: "cleaning-services/biohazard-trauma/hoarding",
        name: "Hoarding Cleanup",
        heroTitle: "Compassionate Hoarding Cleanup",
        description: "Non-judgmental decluttering and sanitization services. Reclaiming safe living spaces for you or your loved ones.",
        theme: {
            primary: "#10b981", // Emerald/New Beginnings
            accent: "#0f172a",
        },
        icon: "recycling",
    },
    {
        slug: "cleaning-services/vandalism-graffiti",
        name: "Vandalism & Graffiti Removal",
        heroTitle: "Graffiti Removal & Vandalism Restoration",
        description: "Rapid removal of graffiti and vandalism repairs. restoring the professional image of your commercial property.",
        theme: {
            primary: "#334155", // Urban Slate
            accent: "#ef4444",  // Alert Red
        },
        icon: "format_paint",
    },
    {
        slug: "cleaning-services/covid-disinfection",
        name: "Commercial Disinfection",
        heroTitle: "Commercial Disinfection Services",
        description: "Hospital-grade sanitization for offices, schools, and gyms. We use CDC-approved disinfectants to ensure a safe environment.",
        theme: {
            primary: "#059669", // Emerald 600
            accent: "#0ea5e9",  // Sky Blue
        },
        icon: "sanitizer",
    }
];
