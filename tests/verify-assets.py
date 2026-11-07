from pathlib import Path
from collections import Counter
import hashlib, json, re, xml.etree.ElementTree as ET

root=Path(__file__).resolve().parents[1]
site=root/'site'
base=site/'assets/characters/sera'
issues=[]
files=[base/'sera-master.svg',*sorted((base/'parts').glob('*.svg'))]
for file in files:
    try: tree=ET.parse(file).getroot()
    except ET.ParseError as e:
        issues.append(f'{file.name}: {e}');continue
    ids=[e.get('id')for e in tree.iter() if e.get('id')]
    duplicates=[id for id,n in Counter(ids).items()if n>1]
    if duplicates:issues.append(f'{file.name}: duplicate IDs {duplicates}')
    for e in tree.iter():
        if e.tag.split('}')[-1] in {'image','feImage','foreignObject','script'}:issues.append(f'{file.name}: raster or executable element')
        for key,value in e.attrib.items():
            for ref in re.findall(r'url\(#([^\)]+)\)',value):
                if ref not in ids:issues.append(f'{file.name}: missing ref {ref}')
            if key.split('}')[-1]=='href' and not value.startswith('#'):issues.append(f'{file.name}: external resource')

master=ET.parse(base/'sera-master.svg').getroot()
ids={e.get('id')for e in master.iter() if e.get('id')}
assert master.get('viewBox')=='0 70 600 940'
rig=json.loads((base/'rig.json').read_text(encoding='utf-8'))
presets=json.loads((base/'expressions.json').read_text(encoding='utf-8'))
assert hashlib.sha256((base/'sera-master.svg').read_bytes()).hexdigest()==rig['masterSHA256']
for part in rig['parts']:
    if part['id'] not in ids:issues.append('Missing part '+part['id'])
    if not (base/part['path']).is_file():issues.append('Missing part file '+part['path'])
    if part['parent'] and part['parent'] not in ids:issues.append('Missing parent '+part['parent'])
expected_parts={Path(part['path']).name for part in rig['parts']}
for file in (base/'parts').glob('*.svg'):
    if file.name not in expected_parts:issues.append('Unregistered generated part '+file.name)
for joint in rig['joints']:
    if joint['svgId'] not in ids:issues.append('Missing joint '+joint['svgId'])
    assert joint['min']<=joint['default']<=joint['max']
for follower in rig['renderFollowers']:
    if follower['svgId'] not in ids or follower['sourceId'] not in ids:issues.append('Missing follower '+str(follower))
for e in rig['blink']['eyes']:
    for k in ['apertureId','openLashId','lowerLineId','closedId']:
        if e[k] not in ids:issues.append('Missing blink channel '+e[k])
for expression in presets['expressions']:
    for id in expression['nodes']:
        if id not in ids:issues.append('Missing expression channel '+id)
for mouth in presets['mouths']:
    if mouth['svgId'] not in ids:issues.append('Missing mouth '+mouth['svgId'])
catalog=json.loads((site/'assets/catalog.json').read_text(encoding='utf-8'))
for asset in catalog['assets']:
    for key in ['art','thumbnail','reference','rig','expressions']:
        if asset.get(key) and not(site/asset[key]).is_file():issues.append('Missing catalog file '+asset[key])
    if asset['id']!='sera' and asset['status']!='reference':issues.append('Future character marked as finished')
roles=Counter(e.get('data-role')for e in master.iter()if e.get('data-role'))
assert roles['color']>40 and roles['line']>40
for name in ['index.html','styles.css','app.js']:
    if not(site/name).is_file():issues.append('Missing site '+name)
report={'passed':not issues,'masterSHA256':rig['masterSHA256'],'SVGsChecked':len(files),'parts':len(rig['parts']),'joints':len(rig['joints']),'colorGroups':roles['color'],'lineGroups':roles['line'],'catalogEntries':len(catalog['assets']),'issues':issues}
out=root/'tests/output';out.mkdir(exist_ok=True)
(out/'assets.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
if issues:raise SystemExit(1)
