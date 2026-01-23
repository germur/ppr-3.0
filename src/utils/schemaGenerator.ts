export interface SchemaProps {
    url: string;
    image: string;
    description: string;
    serviceType?: string;
    name?: string;
    telephone?: string;
    areaServed?: string[];
    services?: { name: string; type?: string }[];
}

export const generateServiceSchema = ({
    url,
    image,
    description,
    serviceType = "GeneralContractor",
    name = "Paramount Property Restoration",
    telephone = "+1-786-602-2217",
    areaServed = ["Miami", "Orlando", "Tampa", "Fort Lauderdale"],
    services = [],
}: SchemaProps) => {
    const schema: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": serviceType === "GeneralContractor" ? "GeneralContractor" : "Service",
        name,
        url,
        telephone,
        image,
        areaServed,
        description,
    };

    if (serviceType !== "GeneralContractor") {
        schema.serviceType = serviceType;
        schema.provider = {
            "@type": "GeneralContractor",
            name: "Paramount Property Restoration"
        };
    }

    if (services.length > 0) {
        schema.hasOfferCatalog = {
            "@type": "OfferCatalog",
            name: `${serviceType} Services`,
            itemListElement: services.map((service) => ({
                "@type": service.type || "Service",
                name: service.name,
            })),
        };
    }

    return schema;
};
