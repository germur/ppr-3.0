import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('Paramount Property Restoration'),
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

export const collections = { blog };
