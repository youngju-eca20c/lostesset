import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {headDefs,headBaseMarkup,frontHairMarkup,eyeForegroundMarkup} from './sera/head.mjs';
import {bodyDefs,lowerBodyMarkup,torsoMarkup,raisedHandMarkup} from './sera/body.mjs';
import {accessoriesDefs,rearHairMarkup,haloMarkup,braidMarkup,bowMarkup,sparkleMarkup} from './sera/accessories.mjs';
const out='site/assets/characters/sera';await fs.mkdir(out,{recursive:true});
const source=await fs.readFile('site/assets/references/sera-sheet.png');
const metadata={project:'LOST',character:'sera',version:'1.0.0',source:'06. 세라 옵저버 유닛 캐릭터 시트.png',sourceSHA256:createHash('sha256').update(source).digest('hex'),figure:'largest illustration on the left',sourceFrame:[0,70,600,940],artwork:'native authored Bézier paths with separate color and ink groups',pose:'reference chin-hand pose'};
const body=`<g id="sera-ground-shadow" data-part="ground-shadow" data-label="발밑 그림자"><ellipse cx="290" cy="976" rx="195" ry="21" fill="#d9c8df"/></g>
<g id="sera-root" data-part="root" data-label="세라" data-pivot="294 983">
 <g id="sera-rear-torso-follow" data-follow="sera-torso"><g id="sera-rear-head-follow" data-follow="sera-head">${rearHairMarkup()}${haloMarkup()}${bowMarkup()}</g></g>
 ${lowerBodyMarkup()}
 ${torsoMarkup()}
 <g id="sera-head-torso-follow" data-follow="sera-torso"><g id="sera-head" data-part="head" data-label="머리" data-pivot="302 528">${headBaseMarkup()}${frontHairMarkup()}${braidMarkup()}${eyeForegroundMarkup()}</g></g>
 <g id="sera-hand-torso-follow" data-follow="sera-torso"><g id="sera-hand-upper-follow" data-follow="sera-arm-right-upper"><g id="sera-hand-lower-follow" data-follow="sera-arm-right-lower">${raisedHandMarkup()}</g></g></g>
 ${sparkleMarkup()}
</g>`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" id="sera-master" width="600" height="940" viewBox="0 70 600 940" role="img" aria-labelledby="sera-title sera-desc"><title id="sera-title">Sera — LOST / reference 06 master</title><desc id="sera-desc">06번 시트의 가장 큰 세라를 기준으로 그린 벡터 원화. 원본의 비율, 기울기, 턱에 손을 댄 자세를 유지한다. 색 면과 외곽선 및 애니메이션 파츠가 분리되어 있다.</desc><metadata>${JSON.stringify(metadata).replaceAll('&','&amp;')}</metadata>${headDefs}${bodyDefs}${accessoriesDefs}${body}</svg>`;
await fs.writeFile(out+'/sera-master.svg',svg);
await fs.writeFile(out+'/source.json',JSON.stringify(metadata,null,2));
console.log(`Built Sera 06: ${(svg.match(/<path\b/g)||[]).length} paths, ${(svg.match(/data-part=/g)||[]).length} semantic parts.`);
