// Sera 06: largest drawing only. Native authored curves in sheet coordinates.
// Every part keeps closed color surfaces and independent visible line paths.
const INK='#583444';
const C=(d,fill,extra='')=>`<path d="${d}" fill="${fill}" stroke="none" ${extra}/>`;
const L=(d,width=5.5,color=INK,extra='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const G=(id,label,pivot,content,extra='')=>`<g id="${id}" data-part="${id.replace(/^sera-/,'')}" data-label="${label}" data-pivot="${pivot.join(' ')}" ${extra}>${content}</g>`;
const part=(id,label,pivot,d,fill,colors='',lines='',width=5.5,extra='')=>G(id,label,pivot,
 `<g data-role="color">${C(d,fill,extra)}${colors}</g><g data-role="line">${L(d,width)}${lines}</g>`);
const BOW_LOOP='M469 434 C493 422 530 426 553 435 C568 441 568 451 562 467 C557 481 549 492 545 507 C542 522 537 544 527 548 C518 551 509 541 500 533 L471 506 L457 470Z';

export const accessoriesDefs=`<defs>
 <linearGradient id="sera-hair-back-paint" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#fff6ef"/><stop offset=".52" stop-color="#ffe5e1"/><stop offset="1" stop-color="#e9bdc8"/></linearGradient>
 <linearGradient id="sera-hair-lock-paint" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#fff6f1"/><stop offset=".5" stop-color="#ffe9e3"/><stop offset="1" stop-color="#f0cad2"/></linearGradient>
 <linearGradient id="sera-bow-paint" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#6c6596"/><stop offset=".55" stop-color="#5e5b91"/><stop offset="1" stop-color="#4d497b"/></linearGradient>
 <linearGradient id="sera-ring-metal" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#fffaf5"/><stop offset=".55" stop-color="#fff0ec"/><stop offset="1" stop-color="#d4c1dd"/></linearGradient>
 <linearGradient id="sera-ring-blue-wall" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#566ba8"/><stop offset=".5" stop-color="#8eacec"/><stop offset="1" stop-color="#5c4c90"/></linearGradient>
 <linearGradient id="sera-gold-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe9b3"/><stop offset=".5" stop-color="#ffd293"/><stop offset="1" stop-color="#e4ab7c"/></linearGradient>
 <linearGradient id="sera-orbit-paint" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#8aa3ff"/><stop offset=".5" stop-color="#96c8ff"/><stop offset="1" stop-color="#8ba7ff"/></linearGradient>
 <linearGradient id="sera-halo-gem-paint" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#a2d6ff"/><stop offset=".5" stop-color="#75a1fb"/><stop offset="1" stop-color="#726cc2"/></linearGradient>
 <clipPath id="sera-bow-loop-clip"><path d="${BOW_LOOP}"/></clipPath>
</defs>`;

export function rearHairMarkup(){
 const left='M199 477 C195 522 174 555 145 577 C115 598 81 616 62 639 C43 661 43 681 60 693 C72 702 82 701 91 699 C63 718 51 731 35 755 C18 780 23 811 48 824 C57 828 65 830 70 825 C66 815 67 806 70 801 C75 823 100 846 123 851 C150 863 183 857 206 836 L259 744 L278 577Z';
 const right='M384 382 C427 371 461 416 452 483 C443 542 470 583 497 609 C538 647 577 690 565 733 C561 757 543 768 522 758 C538 784 546 815 537 841 C531 866 505 882 478 880 C468 883 474 873 478 864 C484 850 489 836 484 823 C476 851 458 866 438 869 C421 870 407 853 405 836 L361 719 L357 538Z';
 const leftLock='M196 515 C179 555 154 585 122 610 C94 631 81 645 75 660 C67 678 79 690 96 691 C106 689 115 683 120 676 C111 698 130 714 153 711 C175 709 184 697 192 682 C175 697 153 691 147 678 C134 653 160 614 178 589 C196 558 210 540 216 519Z';
 const rightLock='M433 478 C440 520 447 552 472 580 C497 608 524 645 531 674 C534 693 530 711 519 728 C503 753 479 766 451 765 C467 781 491 779 508 768 C530 755 543 733 540 713 C537 701 530 691 521 686 C528 711 512 737 489 748 C464 761 445 759 433 744 C414 713 405 643 402 540Z';
 return G('sera-hair-back','긴 뒷머리',[351,466],
  part('sera-hair-back-right','오른쪽 뒷머리',[193,504],left,'url(#sera-hair-back-paint)',
   C('M173 568 C150 602 113 626 100 658 C94 677 101 691 116 698 C98 704 81 696 78 683 C70 660 90 635 111 617 C139 596 159 581 173 568Z','#d4a9b8')
   +C('M160 698 C137 734 126 767 134 789 C141 810 156 821 169 820 C149 843 126 846 108 830 C92 814 89 786 98 764 C111 734 137 713 160 698Z','#d3a6b6')
   +C('M65 750 C42 775 39 801 55 814 C32 808 28 790 35 772 C42 756 52 747 65 738Z','#fff4ed'),
   L('M68 825 C82 836 98 845 118 848',3.1,'#c193a7'))
  +part('sera-hair-back-left','왼쪽 뒷머리',[429,487],right,'url(#sera-hair-back-paint)',
   C('M441 482 C445 541 465 583 496 616 C531 653 545 677 539 696 C549 683 546 658 528 637 C502 604 483 583 471 548 C461 524 460 500 458 480Z','#fff3ec')
   +C('M435 520 C427 569 445 610 464 647 C478 675 483 704 469 720 C459 733 446 734 435 727 C447 754 476 767 497 751 C514 736 513 715 501 690 C486 654 460 615 452 583Z','#c99cad')
   +C('M455 760 C472 771 485 797 484 823 C476 844 458 859 443 861 L450 870 C479 868 494 850 495 830 C497 799 482 775 469 766Z','#d4a7b7')
   +C('M525 766 C539 791 542 820 529 844 C516 862 497 871 480 873 C502 874 522 861 532 843 C547 816 539 783 525 766Z','#fff0e9'),
   L('M522 758 C511 766 499 769 487 769',3,'#b7899d'))
  +part('sera-hair-back-right-lock','오른쪽 머리 컬',[185,549],leftLock,'url(#sera-hair-lock-paint)',
   C('M188 547 C172 577 147 605 128 631 C113 651 109 668 118 679 C123 689 138 693 147 690 C129 708 103 705 95 687 C84 663 106 636 126 616 C149 596 175 567 188 547Z','#d0a2b2')
   +C('M112 620 C90 643 80 661 84 674 C87 682 94 685 101 683 C83 681 79 671 85 657 C91 643 101 630 112 620Z','#fff8ef'))
  +part('sera-hair-back-left-lock','왼쪽 머리 컬',[431,527],rightLock,'url(#sera-hair-lock-paint)',
   C('M439 538 C441 585 463 614 482 644 C499 672 509 692 501 707 C514 706 525 694 522 680 C517 653 493 628 474 608 C453 584 446 563 439 538Z','#f7dfe0')
   +C('M412 565 C402 617 407 666 425 710 C434 735 438 756 430 771 C443 769 452 752 448 735 C442 708 431 680 425 652 C417 620 417 590 424 563Z','#cea0b1'),
   L('M411 767 C415 776 421 784 430 789',3,'#d8adbc'))
 );
}

export function bowMarkup(){
 const tail='M469 480 C491 512 525 552 543 586 C547 593 540 596 531 597 C511 601 493 597 480 600 L468 601 C456 583 447 555 445 531 L447 496Z';
 const loop=BOW_LOOP;
 return G('sera-bow','머리 뒤 파란 리본',[462,482],
  part('sera-bow-tail','리본 아래 꼬리',[462,490],tail,'url(#sera-bow-paint)',
   C('M475 494 C496 527 521 561 532 591 L515 596 C506 563 483 534 465 507Z','#726b9e')
   +C('M476 503 C495 529 522 569 531 591 L519 594 C510 561 491 533 466 506Z','url(#sera-gold-metal)')
   +C('M465 509 C477 524 487 536 491 551 C494 562 488 570 483 570 C471 557 458 535 451 515Z','#4c457b'),
   L('M480 600 C493 595 508 598 521 597',2.6,'#49406c'))
  +part('sera-bow-loop','리본 오른쪽 고리',[468,465],loop,'url(#sera-bow-paint)',
   '<g clip-path="url(#sera-bow-loop-clip)">'+C('M482 443 C508 439 541 449 560 461 L555 479 C530 461 504 457 475 460Z','url(#sera-gold-metal)')
   +C('M478 448 C508 444 540 453 559 466 L557 472 C532 459 507 453 477 454Z','#ffdda0')
   +C('M470 466 C488 469 506 474 516 486 C521 492 513 499 503 496 L476 485Z','#4a4379')
   +C('M535 485 C540 481 543 476 545 474 C549 482 544 501 539 511 L530 529Z','#5b548b')+'</g>')
  +part('sera-bow-knot','리본 매듭 지지면',[462,482],
   'M450 465 C462 457 476 464 479 478 C479 491 468 500 458 495 C448 488 445 475 450 465Z','#575080',
   C('M453 468 Q467 462 473 473 Q460 471 452 477Z','#8074aa'),'',4.5)
 );
}

export function braidMarkup(){
 const loops=[
  ['root',[448,294],'M426 266 C448 270 473 292 481 311 C487 327 479 339 469 336 C447 329 433 312 426 293 C422 283 421 273 426 266Z','M430 278 C433 294 445 312 462 321 C471 327 480 325 482 320 C480 334 473 340 461 332 C442 322 430 301 430 278Z','M435 276 C447 280 461 291 467 301 C458 299 447 292 441 287Z'],
  ['upper',[470,333],'M447 310 C470 310 493 332 497 352 C502 368 491 378 480 373 C461 364 449 347 444 330 C442 320 442 314 447 310Z','M449 323 C452 343 466 358 484 365 C490 366 494 364 497 361 C493 375 485 378 473 370 C459 361 449 342 449 323Z','M452 318 C463 318 477 329 482 338 C470 335 462 332 456 326Z'],
  ['middle',[486,373],'M462 349 C486 349 506 367 508 386 C510 405 499 416 486 410 C468 402 459 386 457 369 C456 360 457 353 462 349Z','M461 362 C464 383 476 396 494 402 C500 403 505 400 508 396 C503 411 494 417 482 409 C469 400 461 383 461 362Z','M466 357 C480 357 492 367 496 378 C483 375 473 368 466 357Z'],
  ['end',[480,435],'M471 389 C492 385 511 404 511 426 C510 450 494 469 474 477 C464 481 455 483 450 482 C457 471 457 458 453 445 C449 424 456 400 471 389Z','M461 408 C464 433 477 454 495 454 C488 468 466 480 451 482 C461 467 458 452 454 440 C453 428 456 416 461 408Z','M472 399 C488 401 499 413 499 426 C486 423 476 414 472 399Z'],
 ];
 return G('sera-braid','왼쪽 땋은 머리',[446,292],loops.map(([id,pivot,d,shade,shine])=>part(`sera-braid-${id}`,'땋은 머리 '+id,pivot,d,'url(#sera-hair-lock-paint)',C(shade,'#d5aebd')+C(shine,'#fff6ef'),'',5.3)).join(''));
}

export function haloMarkup(){
 const ringOuter='M114 207 C157 165 226 141 292 128 C354 113 412 116 446 133 C472 149 473 167 449 188 C417 216 363 238 302 251 C222 269 148 266 118 253 C101 244 100 228 114 207Z';
 const ringInner='M138 217 C184 183 236 163 302 150 C359 136 411 136 434 148 C444 154 442 165 430 176 C397 197 345 218 289 232 C221 250 163 253 141 243 C127 236 126 228 138 217Z';
 const wall='M126 230 C177 248 240 241 300 226 C363 211 407 187 432 164 C444 150 444 140 433 134 C454 140 468 150 463 164 C452 193 402 220 344 241 C269 268 192 275 139 258 C123 251 118 243 126 230Z';
 const star='M285 86 L334 108 L319 126 L328 143 L306 175 L279 159 L281 139 L246 127 L259 106Z';
 return G('sera-halo','관측 궤도',[297,194],
  part('sera-halo-inner-wall','관측 고리 파란 안쪽 벽',[297,194],wall,'url(#sera-ring-blue-wall)',
   C('M140 245 C189 260 260 251 318 232 C375 213 424 187 444 165 C431 190 384 217 326 238 C254 264 184 272 140 251Z','#a6bde9'),
   L('M142 248 C194 264 269 252 329 231 C382 212 426 187 443 166',2.2,'#f2ebff'),5.5)
  +G('sera-halo-metal','관측 고리 흰 금속',[297,184],
   `<g data-role="color">${C(ringOuter+' '+ringInner,'url(#sera-ring-metal)','fill-rule="evenodd"')}`
    +C('M110 224 C125 196 158 178 190 164 L196 172 C154 190 132 205 125 225 C120 235 127 243 140 248 L132 255 C108 250 100 237 110 224Z','#e5b38c')
    +C('M132 211 C176 178 237 155 300 142 C356 131 407 129 434 142 C400 134 355 137 301 148 C240 162 176 188 137 217Z','#fffdf8')
    +C('M421 126 L431 131 L438 139 L430 147 L420 144 L425 139 L414 130Z','#f6cc91')
    +C('M161 178 L168 172 L172 179 L182 176 L178 184 L171 188 L174 195 L165 195 L160 202 L155 196 L145 200 L151 191 L147 185 L156 185Z','#ffd295')
    +C('M122 206 L128 211 L140 209 L134 218 L136 225 L128 226 L124 235 L119 228 L112 229 L116 219 L112 214Z','#ffd498')
    +C('M163 178 L166 182 L174 180 L169 187 L171 190 L166 190 L161 197 L159 190 L153 193 L158 186Z','#fff1cf')
   +`</g><g data-role="line">${L(ringOuter,5.7)}${L(ringInner,4.6)}</g>`)
  +G('sera-halo-orbit','푸른 외곽 궤도',[292,234],
   `<g data-role="line">${L('M67 286 C103 248 233 207 352 192 C429 181 492 178 507 188 C528 201 480 222 433 241 C333 279 151 319 80 307 C58 304 58 296 67 286Z',6.4,'url(#sera-orbit-paint)')}`
   +L('M68 286 C104 250 233 209 353 194 C427 184 488 181 503 190',1.9,'#a7d9ff')+`</g>`)
  +part('sera-halo-jewel','관측 고리 골드 보석',[291,127],star,'url(#sera-gold-metal)',
   C('M284 96 L322 112 L302 131 L259 121Z','url(#sera-halo-gem-paint)')
   +C('M284 96 L291 116 L259 121Z','#a6d9ff')
   +C('M291 116 L322 112 L302 131Z','#687bd8')
   +C('M295 104 L306 129 L324 143 L307 169 L283 157 L285 137 L273 124Z','#f6c688')
   +C('M295 104 L295 137 L285 137 L273 124Z','#ffe8ae')
   +C('M295 137 L324 143 L307 169 L301 145Z','#eeb681')
   +C('M283 157 L295 137 L301 145 L307 169Z','#ffdda0'),
   L('M295 107 L295 137 L307 169 M278 124 L295 137 L320 143',1.2,'#fff0cd'),6)
 );
}

export function sparkleMarkup(){
 const d='M60 357 C65 377 68 381 83 389 C68 395 64 400 60 420 C56 402 52 396 36 389 C52 383 56 377 60 357Z';
 return G('sera-sparkle','도도한 별빛 장식',[60,389],`<g data-role="color">${C(d,'#fff2ce')}${C('M60 369 C63 380 66 385 73 389 C66 393 63 398 60 408 C57 398 55 393 46 389 C55 385 57 380 60 369Z','#fffdf0')}</g><g data-role="line">${L(d,4.3,'#ffba57')}</g>`);
}
