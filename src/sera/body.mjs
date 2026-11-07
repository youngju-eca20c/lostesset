// Largest Sera figure from reference 06, in the sheet's original coordinates.
// Shapes and ink are separate, editable layers; hidden joint supports are closed.
const C={ink:'#5b3444',white:'#fff7f5',pink:'#f7dedf',navy:'#625687',deep:'#50456f',shade:'#d9c5e0',gold:'#ffd28c',skin:'#ffe9e3'};
const F=(d,fill,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
const L=(d,color=C.ink,width=5.3,extra='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const P=(id,label,pivot,color,line='',children='')=>`<g id="${id}" data-part="${id.replace('sera-','')}" data-label="${label}" data-pivot="${pivot.join(' ')}"><g id="${id}-color" data-role="color">${color}</g><g id="${id}-line" data-role="line">${line}</g>${children}</g>`;
const S=(d,fill,w=5.3)=>F(d,fill)+L(d,C.ink,w);
const diamond=(x,y,s)=>F(`M${x} ${y-s} L${x+s*.74} ${y} ${x} ${y+s} ${x-s*.74} ${y}Z`,C.gold)+F(`M${x} ${y-s+7} L${x+s*.48} ${y} ${x} ${y+s-7} ${x-s*.48} ${y}Z`,'#7294e8')+F(`M${x} ${y-s+8} L${x} ${y+s-8} ${x-s*.47} ${y}Z`,'#a5c8fa')+F(`M${x} ${y-s+8} L${x+s*.47} ${y} ${x} ${y+2}Z`,'#5f79c6');
const diamondLine=(x,y,s)=>L(`M${x} ${y-s} L${x+s*.74} ${y} ${x} ${y+s} ${x-s*.74} ${y}Z`,C.ink,4.5);
export const bodyDefs=`<defs>
 <linearGradient id="sera-body-white" x1=".1" y1="0" x2=".85" y2="1"><stop stop-color="#fffaf6"/><stop offset=".6" stop-color="#fff3fa"/><stop offset="1" stop-color="#ecdaee"/></linearGradient>
 <linearGradient id="sera-body-navy" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#6c6099"/><stop offset="1" stop-color="#504670"/></linearGradient>
 <linearGradient id="sera-body-lining" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#635a92"/><stop offset="1" stop-color="#514873"/></linearGradient>
 <linearGradient id="sera-body-gold" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="#ffe2ac"/><stop offset=".5" stop-color="#ffd08a"/><stop offset="1" stop-color="#e9ae79"/></linearGradient>
 <linearGradient id="sera-body-stocking" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9b7c90"/><stop offset="1" stop-color="#785f78"/></linearGradient>
 <linearGradient id="sera-body-neck" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#ffece5"/><stop offset="1" stop-color="#ddaeb8"/></linearGradient>
</defs>`;

function foot(side){
 const left=side==='left',x=left?335:264;
 const d=left?'M302 902 Q332 896 360 901 L366 929 C367 942 368 955 371 972 Q375 985 363 989 Q336 997 308 986 C300 982 301 970 301 960 L303 930Z':'M235 901 Q264 896 291 901 L296 931 C294 946 297 962 293 975 Q286 986 237 984 C229 983 226 977 229 966 L234 944 L233 924Z';
 const cuff=left?'M301 901 Q333 907 362 899 L366 925 Q338 938 303 930Z':'M234 901 Q264 907 292 899 L296 925 Q265 936 232 927Z';
 const toe=left?'M307 974 L318 970 L326 976 L341 963 L350 973 L363 974 L370 982 Q340 994 308 984Z':'M233 967 L243 956 L250 969 L276 967 L287 977 Q263 985 231 978Z';
 return P(`sera-foot-${side}`,left?'왼쪽 부츠':'오른쪽 부츠',[x,915],
  F(d,'url(#sera-body-white)')+F(left?'M351 931 L362 927 L363 965 L368 978 L352 982 C355 964 350 948 351 931Z':'M283 932 L293 926 L291 960 L288 974 L279 979 C284 964 281 945 283 932Z','#d9c2dd')+
  F(cuff,'#fff8f6')+F(left?'M304 921 Q333 932 365 919 L366 928 Q335 942 305 932Z':'M233 920 Q263 929 295 919 L296 928 Q265 939 233 930Z','#e6d6e9')+
  F(toe,'url(#sera-body-gold)')+
  F(left?'M305 976 Q336 989 371 978 L369 987 Q338 998 306 987Z':'M231 974 Q261 984 293 973 L291 981 Q261 990 230 982Z',C.deep),
  L(d)+L(cuff)+L(left?'M305 977 Q338 989 370 979':'M230 975 Q260 984 292 975',C.ink,4),
  P(`sera-foot-${side}-gem`,'부츠 렌즈 장식',[left?328:254,923],diamond(left?328:254,923,22),diamondLine(left?328:254,923,22))
 );
}

function leg(side){
 const left=side==='left',x=left?319:252;
 const thigh=left?'M285 735 Q311 726 333 740 L350 812 Q319 829 286 813 L278 768Z':'M214 736 Q239 728 261 740 L280 813 Q250 829 218 814 L204 774Z';
 const stocking=left?'M284 810 Q317 802 347 816 L360 902 Q330 918 300 907 C293 879 283 843 284 810Z':'M216 811 Q248 805 278 814 C286 844 294 875 295 902 Q263 916 236 906 C229 876 218 842 216 811Z';
 const band=left?'M282 767 Q310 763 339 774 L341 786 Q310 778 284 783Z':'M207 762 Q232 762 268 772 L271 784 Q237 775 211 778Z';
 return P(`sera-leg-${side}-upper`,left?'왼쪽 허벅지':'오른쪽 허벅지',[x,754],
  F(thigh,C.skin)+F(left?'M285 745 L297 747 L300 810 L287 814Z':'M215 745 L226 746 L235 813 L220 816Z','#f1bfc4')+F(band,'#5a435c')+F(left?'M310 768 L319 770 L318 780 L309 779Z':'M226 764 L234 766 L236 777 L227 776Z','#a7899b'),
  L(thigh)+L(band,C.ink,4),
  P(`sera-leg-${side}-lower`,left?'왼쪽 스타킹':'오른쪽 스타킹',[x,824],
   F(stocking,'url(#sera-body-stocking)')+F(left?'M285 812 L296 812 C299 850 309 883 315 910 L300 907 C293 878 284 840 285 812Z':'M217 815 L229 813 C236 847 245 881 249 910 L236 906 C229 877 221 843 217 815Z','#ad8b9d'),
   L(stocking),foot(side))
 );
}

const cross=(x,y)=>F(`M${x} ${y-28} Q${x+3} ${y-13} ${x+10} ${y-8} L${x+5} ${y-2} L${x+7} ${y+4} L${x+19} ${y+3} L${x+23} ${y-2} L${x+30} ${y+5} L${x+19} ${y+14} L${x+15} ${y+9} L${x+7} ${y+9} L${x+8} ${y+21} L${x+15} ${y+27} L${x+5} ${y+38} L${x-1} ${y+23} L${x-4} ${y+9} L${x-16} ${y+9} L${x-22} ${y+14} L${x-31} ${y+5} L${x-20} ${y-4} L${x-15} ${y+1} L${x-5} ${y+1} L${x-7} ${y-9} L${x-12} ${y-14} Q${x-2} ${y-18} ${x} ${y-28}Z`,'#9b83c7')+L(`M${x} ${y-8} L${x+1} ${y+7} L${x+18} ${y+6} M${x+1} ${y+7} L${x+4} ${y+25} M${x+1} ${y+7} L${x-17} ${y+6}`,'#f7edff',2.2);

export function lowerBodyMarkup(){
 const coat='M233 648 C210 675 181 726 157 777 C139 816 126 852 119 876 Q135 908 173 928 L184 876 L330 881 L406 940 C426 927 448 894 458 869 C436 829 402 785 379 739 C359 703 339 671 320 654Z';
 const leftPanel='M269 652 C236 673 214 716 193 763 C177 807 171 849 173 882 L121 863 C138 818 154 778 178 735 C203 687 230 665 252 654Z';
 const rightPanel='M319 660 C344 691 367 730 385 773 C410 816 434 847 458 867 L427 846 L379 892 C360 853 343 817 329 785 C329 739 321 699 312 676Z';
 const tasset='M254 665 L320 689 C313 733 300 777 282 808 L255 827 C244 793 239 750 234 712 C233 691 242 674 254 665Z';
 return P('sera-coat-back','코트 뒤 자락',[282,674],
  F(coat,'url(#sera-body-lining)')+F('M213 694 C184 746 165 795 152 840 L170 867 L182 875 L173 925 C150 913 130 893 119 877 C140 813 175 742 213 694Z','#71689e')+F('M330 688 C365 749 387 824 406 884 L438 877 L456 866 C444 903 426 925 407 939 L379 893Z','#534673'),L(coat))+
  P('sera-pelvis','골반',[282,744],leg('right')+leg('left'))+
  P('sera-coat-front','흰 코트 패널',[283,675],
   F(leftPanel,'url(#sera-body-white)')+F('M245 678 C211 728 188 790 178 847 L173 878 L162 873 C172 806 197 737 228 691Z','#dcc9e4')+
   F(rightPanel,'url(#sera-body-white)')+F('M321 687 L333 700 C338 748 348 802 364 846 L380 888 L371 883 C348 841 335 809 329 785Z','#d6c1de')+
   F('M124 850 L158 864 L166 848 L171 874 L174 883 L121 864Z','url(#sera-body-gold)')+F('M125 859 L159 873 L165 859 L169 875 L172 879 L122 863Z','#fff6e7')+
   F('M379 875 L425 838 L448 849 L458 867 L428 848 L379 892 L372 877 L375 863Z','url(#sera-body-gold)')+F('M380 884 L427 846 L451 858 L456 864 L428 849 L379 890 L374 875Z','#fff6e8')+
   cross(391,804),L(leftPanel)+L(rightPanel),
   P('sera-coat-center','중앙 흰 드레이프',[275,685],
    F(tasset,'url(#sera-body-white)')+F('M243 695 C259 716 272 725 286 725 L312 707 L306 731 L284 752 C264 736 254 720 243 695Z','#e4d2eb')+
    F('M244 716 C251 752 255 788 262 817 L268 815 C261 778 255 745 253 720Z','#fffaf8')+
    F('M266 741 L274 767 L284 774 L275 786 L267 800 L259 782 L250 775 L260 767Z',C.gold)+F('M267 757 L269 770 L277 774 L269 779 L266 789 L264 778 L257 775 L264 771Z','#fff9ec'),
    L(tasset))+
   P('sera-waist-front-flap','허리 아래 사선 패널',[236,684],
    F('M274 652 C240 667 210 686 188 711 C178 722 176 730 179 735 L219 704 L284 667Z','url(#sera-body-white)')+F('M270 657 L281 665 C247 682 216 702 184 728 L179 731 C206 702 238 675 270 657Z','#fffaf6'),
    L('M274 652 C240 667 210 686 188 711 C178 722 176 730 179 735 L219 704 L284 667Z'),
    P('sera-waist-front-star','사선 패널 골드 장식',[236,688],F('M236 668 L240 680 L249 688 L239 696 L235 709 L229 696 L222 689 L231 679Z','url(#sera-body-gold)')+F('M236 678 L238 685 L242 688 L237 692 L235 700 L233 692 L227 689 L233 684Z','#fff2cc'),L('M236 668 L240 680 L249 688 L239 696 L235 709 L229 696 L222 689 L231 679Z',C.ink,3.6))))
  ;
}

function loweredArm(){
 const mantle='M363 602 C392 614 420 637 437 665 Q444 678 443 691 L422 706 L396 687 C396 658 380 632 359 619Z';
 const upper='M362 608 C378 614 397 634 408 652 L418 675 L399 693 C384 672 374 648 370 632Z';
 const fore='M375 636 C397 640 421 660 432 684 L437 704 Q419 711 406 724 C393 704 382 674 375 636Z';
 const hand='M422 733 C433 725 446 728 458 735 L474 741 C482 746 480 753 473 755 C467 755 456 751 450 748 L464 758 C470 763 466 768 459 765 L444 759 C448 766 442 771 437 766 C427 760 420 749 417 741Z';
 const cuff='M404 711 C414 700 430 695 442 699 L452 723 Q434 726 420 740Z';
 return P('sera-arm-left-upper','왼쪽 상완',[374,588],F(mantle,'url(#sera-body-navy)')+F(upper,'url(#sera-body-white)'),L(mantle),
  P('sera-arm-left-lower','왼쪽 전완',[401,672],F(fore,'url(#sera-body-white)')+F('M383 650 L394 659 C402 678 409 695 416 713 L407 720 C395 700 387 676 383 650Z','#e3d0e8'),L('M376 638 C384 670 394 702 406 723 M431 683 L437 704'),
   P('sera-hand-left','왼손 · 펼친 손',[426,715],F(hand,C.white)+F('M421 739 Q426 754 437 763 L434 751 L433 734Z','#efdae6'),L(hand)+L('M451 747 L464 752 M438 753 L444 759',C.ink,3.3))+
   P('sera-wrist-left','왼쪽 손목 커프',[426,715],F(cuff,'url(#sera-body-white)')+F('M407 717 Q424 705 445 706 L448 715 Q432 713 413 729Z','#fdf8f5'),L(cuff))));
}

function raisedSleeve(){
 const upper='M256 568 C239 576 218 597 205 619 L196 638 Q212 650 227 640 C245 622 254 599 263 583Z';
 const lower='M185 590 C199 595 217 599 229 598 C233 613 232 628 225 639 C218 651 201 657 187 650 C173 643 175 626 178 612Z';
 return P('sera-arm-right-upper','오른쪽 상완',[253,582],F(upper,'url(#sera-body-white)'),L('M256 570 C239 581 215 605 203 625 M263 583 C255 606 243 625 227 640'),
  P('sera-arm-right-lower','오른쪽 전완',[204,635],F(lower,'url(#sera-body-white)')+F('M181 605 C179 627 183 642 195 646 C205 651 218 645 224 637 C219 650 200 657 187 650 C173 642 175 625 178 612Z','#dcc5e1'),L('M185 591 C182 602 178 615 177 628 C176 640 182 649 193 652 C210 657 225 647 229 636 C233 625 232 610 229 598')));
}

function shoulder(){
 const cape='M345 575 Q371 583 397 601 L414 628 Q378 623 342 612 L328 602Z';
 const cap='M350 550 C364 546 387 553 398 561 C405 567 403 573 397 575 C380 576 359 569 349 565 C343 562 343 553 350 550Z';
 const fringe=[['M350 563 L362 568 L359 591 Q354 599 344 591Z','M354 570 L350 588'],['M363 567 L375 571 L377 596 Q370 602 359 595Z','M368 573 L367 591'],['M376 571 L389 574 L398 600 Q390 606 379 599Z','M382 577 L385 595'],['M389 573 L398 578 L409 599 Q413 605 403 605 L397 600Z','M395 580 L404 598']];
 return P('sera-shoulder-left','왼쪽 어깨 망토',[374,588],F(cape,'url(#sera-body-navy)')+F('M342 598 Q374 611 407 614 L413 624 Q377 622 342 611Z','#70639d')+F('M363 619 C392 630 422 651 438 675 L443 690 C420 668 392 646 368 634Z',C.white),L(cape)+L('M365 620 C392 631 420 653 438 676',C.ink,4),
  fringe.map(([d,hi],i)=>P(`sera-shoulder-left-fringe-${i+1}`,'견장 술',[354+i*13,567+i*3],F(d,'url(#sera-body-gold)')+L(hi,'#ffedc4',3.8),L(d,C.ink,4))).join('')+
  P('sera-shoulder-left-cap','견장 윗단',[374,563],F(cap,'url(#sera-body-gold)')+F('M352 551 C363 548 385 555 394 561 C385 563 364 558 352 555Z','#ffe8b6'),L(cap)));
}

function chest(){
 const body='M269 544 C291 537 321 537 342 547 C360 559 367 582 359 610 L347 640 Q289 655 233 634 C225 607 233 576 251 555Z';
 const leftLapel='M323 543 C341 547 355 558 365 576 C351 593 340 613 332 637 L311 635 L319 596Z';
 const rightLapel='M267 548 C245 552 235 571 232 590 C229 605 232 622 237 635 L251 636 C243 614 245 593 256 580 L280 559Z';
 const tie='M278 552 L313 550 L313 590 L256 619 L239 592 L259 566Z';
 return P('sera-neck','목',[296,534],F('M267 514 Q300 519 334 512 L340 546 L289 566 L266 543Z','url(#sera-body-neck)')+F('M269 519 Q295 526 332 517 L333 529 Q299 539 271 532Z','#dbaab5'))+
  P('sera-jacket','제복 몸통',[285,635],F(body,'url(#sera-body-white)')+F('M258 585 L276 599 L266 627 L249 634 L240 610Z','#d7c1dc'),L(body))+
  P('sera-jacket-lapel-left','왼쪽 라펠',[337,565],F(leftLapel,'url(#sera-body-navy)')+F('M346 556 L354 563 C338 585 327 606 319 631 L313 632 C321 602 333 575 346 556Z',C.gold),L(leftLapel))+
  P('sera-jacket-lapel-right','오른쪽 라펠',[251,578],F(rightLapel,'url(#sera-body-navy)')+F('M250 558 C237 574 233 595 237 614 L243 631 L249 632 C241 609 242 582 257 562Z',C.gold),L(rightLapel))+
  P('sera-chest-panel','흰 가슴 장식',[278,576],F(tie,'url(#sera-body-white)')+F('M279 561 L310 554 L304 574 L269 596 L267 578Z','#a7b9ed')+F('M284 562 L304 557 L299 571 L275 585Z','#fff9fb')+F('M248 590 L260 603 L309 579 L313 589 L256 615Z','#e1cde8'),L(tie,C.ink,4.2))+
  P('sera-collar','높은 칼라',[318,538],F('M292 532 Q316 524 342 525 L349 546 Q326 554 303 556 L296 548Z',C.deep)+F('M299 532 Q319 527 341 529 L343 536 L303 543Z','#ddd7ec')+F('M304 544 L346 535 L349 546 L318 555Z','#4d486d')+`<circle cx="323" cy="537" r="2.6" fill="#cbb1c7"/>`,L('M292 532 Q316 524 342 525 L349 546 Q326 554 303 556 L296 548Z',C.ink,4.6),
   P('sera-collar-right-fold','칼라 오른쪽 접힘',[293,547],F('M286 537 L296 532 L303 550 L293 557Z',C.white),L('M286 537 L296 532 L303 550 L293 557Z',C.ink,3.8))+
   P('sera-collar-front-fold','칼라 앞쪽 흰 접힘',[323,552],F('M307 552 L349 546 L319 569Z',C.white)+F('M307 552 L316 552 L319 563Z','#eee0ef'),L('M307 552 L349 546 L319 569Z',C.ink,3.8)))+
  P('sera-brooch','관측 렌즈 브로치',[296,557],F('M298 537 L318 562 L284 583 L274 550Z',C.gold)+F('M297 544 L310 561 L287 576 L281 553Z','#79b1ef')+F('M297 544 L295 561 L281 553Z','#c6e6ff')+F('M295 561 L310 561 L287 576Z','#627bd0'),L('M298 537 L318 562 L284 583 L274 550Z',C.ink,4.7)+L('M297 544 L295 561 L287 576 M281 553 L295 561 L310 561','#e7f4ff',1.5));
}

function belts(){
 const waist='M239 625 C269 617 308 624 335 632 L351 639 L355 660 C317 647 285 645 250 648 L225 656 L230 638Z';
 const diagonal='M252 643 C281 659 319 675 368 685 L379 706 C329 696 286 682 240 658Z';
 const badge='M329 704 L365 701 Q374 701 375 710 L381 748 Q382 758 372 759 L339 763 Q329 764 328 754 L323 718 Q321 707 329 704Z';
  return P('sera-waist-belt','허리 벨트',[285,640],F(waist,'url(#sera-body-navy)')+F('M242 630 L250 628 L242 649 L234 652Z',C.gold)+F('M279 626 L285 627 L281 645 L275 644Z',C.gold)+F('M298 629 L303 630 L299 648 L293 646Z',C.gold)+F('M281 633 L299 636 L297 640 L279 637Z',C.gold),L(waist))+
  P('sera-cross-belt','사선 벨트',[304,676],F(diagonal,'url(#sera-body-navy)')+F('M255 647 L263 650 L253 663 L246 659Z',C.gold)+F('M342 675 L352 677 L357 696 L347 696Z',C.gold),L(diagonal),
   P('sera-cross-belt-buckle','사선 벨트 버클',[313,674],F('M308 659 L327 666 L316 686 L299 678Z',C.gold)+F('M312 668 Q317 666 318 671 Q319 675 314 677 Q310 677 311 672Z','#8c7a94'),L('M308 659 L327 666 L316 686 L299 678Z',C.ink,3.6)))+
  P('sera-observer-badge','관측 정보 배지',[350,701],F('M344 701 C342 689 354 687 360 694 Q364 702 357 707 L348 709Z',C.gold)+F(badge,'#fff7fb')+F('M332 711 L368 708 L373 751 L338 755Z','#f2e7f6')+F('M350 716 C352 723 355 727 362 728 C356 731 354 735 353 743 C349 736 347 733 341 731 C347 727 348 723 350 716Z','#9682c7')+F('M351 724 L355 729 L351 733 L347 730Z','#fff7ff')+[0,1,2,3,4,5].map(i=>F(`M${339+i*4.2} 745 L${342+i*4.2} 744 L${343+i*4.2} 752 L${340+i*4.2} 753Z`,'#b09bcd')).join(''),L(badge)+L('M332 711 L368 708 L373 751 L338 755Z','#d6c3df',2)+L('M344 701 C342 689 354 687 360 694 Q364 702 357 707',C.ink,4));
}

export function torsoMarkup(){
 return P('sera-torso','상체',[286,642],
  F('M251 549 C280 525 317 524 351 548 L375 587 L345 644 L236 640 L227 582Z',C.navy), '',
  loweredArm()+raisedSleeve()+chest()+shoulder()+belts());
}

export function raisedHandMarkup(){
 const hand='M197 551 C204 535 219 523 234 518 C245 514 257 512 264 517 C271 522 265 528 256 529 C249 528 242 531 236 534 C244 537 247 542 244 548 C244 553 239 558 233 559 C234 565 229 570 223 571 C212 573 202 568 194 562Z';
 const cuff='M190 565 Q211 578 235 574 L230 597 Q208 605 182 591Z';
 return P('sera-hand-right','오른손 · 턱을 짚는 손',[208,575],F(hand,C.white)+F('M198 553 Q207 565 221 566 L231 560 Q228 572 221 571 Q206 572 195 562Z','#efd9e5'),L(hand)+L('M236 534 Q243 534 245 539 M232 548 Q239 545 244 548',C.ink,3.7))+
 P('sera-wrist-right','오른쪽 손목 커프',[208,575],F(cuff,'url(#sera-body-white)')+F('M186 583 Q209 595 232 587 L230 596 Q209 604 183 591Z','#e2cde4'),L(cuff));
}

export const bodyJoints=[
 {id:'torso',svgId:'sera-torso',pivot:[286,642]},
 {id:'neck',svgId:'sera-neck',pivot:[296,534]},
 {id:'shoulder-right',svgId:'sera-arm-right-upper',pivot:[253,582]},
 {id:'elbow-right',svgId:'sera-arm-right-lower',pivot:[204,635]},
 {id:'wrist-right',svgId:'sera-hand-right',pivot:[208,575],paintProxy:true},
 {id:'shoulder-left',svgId:'sera-arm-left-upper',pivot:[374,588]},
 {id:'elbow-left',svgId:'sera-arm-left-lower',pivot:[401,672]},
 {id:'wrist-left',svgId:'sera-hand-left',pivot:[426,715]},
 {id:'hip-right',svgId:'sera-leg-right-upper',pivot:[252,754]},
 {id:'knee-right',svgId:'sera-leg-right-lower',pivot:[252,824]},
 {id:'ankle-right',svgId:'sera-foot-right',pivot:[264,915]},
 {id:'hip-left',svgId:'sera-leg-left-upper',pivot:[319,754]},
 {id:'knee-left',svgId:'sera-leg-left-lower',pivot:[319,824]},
 {id:'ankle-left',svgId:'sera-foot-left',pivot:[335,915]},
];
