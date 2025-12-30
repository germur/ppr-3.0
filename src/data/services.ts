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
        slug: "water-damage-restoration",
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
        slug: "mold-remediation",
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
        slug: "fire-damage-restoration",
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
        slug: "storm-damage-repair",
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
        slug: "leak-detection",
        name: "Leak Detection",
        heroTitle: "Precision Leak Detection",
        description: "Pinpoint hidden leaks without destruction. We use advanced thermal imaging and acoustic technology to find the source fast.",
        theme: {
            primary: "#2563eb", // Blue 600
            accent: "#1e3a8a",  // Blue 900
        },
        icon: "plumbing",
    },
    {
        slug: "roof-tarping",
        name: "Roof Tarping",
        heroTitle: "Emergency Roof Tarping",
        description: "Immediate protection against rain and wind. Professional shrink-wrap and tarping services to prevent secondary water damage.",
        theme: {
            primary: "#334155", // Slate 700
            accent: "#0f172a",  // Slate 900
        },
        icon: "roofing",
    }
    // Add more services like "mold-remediation", "fire-damage" here
];
