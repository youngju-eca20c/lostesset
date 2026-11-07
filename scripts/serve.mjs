import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('site'),port=Number(process.env.PORT||4190);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.png':'image/png','.webp':'image/webp'};
http.createServer(async(req,res)=>{try{let uri=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(uri==='/lostesset')uri='/';else if(uri.startsWith('/lostesset/'))uri=uri.slice('/lostesset'.length);if(uri.endsWith('/'))uri+='index.html';const file=path.resolve(root,'.'+uri),relative=path.relative(root,file);if(relative.startsWith('..')||path.isAbsolute(relative)){res.writeHead(403);res.end();return;}const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`LOST archive: http://127.0.0.1:${port}/lostesset/`));
