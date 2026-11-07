# LOST · Asset Archive

SVG 기반 YouTube 애니메이션 **LOST**의 캐릭터와 제작 에셋을 보관하는 저장소입니다.

웹사이트: <https://youngju-eca20c.github.io/lostesset/>

## 현재 에셋

- **Sera / 세라:** 06번 설정화의 **가장 큰 왼쪽 캐릭터**를 기준으로 새로 그린 실제 벡터 원화. 원본의 SD 비율과 턱을 짚는 자세를 유지합니다. 색 면과 선, 얼굴·눈·머리카락·몸·팔·손·의상·다리·장식을 분리합니다.
- **Rize / 리제:** 07번 설정화 보관. 벡터 원화는 이후 제작합니다.
- **Knife / 나이프:** 08번 설정화 보관. 벡터 원화는 이후 제작합니다.

## 폴더

```text
src/sera/                         편집 가능한 베지어 작화 소스
src/build-sera.mjs                원본 자세 SVG 생성기
site/assets/characters/sera/      마스터 SVG, 파츠, rig, 표정 설정
site/assets/references/           원본 06·07·08 설정화와 웹 미리보기
site/assets/catalog.json         페이지의 에셋 목록
site/                            GitHub Pages 정적 사이트
scripts/                         메타데이터 생성과 로컬 서버
tests/                           SVG·목록·리그 구조 검증
.github/workflows/pages.yml      main 변경 시 검증 후 Pages 배포
```

마스터 SVG 내부에 PNG나 다른 래스터를 넣지 않습니다. 설정화 PNG는 별도 레퍼런스 파일입니다. 각 부위의 `data-role="color"`와 `data-role="line"` 그룹에서 색 면과 외곽선을 개별 편집할 수 있습니다. `rig.json`은 파츠 부모 관계, 원본 좌표계의 pivot, 보수적인 회전 범위, 앞뒤 렌더 프록시를 정의합니다. 눈은 홍채·동공·반사광·눈꺼풀, 입은 기본 미소와 말하기 모양으로 나뉩니다.

## 작업

Node.js 20 이상과 Python 3.10 이상으로 작화와 메타데이터를 재생성합니다. 빌드에는 외부 패키지가 필요하지 않습니다.

```sh
npm run build
npm test
npm start
```

로컬 주소: <http://127.0.0.1:4190/lostesset/>

`src/sera/`를 편집한 뒤 빌드합니다. SVG를 직접 편집했다면 생성기를 실행할 때 덮어쓰지 않도록 원본 코드에도 수정합니다. 새 에셋은 `site/assets/`에 추가하고 `catalog.json`에 등록합니다. 사이트 업로드 기능이나 브라우저에 저장한 파일은 Git 저장소를 대신하지 않습니다. 저장소에 커밋한 파일이 보관 원본입니다.

## 애니메이션

현재 세라는 시트의 대표 자세를 기본으로 한 첫 번째 제작 원본입니다. 상세 페이지에서 파츠, 색/선, 깜박임, 간단한 표정·말하기·작은 관절 움직임을 확인할 수 있습니다. 모든 동작은 같은 시간 함수로 복원합니다. 큰 방향 전환·원근·달리기·팔 교차는 이 그림을 무리하게 돌리는 대신 새로운 키 작화가 필요합니다. 초기의 작은 동작 범위를 모든 포즈에서의 충돌 해결이나 보행 접지로 해석하지 않습니다.

## 배포

GitHub 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정합니다. `main`에 푸시하면 원화를 재생성하고 검증한 후 `site/`만 GitHub Pages로 배포합니다. 파일 경로와 hash routing은 `/lostesset/` 프로젝트 경로를 지원합니다.
