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
            // Florida Resources
            'insurance-claims',
            'building-codes',
            'cost-guides',
            // Commercial Services
            'commercial-restoration',
            'facility-maintenance'
        ]),
        featured: z.boolean().default(false),
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

export const collections = { blog, cities };
