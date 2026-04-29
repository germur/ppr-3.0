CITIES_WITH_PAGES = {
    'boca-raton','bonita-springs','bradenton','cape-coral','clearwater',
    'coral-gables','deerfield-beach','delray-beach','estero','fort-lauderdale',
    'fort-myers','fort-pierce','hobe-sound','kissimmee','lakeland','largo',
    'miami','naples','ocala','orlando','palm-coast','port-st-lucie',
    'sanford','sarasota','tampa','vero-beach','west-palm-beach',
    'winter-garden','winter-park',
}

NEIGHBORHOOD_MAP = {
    'hyde-park': 'tampa',
    'westchase': 'tampa',
    'miami-beach': 'miami',
    'st-petersburg': None,
    'riverview': None,
    'zephyrhills': None,
    'trinity': None,
    'land-o-lakes': None,
    'palm-harbor': None,
    'plant-city': None,
    'davie': None,
    'jupiter': None,
    'boynton-beach': None,
    'coral-springs': None,
    'doral': None,
    'hollywood': None,
    'homestead': None,
    'pembroke-pines': None,
    'sunrise': None,
    'marco-island': None,
    'punta-gorda': None,
    'altamonte-springs': None,
    'clermont': None,
    'pompano-beach': None,
}

SERVICE_FALLBACK = {
    'water-damage-restoration': '/restoration/water-damage/',
    'fire-damage-restoration':  '/restoration/fire-damage/',
    'mold-remediation':         '/restoration/mold-remediation/',
    'storm-damage-repair':      '/restoration/storm-damage/',
    'kitchen-remodeling':       '/remodeling/kitchen/',
    'bathroom-remodeling':      '/remodeling/bathroom/',
    'whole-home-renovation':    '/remodeling/',
    'roof-tarping':             '/restoration/storm-damage/',
    'commercial-restoration':   '/commercial/',
    'leak-detection':           '/restoration/water-damage/',
}

def dest_for_city_service(city, service):
    if city in CITIES_WITH_PAGES:
        if service == 'whole-home-renovation':
            return '/service-areas/' + city + '/'
        return '/service-areas/' + city + '/' + service + '/'
    parent = NEIGHBORHOOD_MAP.get(city)
    if parent and parent in CITIES_WITH_PAGES:
        if service == 'whole-home-renovation':
            return '/service-areas/' + parent + '/'
        return '/service-areas/' + parent + '/' + service + '/'
    return SERVICE_FALLBACK.get(service, '/restoration/')

def dest_for_city_only(city):
    if city in CITIES_WITH_PAGES:
        return '/service-areas/' + city + '/'
    parent = NEIGHBORHOOD_MAP.get(city)
    if parent and parent in CITIES_WITH_PAGES:
        return '/service-areas/' + parent + '/'
    return '/service-areas/'

REGIONS = {'south-florida', 'southwest-florida', 'central-florida', 'tampa-bay'}

missing = [
    '/blog/blog/post',
    '/restoration/mitigation-services/water-mitigation/pompano-beach',
    '/service-areas/central-florida/altamonte-springs/commercial-restoration',
    '/service-areas/central-florida/clermont/mold-remediation',
    '/service-areas/central-florida/winter-garden',
    '/service-areas/central-florida/winter-garden/water-damage-restoration',
    '/service-areas/fort-lauderdale/whole-home-renovation',
    '/service-areas/naples/whole-home-renovation',
    '/service-areas/orlando/whole-home-renovation',
    '/service-areas/south-florida/boca-raton/kitchen-remodeling',
    '/service-areas/south-florida/boca-raton/mold-remediation',
    '/service-areas/south-florida/boca-raton/roof-tarping',
    '/service-areas/south-florida/boynton-beach/fire-damage-restoration',
    '/service-areas/south-florida/boynton-beach/storm-damage-repair',
    '/service-areas/south-florida/coral-springs/bathroom-remodeling',
    '/service-areas/south-florida/coral-springs/kitchen-remodeling',
    '/service-areas/south-florida/coral-springs/roof-tarping',
    '/service-areas/south-florida/davie',
    '/service-areas/south-florida/delray-beach/commercial-restoration',
    '/service-areas/south-florida/delray-beach/roof-tarping',
    '/service-areas/south-florida/doral/bathroom-remodeling',
    '/service-areas/south-florida/doral/commercial-restoration',
    '/service-areas/south-florida/doral/kitchen-remodeling',
    '/service-areas/south-florida/hollywood/storm-damage-repair',
    '/service-areas/south-florida/homestead/bathroom-remodeling',
    '/service-areas/south-florida/homestead/kitchen-remodeling',
    '/service-areas/south-florida/homestead/roof-tarping',
    '/service-areas/south-florida/homestead/water-damage-restoration',
    '/service-areas/south-florida/jupiter',
    '/service-areas/south-florida/jupiter/commercial-restoration',
    '/service-areas/south-florida/jupiter/mold-remediation',
    '/service-areas/south-florida/miami-beach',
    '/service-areas/south-florida/miami-beach/kitchen-remodeling',
    '/service-areas/south-florida/miami-beach/leak-detection',
    '/service-areas/south-florida/miami/commercial-restoration',
    '/service-areas/south-florida/miami/kitchen-remodeling',
    '/service-areas/south-florida/miami/mold-remediation',
    '/service-areas/south-florida/pembroke-pines/roof-tarping',
    '/service-areas/south-florida/sunrise/fire-damage-restoration',
    '/service-areas/south-florida/west-palm-beach/bathroom-remodeling',
    '/service-areas/south-florida/west-palm-beach/mold-remediation',
    '/service-areas/south-florida/west-palm-beach/water-damage-restoration',
    '/service-areas/southwest-florida/fort-myers/mold-remediation',
    '/service-areas/southwest-florida/marco-island/commercial-restoration',
    '/service-areas/southwest-florida/marco-island/storm-damage-repair',
    '/service-areas/southwest-florida/naples',
    '/service-areas/southwest-florida/naples/bathroom-remodeling',
    '/service-areas/southwest-florida/naples/fire-damage-restoration',
    '/service-areas/southwest-florida/naples/kitchen-remodeling',
    '/service-areas/southwest-florida/naples/roof-tarping',
    '/service-areas/southwest-florida/naples/storm-damage-repair',
    '/service-areas/southwest-florida/naples/water-damage-restoration',
    '/service-areas/southwest-florida/punta-gorda/bathroom-remodeling',
    '/service-areas/tampa-bay/clearwater/roof-tarping',
    '/service-areas/tampa-bay/hyde-park',
    '/service-areas/tampa-bay/hyde-park/bathroom-remodeling',
    '/service-areas/tampa-bay/hyde-park/commercial-restoration',
    '/service-areas/tampa-bay/hyde-park/fire-damage-restoration',
    '/service-areas/tampa-bay/hyde-park/kitchen-remodeling',
    '/service-areas/tampa-bay/hyde-park/leak-detection',
    '/service-areas/tampa-bay/hyde-park/roof-tarping',
    '/service-areas/tampa-bay/hyde-park/storm-damage-repair',
    '/service-areas/tampa-bay/land-o-lakes/commercial-restoration',
    '/service-areas/tampa-bay/land-o-lakes/kitchen-remodeling',
    '/service-areas/tampa-bay/palm-harbor/roof-tarping',
    '/service-areas/tampa-bay/plant-city/fire-damage-restoration',
    '/service-areas/tampa-bay/plant-city/kitchen-remodeling',
    '/service-areas/tampa-bay/plant-city/roof-tarping',
    '/service-areas/tampa-bay/riverview/roof-tarping',
    '/service-areas/tampa-bay/riverview/water-damage-restoration',
    '/service-areas/tampa-bay/st-petersburg',
    '/service-areas/tampa-bay/tampa/fire-damage-restoration',
    '/service-areas/tampa-bay/tampa/roof-tarping',
    '/service-areas/tampa-bay/trinity',
    '/service-areas/tampa-bay/trinity/commercial-restoration',
    '/service-areas/tampa-bay/trinity/leak-detection',
    '/service-areas/tampa-bay/westchase',
    '/service-areas/tampa-bay/westchase/bathroom-remodeling',
    '/service-areas/tampa-bay/westchase/commercial-restoration',
    '/service-areas/tampa-bay/westchase/fire-damage-restoration',
    '/service-areas/tampa-bay/westchase/leak-detection',
    '/service-areas/tampa-bay/westchase/water-damage-restoration',
    '/service-areas/tampa-bay/zephyrhills',
    '/service-areas/tampa/whole-home-renovation',
]

rules = []
for path in missing:
    parts = [p for p in path.split('/') if p]

    if path == '/blog/blog/post':
        rules.append((path, '/resources/'))
        continue
    if path == '/restoration/mitigation-services/water-mitigation/pompano-beach':
        rules.append((path, '/restoration/water-damage/'))
        continue

    if parts[0] == 'service-areas' and len(parts) >= 3 and parts[1] in REGIONS:
        city = parts[2]
        if len(parts) == 4:
            service = parts[3]
            dest = dest_for_city_service(city, service)
        else:
            dest = dest_for_city_only(city)
        rules.append((path, dest))
        continue

    if parts[0] == 'service-areas' and len(parts) == 3 and parts[1] not in REGIONS:
        city = parts[1]
        service = parts[2]
        dest = dest_for_city_service(city, service)
        rules.append((path, dest))
        continue

    rules.append((path, '/restoration/'))

print('# --- Missing redirect patch (' + str(len(rules)) + ' rules) ---')
for src, dst in rules:
    print(src + ' ' + dst + ' 301')
    print(src + '/ ' + dst + ' 301')
