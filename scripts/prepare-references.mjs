import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require(process.env.CODEX_NODE_MODULES?path.join(process.env.CODEX_NODE_MODULES,'sharp'):'sharp');
const refs=[['sera','06. 세라 옵저버 유닛 캐릭터 시트.png'],['rize','07. 리제 캐릭터 디자인 시트.png'],['knife','08. 나이프 필드 엔지니어 레퍼런스 시트.png']];
await fs.mkdir('site/assets/references',{recursive:true});await fs.mkdir('review/head',{recursive:true});
for(const [id,name]of refs){const bytes=await fs.readFile(path.join('..',name));await fs.writeFile(`site/assets/references/${id}-sheet.png`,bytes);await sharp(bytes).resize({width:1024}).webp({quality:88}).toFile(`site/assets/references/${id}-sheet.webp`);if(id!=='sera'){const top=id==='knife'?150:120;await sharp(bytes).extract({left:40,top,width:550,height:1000-top}).resize({height:760}).webp({quality:88}).toFile(`site/assets/references/${id}-portrait.webp`);}}
await sharp(await fs.readFile('../06. 세라 옵저버 유닛 캐릭터 시트.png')).extract({left:80,top:210,width:460,height:350}).resize(920,700).png().toFile('review/head/source-head.png');
await sharp(await fs.readFile('../06. 세라 옵저버 유닛 캐릭터 시트.png')).extract({left:0,top:70,width:600,height:940}).png().toFile('review/sera-large-reference.png');
console.log('Staged original reference sheets and web previews.');
