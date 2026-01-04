
import os

cities_data = [
    # Central Florida
    {"slug": "orlando", "name": "Orlando", "region": "Central Florida", "title": "Orlando Restoration Services"},
    {"slug": "winter-park", "name": "Winter Park", "region": "Central Florida", "title": "Winter Park Remodeling"},
    {"slug": "kissimmee", "name": "Kissimmee", "region": "Central Florida", "title": "Kissimmee Restoration"},
    {"slug": "sanford", "name": "Sanford", "region": "Central Florida", "title": "Sanford Water Damage"},
    
    # Tampa Bay
    {"slug": "tampa", "name": "Tampa", "region": "Tampa Bay & Coast", "title": "Tampa Restoration Services"},
    {"slug": "sarasota", "name": "Sarasota", "region": "Tampa Bay & Coast", "title": "Sarasota Home Remodeling"},
    {"slug": "clearwater", "name": "Clearwater", "region": "Tampa Bay & Coast", "title": "Clearwater Mold Removal"},
    {"slug": "bradenton", "name": "Bradenton", "region": "Tampa Bay & Coast", "title": "Bradenton Repairs"},

    # Southwest Florida (naples exists)
    {"slug": "fort-myers", "name": "Fort Myers", "region": "Southwest Florida", "title": "Fort Myers Build"},
    {"slug": "cape-coral", "name": "Cape Coral", "region": "Southwest Florida", "title": "Cape Coral Homes"},
    {"slug": "bonita-springs", "name": "Bonita Springs", "region": "Southwest Florida", "title": "Bonita Springs Restoration"},
    {"slug": "estero", "name": "Estero", "region": "Southwest Florida", "title": "Estero Restoration"},

    # South Florida (miami exists)
    {"slug": "fort-lauderdale", "name": "Fort Lauderdale", "region": "South Florida", "title": "Fort Lauderdale Restoration"},
    {"slug": "boca-raton", "name": "Boca Raton", "region": "South Florida", "title": "Boca Raton Remodeling"},
    {"slug": "west-palm-beach", "name": "West Palm Beach", "region": "South Florida", "title": "West Palm Beach Services"},
    {"slug": "delray-beach", "name": "Delray Beach", "region": "South Florida", "title": "Delray Beach Mold"},
    {"slug": "coral-gables", "name": "Coral Gables", "region": "South Florida", "title": "Coral Gables Historic Renovations"}
]

base_path = "/Users/rogermurillo/.gemini/antigravity/scratch/ppr-3-0/src/content/cities"

for city in cities_data:
    file_path = os.path.join(base_path, f"{city['slug']}.md")
    if not os.path.exists(file_path):
        content = f"""---
name: "{city['name']}"
title: "{city['title']}"
description: "Professional restoration and general contracting services in {city['name']}, FL. Licensed and insured."
image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2670&auto=format&fit=crop"
region: "{city['region']}"

restoration_pain: "Storm and water damage recovery services specific to the {city['name']} area."
remodeling_desire: "Luxury home renovations and upgrades for {city['name']} homeowners."

local_service_radius: "{city['name']} and surrounding areas"
local_building_dept: "{city['name']} Building Department"

compliance:
  - title: "Local Code Compliance"
    content: "Adherence to {city['name']} specific structural requirements."

stats:
  roi: "85%"
  timeline: "12-16 Weeks"
  value_increase: "+15%"

lat: 28.538
lon: -81.379
---
"""
        with open(file_path, "w") as f:
            f.write(content)
        print(f"Created {city['slug']}.md")
    else:
        print(f"Skipped {city['slug']}.md (exists)")
