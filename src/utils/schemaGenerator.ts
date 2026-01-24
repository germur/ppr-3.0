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

import { COMPANY_INFO } from '../data/company';

export const generateServiceSchema = ({
    url,
    image,
    description,
    serviceType = "GeneralContractor",
    name = COMPANY_INFO.name,
    telephone = `+1-${COMPANY_INFO.phoneDashes}`,
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
