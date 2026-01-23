import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('Paramount Property Restoration'),
        authorImage: z.string().optional(),
        image: z.string().optional(),
        category: z.enum([
            'Disaster Recovery',
            'Home Remodeling',
            'Florida Resources',
            'Commercial Services'
        ]),
        subcategory: z.enum([
            // Disaster Recovery
            'water-damage',
            'fire-smoke',
            'mold-remediation',
            'storm-hurricane',
            // Home Remodeling
            'kitchen-renovations',
            'bathroom-upgrades',
            'home-additions',
            'flooring-finishes',
            'exterior-renovations',
            // Florida Resources
            'insurance-claims',
            'building-codes',
            'cost-guides',
            // Commercial Services
            'commercial-restoration',
            'facility-maintenance'
        ]),
        featured: z.boolean().default(false),
        fullWidth: z.boolean().optional(),
    }),
});

const cities = defineCollection({
    schema: z.object({
        name: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),

        // pSEO: Hybrid Context
        restoration_pain: z.string(), // e.g. "High flood risk in low-lying areas..."
        remodeling_desire: z.string(), // e.g. "Modernizing waterfront condos..."

        // pSEO: Local Authority
        local_service_radius: z.string().optional(), // e.g. "Port Royal, Old Naples"
        local_building_dept: z.string().optional(),

        // Grouping
        region: z.enum(['Central Florida', 'Tampa Bay & Coast', 'Southwest Florida', 'South Florida']).default('South Florida'),


        // Compliance Objects 
        compliance: z.array(z.object({
            title: z.string(),
            content: z.string()
        })).optional(),

        // Stats
        stats: z.object({
            roi: z.string(),
            timeline: z.string(),
            value_increase: z.string().optional()
        }).optional(),

        // Meta
        lat: z.number().optional(),
        lon: z.number().optional()
    })
});

const services = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pageTitle: z.string(),
        pageDescription: z.string(),
        heroImage: z.string().optional(), // We'll map this string to an import in the layout or component
        features: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string(), // Store icon name as string, map to component at runtime
            link: z.string().optional()
        })),
        processSteps: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string()
        })),
        faqs: z.array(z.object({
            question: z.string(),
            answer: z.string()
        })),
        // Optional sections for specific services like Sewage
        insuranceTitle: z.string().optional(),
        insuranceText: z.string().optional(),
        protocolTitle: z.string().optional(),
        protocolDescription: z.string().optional()
    })
});

export const collections = { blog, cities, services };
