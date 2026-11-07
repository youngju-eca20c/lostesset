"""Build the data contract and individually editable native SVG parts for Sera 06."""
from pathlib import Path
from copy import deepcopy
import hashlib, json, re, xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
base = root / 'site/assets/characters/sera'
file = base / 'sera-master.svg'
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
q = lambda t: '{' + NS + '}' + t
svg = ET.parse(file).getroot()
parents = {c: p for p in svg.iter() for c in p}
definitions = [deepcopy(c) for d in svg.iter(q('defs')) for c in d]
entities = [e for e in svg.iter() if e.get('data-part')]
by_id = {e.get('id'): e for e in svg.iter() if e.get('id')}
out = base / 'parts'
out.mkdir(exist_ok=True)
prior_files=set()
if (out/'manifest.json').is_file():
    prior_files=set(json.loads((out/'manifest.json').read_text(encoding='utf-8')).get('files',[]))
# Known generated names retired by the unique eyebrow-anchor correction.
prior_files.update({'sera-brow-left.svg','sera-brow-right.svg','sera-braid-lower.svg'})

def ancestor_part(e):
    p = parents.get(e)
    while p is not None:
        if p.get('data-part') and p.get('id'): return p.get('id')
        p = parents.get(p)
    return None

def no_defs(e):
    for c in list(e):
        if c.tag == q('defs'): e.remove(c)
        else: no_defs(c)

records = []
for index, element in enumerate(entities):
    identifier = element.get('id')
    if not identifier: raise ValueError('Part without ID')
    fragment = ET.Element(q('svg'), {'width':'600','height':'940','viewBox':'0 70 600 940'})
    defs = ET.SubElement(fragment, q('defs'))
    defs.extend(deepcopy(definitions))
    chain=[]; p=parents.get(element)
    while p is not None and p is not svg:
        chain.append(p);p=parents.get(p)
    holder=fragment
    for ancestor in reversed(chain):
        attrs={k:v for k,v in ancestor.attrib.items() if k in {'transform','clip-path','mask','opacity','fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','style'}}
        if attrs: holder=ET.SubElement(holder,q('g'),attrs)
    clone=deepcopy(element);no_defs(clone)
    if clone.get('style') and 'display:none' in clone.get('style').replace(' ',''):
        clone.set('style',re.sub(r'display\s*:\s*none','display:inline',clone.get('style')))
    if clone.get('display')=='none': clone.set('display','inline')
    holder.append(clone)
    partfile=out/(identifier+'.svg')
    ET.ElementTree(fragment).write(partfile,encoding='utf-8',xml_declaration=True)
    parent=ancestor_part(element)
    if identifier in {'sera-hair-back','sera-halo','sera-bow'}: parent='sera-head'
    if identifier.startswith('sera-eye-') and identifier.endswith('-lids'): parent=identifier[:-5]
    if identifier in {'sera-hand-right','sera-wrist-right'}: parent='sera-arm-right-lower'
    pivot=element.get('data-pivot')
    space=element.get('data-space')
    a=parents.get(element)
    while not space and a is not None:
        space=a.get('data-space');a=parents.get(a)
    records.append({'id':identifier,'svgId':identifier,'label':element.get('data-label',element.get('data-part')),'parent':parent,'pivot':[float(v) for v in pivot.split()] if pivot else None,'pivotSpace':space or 'source-frame','paintOrder':index,'path':'parts/'+identifier+'.svg','colorLayers':len(element.findall('.//*[@data-role="color"]')),'lineLayers':len(element.findall('.//*[@data-role="line"]'))})

current_files={r['id']+'.svg' for r in records}
for name in prior_files-current_files:
    stale=(out/name).resolve()
    if stale.parent!=out.resolve() or not name.startswith('sera-') or stale.suffix!='.svg':raise ValueError('Invalid generated part path')
    if stale.is_file():stale.unlink()
(out/'manifest.json').write_text(json.dumps({'files':sorted(current_files),'masterSHA256':hashlib.sha256(file.read_bytes()).hexdigest()},indent=2),encoding='utf-8')

joint_specs=[
 ('torso','sera-torso','상체',[286,642],-2,2),
 ('head','sera-head','머리',[302,528],-4,4),
 ('shoulder-right','sera-arm-right-upper','오른쪽 어깨',[253,582],-4,4),
 ('elbow-right','sera-arm-right-lower','오른쪽 팔꿈치',[204,635],-5,5),
 ('wrist-right','sera-hand-right','오른쪽 손목',[208,575],-5,5),
 ('shoulder-left','sera-arm-left-upper','왼쪽 어깨',[374,588],-12,12),
 ('elbow-left','sera-arm-left-lower','왼쪽 팔꿈치',[401,672],-14,14),
 ('wrist-left','sera-hand-left','왼쪽 손목',[426,715],-12,12),
 ('hip-right','sera-leg-right-upper','오른쪽 고관절',[252,754],-4,4),
 ('knee-right','sera-leg-right-lower','오른쪽 무릎',[252,824],-5,5),
 ('ankle-right','sera-foot-right','오른쪽 발목',[264,915],-3,3),
 ('hip-left','sera-leg-left-upper','왼쪽 고관절',[319,754],-4,4),
 ('knee-left','sera-leg-left-lower','왼쪽 무릎',[319,824],-5,5),
 ('ankle-left','sera-foot-left','왼쪽 발목',[335,915],-3,3),
 ('hair-back','sera-hair-back','뒷머리',[351,466],-1.2,1.2),
 ('hair-lock-right','sera-hair-back-right-lock','오른쪽 머리 컬',[185,549],-2,2),
 ('hair-lock-left','sera-hair-back-left-lock','왼쪽 머리 컬',[431,527],-2,2),
 ('halo','sera-halo','헤일로',[297,194],-1.5,1.5),
 ('bow','sera-bow','리본',[462,482],-2,2),
 ('bow-tail','sera-bow-tail','리본 꼬리',[462,490],-4,4),
 ('braid','sera-braid','땋은 머리',[446,292],-1.2,1.2),
]
joints=[{'id':i,'svgId':s,'label':label,'pivot':pivot,'min':lo,'max':hi,'default':0,'units':'degrees'}for i,s,label,pivot,lo,hi in joint_specs]
for j in joints:
    if j['svgId'] not in by_id:raise ValueError('Missing joint '+j['svgId'])
followers=[{'svgId':e.get('id'),'sourceId':e.get('data-follow')}for e in svg.iter() if e.get('data-follow')]
if 'sera-shoulder-left' in by_id: followers.append({'svgId':'sera-shoulder-left','sourceId':'sera-arm-left-upper'})
rig={'schemaVersion':'1.0.0','character':{'id':'sera','name':'Sera','version':'1.0.0','reference':'06 largest figure'},'viewBox':[0,70,600,940],'coordinateSystem':{'origin':'original sheet pixel frame','sides':'anatomical; character left appears on screen-right','pivotSpace':'absolute rest artwork coordinates nested in SVG transforms'},'source':'sera-master.svg','parts':records,'joints':joints,'renderFollowers':followers,'blink':{'eyes':[{'apertureId':f'sera-eye-{s}-aperture','openLashId':f'sera-eye-{s}-lash-open','lowerLineId':f'sera-eye-{s}-lower-line','closedId':f'sera-eye-{s}-closed','pivot':[0,0],'space':'local'}for s in ['right','left']]},'limitations':['This is the large reference pose, not a turnable 3D model.','Conservative controls demonstrate breathing, blinking, speaking and small gestures. Large actions require new key drawings.','Hand-at-chin artwork is attached to the right arm through explicit render followers.','Current expression set is a small production starter, not the full reference-sheet acting library.'],'masterSHA256':hashlib.sha256(file.read_bytes()).hexdigest()}
expressions={'schemaVersion':'1.0.0','defaultExpression':'haughty','expressions':[
 {'id':'haughty','label':'도도함','mouth':'rest','blink':0,'nodes':{}},
 {'id':'joy','label':'기쁨','mouth':'smile','blink':1,'nodes':{'sera-eye-right-closed':{'d':'M-54 1 Q-15-22 30-11'},'sera-eye-left-closed':{'d':'M-48 6 Q-4-21 40-14'}}},
 {'id':'sleepy','label':'졸림','mouth':'rest','blink':1,'nodes':{}}
 ],'mouths':[{'id':i,'label':label,'svgId':'sera-mouth-'+i}for i,label in [('rest','기본 미소'),('a','A / 아'),('i','I / 이'),('u','U / 우'),('o','O / 오'),('smile','웃음'),('sad','슬픔')]]}
for name,data in [('rig.json',rig),('expressions.json',expressions)]:
    (base/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'parts':len(records),'joints':len(joints),'followers':len(followers),'source':'06 largest figure'},ensure_ascii=False))
