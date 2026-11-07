// Original-sheet coordinates. Rebuilt from the LARGE character in reference 06.
const INK='#512b3b';
const g=(id,label,pivot,b,extra='')=>`<g id="sera-${id}" data-part="${id}" data-label="${label}" data-pivot="${pivot.join(' ')}" ${extra}>${b}</g>`;
const p=(d,fill,extra='')=>`<path d="${d}" fill="${fill}" stroke="none" ${extra}/>`;
const l=(d,c=INK,w=3)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const s=(d,fill,w=5.5)=>`<g data-role="color">${p(d,fill)}</g><g data-role="line">${l(d,INK,w)}</g>`;
const el=(x,y,rx,ry,fill)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
export const headDefs=`<defs>
 <linearGradient id="sera-hair-front-paint" x1=".15" y1="0" x2=".85" y2="1"><stop stop-color="#fff8f2"/><stop offset=".45" stop-color="#ffecea"/><stop offset="1" stop-color="#efcbd4"/></linearGradient>
 <linearGradient id="sera-face-paint" x1=".2" y1="0" x2=".8" y2="1"><stop stop-color="#fff7ef"/><stop offset="1" stop-color="#ffeae6"/></linearGradient>
 <radialGradient id="sera-cheek-paint"><stop stop-color="#ffb0b5" stop-opacity=".62"/><stop offset="1" stop-color="#ffb7bf" stop-opacity="0"/></radialGradient>
 <linearGradient id="sera-iris-paint" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#56416c"/><stop offset=".42" stop-color="#8862b8"/><stop offset="1" stop-color="#bb79df"/></linearGradient>
</defs>`;

const eyeDrawings={
 right:{origin:[233,455],white:'M-50-5 C-29-13-4-17 20-18 L25 13 L-9 23 C-27 23-42 11-50-5Z',iris:'M-14-14 C-5-17 8-19 17-16 L22 11 Q6 18-6 21 C-12 9-14-2-14-14Z',pupil:[9,-1,3.4,7.8],glint:[5,-10,3.3,3.4]},
 left:{origin:[356,422],white:'M-54-2 C-28-13 7-21 30-22 C32-9 29 9 22 18 L-19 27 C-36 24-46 13-54-2Z',iris:'M-26-14 C-12-19 11-24 22-21 C26-7 27 10 21 18 L-18 26 C-24 15-27 0-26-14Z',pupil:[5,-1,3.6,9.2],glint:[-3,-14,3.5,3.6]}
};
function eyeInterior(side){const e=eyeDrawings[side];return g(`eye-${side}`,side==='left'?'왼쪽 눈':'오른쪽 눈',[0,0],
 `<defs><clipPath id="sera-eye-${side}-clip"><path id="sera-eye-${side}-clip-shape" d="${e.white}"/></clipPath><clipPath id="sera-eye-${side}-iris-clip"><path d="${e.iris}"/></clipPath></defs>`
 +`<g id="sera-eye-${side}-aperture" data-part="eye-aperture" clip-path="url(#sera-eye-${side}-clip)">`
 +`<g id="sera-eye-${side}-sclera" data-part="sclera" data-role="color">${p(e.white,'#fffaf9')}${p(side==='right'?'M-52-7Q-15-27 24-20L26-6Q-10-9-44 5Z':'M-56-3Q-12-32 33-25L33-8Q-12-11-53 12Z','#dac7d4')}</g>`
 +g(`eye-${side}-iris`,'보라색 홍채',[0,0],
  s(e.iris,'url(#sera-iris-paint)',3.1)
  +`<g clip-path="url(#sera-eye-${side}-iris-clip)"><g data-role="color">`
  +p(side==='right'?'M-16 8Q0-4 22 4L23 14L-7 25Z':'M-28 10Q-3-7 24 3L24 21L-19 29Z','#b877dc')
  +p(side==='right'?'M-6 19Q4 4 22 9L21 13L-5 23Z':'M-18 24Q-4 7 22 14L21 19L-17 28Z','#c98deb')
  +`<ellipse id="sera-eye-${side}-pupil" data-part="pupil" cx="${e.pupil[0]}" cy="${e.pupil[1]}" rx="${e.pupil[2]}" ry="${e.pupil[3]}" fill="#5b3678"/>`
  +g(`eye-${side}-glints`,'눈 반사광',[0,0],el(...e.glint,'#fff9fb')+p(side==='right'?'M-19 3Q-13-1-9 2L-8 5Q-14 9-18 8Z':'M-31 1Q-23-4-19-1L-18 3Q-25 8-29 6Z','#fffafb'))
  +'</g></g>')+'</g>',`transform="translate(${e.origin.join(' ')})" data-origin="${e.origin.join(' ')}" data-space="eye-local"`);}

function eyeLines(side){const e=eyeDrawings[side],right=side==='right';return g(`eye-${side}-lids`,side==='left'?'왼쪽 눈꺼풀과 속눈썹':'오른쪽 눈꺼풀과 속눈썹',[0,0],
 `<g id="sera-eye-${side}-lash-open" data-part="open-eyelid" data-role="color">`
 +p(right?'M-82-12 C-56-13-34-20-9-24 L38-32 L51-29 L33-24 C10-20-16-13-43-2 L-37 14 Q-51 9-57-1 C-67-3-77-7-82-12Z':'M-59-9 C-36-25-8-30 19-34 L74-40 L56-23 L44-18 C39-2 34 8 23 19 L28-11 C1-6-24 3-48 10 L-56 6 L-47-2Z','#4c2738')
 +p(right?'M-53-17Q-19-28 31-29Q9-23-15-18L-46-7Z':'M-50-8Q-15-26 31-29L41-25Q0-19-48 5Z','#654356','opacity=".7"')
 +'</g>'
 +`<g id="sera-eye-${side}-lower-line" data-role="line">${l(right?'M-9 23 Q8 20 25 13':'M-19 27Q3 23 22 18','#86566f',2.1)}</g>`
 +`<path id="sera-eye-${side}-closed" data-part="closed-eyelid" d="${right?'M-57-1 Q-14 19 32-12':'M-50 6Q-4 20 42-14'}" fill="none" stroke="#4c2738" stroke-width="5.5" stroke-linecap="round" display="none"/>`,
 `transform="translate(${e.origin.join(' ')})" data-origin="${e.origin.join(' ')}" data-space="eye-local"`);}

export function headBaseMarkup(){return g('head-base','머리와 얼굴 바탕',[302,528],
 g('hair-cap','머리 바탕',[300,269],
  s('M114 374 C130 331 168 285 211 261 C238 240 269 232 293 241 C312 213 345 215 373 224 C429 237 481 277 502 322 C521 357 528 394 518 430 C509 464 488 491 462 507 C429 526 393 536 352 539 L196 545 C155 543 117 516 101 480 C84 439 87 411 114 374Z','url(#sera-hair-front-paint)',5.6)
  +`<g data-role="color">${p('M352 231 C406 237 459 272 483 309 C455 294 430 282 408 280 C391 258 373 242 352 231Z','#f8dcde')}${p('M477 320C511 357 515 393 501 426L485 451C496 411 487 374 477 349Z','#e0afc3')}</g>`)
 +g('ear-left','왼쪽 귀',[460,466],s('M442 438 C458 426 477 437 477 455 C480 474 465 487 447 490 L438 472Z','#ffe6e1',4)+p('M449 448C460 438 470 451 467 461Q464 474 452 477C458 466 453 461 448 464Z','#eea7b4'))
 +g('face','얼굴 지지면',[292,444],s('M179 335 C219 290 291 282 344 294 C394 303 429 339 438 374 C451 412 427 461 410 482 C400 500 381 509 354 516 C318 531 270 535 237 527 C211 526 189 514 172 501 C152 489 142 466 145 438 C145 399 157 363 179 335Z','url(#sera-face-paint)',4.8)
  +p('M148 444C157 488 190 514 238 521Q293 538 348 515C317 535 270 537 237 530C187 521 151 494 145 466Z','#f7d8dd'))
 +g('cheek-right','오른쪽 볼',[202,487],el(201,486,34,25,'url(#sera-cheek-paint)')+l('M186 481L182 490 M199 480L194 491 M211 479L208 489','#efacb0',2.3))
 +g('cheek-left','왼쪽 볼',[370,464],el(372,464,35,25,'url(#sera-cheek-paint)')+l('M359 462L355 473 M372 460L368 471 M384 458L380 469','#efa7b0',2.3))
 +g('brow-right-anchor','오른쪽 눈썹',[217,375],`<g data-role="line"><path id="sera-brow-right" d="M188 378 Q217 363 241 374" fill="none" stroke="#aa7d8a" stroke-width="2.7" stroke-linecap="round"/></g>`)
 +g('brow-left-anchor','왼쪽 눈썹',[328,351],`<g data-role="line"><path id="sera-brow-left" d="M301 358Q327 339 349 344" fill="none" stroke="#a67a88" stroke-width="2.7" stroke-linecap="round"/></g>`)
 +eyeInterior('right')+eyeInterior('left')
 +g('mouth','입',[289,482],
  `<g id="sera-mouth-rest" data-mouth="rest" data-role="line">${l('M274 483Q279 488 286 482Q291 478 297 481Q302 481 304 475','#ef9fa5',3.2)}</g>`
  +`<g id="sera-mouth-a" data-mouth="a" style="display:none">${s('M279 478Q291 474 301 479Q302 495 291 497Q279 496 279 478Z','#a95e77',2.5)}${p('M284 492Q292 487 298 492L296 495Q290 498 284 492Z','#f0b1bd')}</g>`
  +`<g id="sera-mouth-i" data-mouth="i" style="display:none">${s('M276 481Q290 478 303 480L301 490Q288 493 279 489Z','#fff9fa',2.4)}</g>`
  +`<g id="sera-mouth-u" data-mouth="u" style="display:none">${s('M287 480C297 476 301 492 291 494C282 496 279 483 287 480Z','#a95e77',2.3)}</g>`
  +`<g id="sera-mouth-o" data-mouth="o" style="display:none">${s('M290 477C306 477 305 500 291 500C276 499 276 478 290 477Z','#a95e77',2.4)}</g>`
  +`<g id="sera-mouth-smile" data-mouth="smile" style="display:none">${s('M276 478Q292 485 307 476C303 495 283 502 276 478Z','#a95e77',2.5)}${p('M279 480Q292 485 303 480L300 485Q289 490 279 480Z','#fff9fa')}</g>`
  +`<g id="sera-mouth-sad" data-mouth="sad" style="display:none">${l('M278 490Q291 479 303 487','#ce8b9c',3)}</g>`
 ));}

export function frontHairMarkup(){return g('hair-front','앞머리와 얼굴 옆머리',[292,270],
 g('hair-side-right','오른쪽 옆머리',[197,330],s('M227 272 C197 286 168 323 149 357 C132 392 120 427 119 460 C106 482 113 512 134 528 C145 540 162 545 178 543 C160 537 153 525 151 510 C163 526 181 536 198 534 C182 526 172 514 171 500 C186 506 200 505 214 499 C194 498 180 489 174 478 C178 488 186 493 193 491 C171 471 164 448 166 422 C168 388 190 342 213 313Z','url(#sera-hair-front-paint)',5.4)
  +p('M123 468C117 497 131 523 153 530C141 512 141 491 149 475L159 488Q174 518 192 524C169 518 158 494 156 474Z','#d9adbf')
  +p('M138 413C139 378 167 329 189 308Q171 350 156 390L151 423Q143 433 138 413Z','#fff8f1')
  +l('M132 471Q122 506 147 526','#fcefe9',4))
 +g('hair-side-left','왼쪽 옆머리',[420,328],s('M316 246 C357 244 396 272 419 306 C444 346 450 397 440 438 C432 472 409 497 387 511 C402 512 413 507 425 500 C417 525 396 538 376 535 C361 534 350 529 351 522 C376 511 389 496 395 476 C404 454 408 426 401 399 C392 362 377 329 358 310Z','url(#sera-hair-front-paint)',5.4)
  +p('M427 350C441 390 433 435 418 460C409 484 389 507 370 519Q385 522 398 516C422 501 436 474 442 443C451 405 446 376 432 345Z','#edc1ce')
  +p('M417 322C435 354 439 392 433 416Q426 421 424 409C428 377 416 349 406 331Z','#fff8f3')
  +l('M415 427Q413 479 384 503','#d3a0b6',2.8))
 +g('hair-bang-right','오른쪽 앞머리',[276,269],s('M281 270 C255 258 231 268 214 292 C195 313 181 344 176 373 C172 394 175 413 186 423 C202 422 219 414 232 401 C219 416 204 426 188 430 C215 432 243 425 263 412 C282 392 290 356 290 319Z','url(#sera-hair-front-paint)',5.3)
  +p('M208 322C218 289 241 273 264 271C249 292 244 312 242 332Q221 345 208 322Z','#fae1df')
  +p('M194 353Q204 337 216 335Q218 353 232 348Q228 373 213 378C199 386 195 373 194 353Z','#fff9f1')
  +p('M181 384Q188 401 198 399Q215 395 224 386C218 406 202 417 187 419Q178 408 181 384Z','#f4d1d7'))
 +g('hair-bang-center','가운데 앞머리',[283,268],s('M283 268 C258 267 238 285 231 314 C220 348 225 379 244 402 C255 414 270 425 288 433 C279 421 276 412 276 400 C289 421 302 433 316 430 C306 418 304 405 304 391 C304 363 304 333 302 310 C299 289 294 276 283 268Z','url(#sera-hair-front-paint)',4.8)
  +p('M232 333C229 361 235 389 252 409L270 424C251 403 247 379 247 353Z','#e7b9c7')
  +p('M240 314C250 289 266 277 283 275Q297 295 300 313C288 329 273 327 270 317Q257 331 240 323Z','#fbe5e1')
  +p('M233 329C232 346 233 358 241 360Q254 366 268 351L271 328C260 339 253 340 248 333Q239 343 233 329Z','#fffbf3')
  +p('M275 327L285 324L285 349Q277 360 275 352Z','#fffaf3')
  +l('M299 351Q301 387 303 401','#d4a2b4',2))
 +g('hair-bang-left','왼쪽 앞머리',[300,267],s('M300 267 C312 239 331 221 347 223 C381 227 404 255 420 284 C456 318 470 357 470 392 C455 375 444 362 428 350 C419 326 403 300 384 287 C399 314 407 346 410 373 C406 390 403 405 398 418 C366 414 339 399 322 378 C304 356 298 330 299 309Z','url(#sera-hair-front-paint)',5.4)
  +p('M313 256C331 233 351 232 367 243C390 256 405 278 409 294Q394 303 381 289C369 277 363 266 352 262Q333 273 313 256Z','#fae0dd')
  +p('M308 280Q318 296 332 295Q348 298 358 281Q366 303 380 301Q386 314 394 332Q369 343 349 325C331 327 319 311 308 280Z','#fff9f0')
  +p('M312 338C329 373 362 403 397 414C371 410 345 395 326 376C316 362 309 348 312 338Z','#f1cbd3')
  +p('M404 306Q424 316 437 336Q431 339 427 335Q414 322 405 321Z','#fff7f1'))
 +g('hair-roots','머리 가르마 음영',[289,269],s('M225 290C244 273 266 259 282 267Q288 270 292 274C269 270 244 278 225 290Z','#c39aac',1.8)+s('M303 265Q318 244 330 252Q349 258 362 274C344 265 322 260 303 265Z','#c39aac',1.8))
 +g('hair-flyaway','오른쪽 바깥 머리다발',[185,306],s('M219 270 C178 296 141 333 121 375 C104 410 95 450 105 472 C87 464 88 443 96 421 C116 367 165 302 219 270Z','url(#sera-hair-front-paint)',5.1))
 );}
export function eyeForegroundMarkup(){return eyeLines('right')+eyeLines('left');}
export const eyeOrigins={left:[356,422],right:[233,455]};
