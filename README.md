# mbti 테스트 사이트
react + redux + router + tanstack query + tailwind + json server을 사용하여 mbti 테스트를 보여주는 사이트입니다.
![image](https://github.com/user-attachments/assets/d30c8930-8ab6-466f-b137-9b2b9abebf29)

## ✅ 기능
- 로그인시에만 테스트화면이 넘어갈 수 있도록 router로 구현
- 로그인, 회원가입시 실시간 유효성 검사 구현
- mbti 테스트후 데이터 저장
- 결과 페이지에서 유저마다 저장된 데이터를 tanstack query로 뿌림
- 해당 유저만 공개여부, 삭제 버튼 노출
- 마이페이지에서 닉네임 변경하여 redux로 유저정보를 관리
- 토큰은 2시간으로 설정하여 2시간뒤엔 자동 로그아웃됨

## 📁 파일구조
```bash
📦src
 ┣ 📂api
 ┃ ┣ 📜auth.js  //user api
 ┃ ┗ 📜testResults.js //test관련 api
 ┣ 📂components
 ┃ ┣ 📜AuthForm.jsx //로그인,회원가입 공통 form 컴포넌트
 ┃ ┣ 📜Footer.jsx //footer 컴포넌트
 ┃ ┣ 📜Header.jsx //header 컴포넌트
 ┃ ┣ 📜Layout.jsx  //layout 컴포넌트
 ┃ ┣ 📜TestForm.jsx //test 제출 form 컴포넌트
 ┃ ┣ 📜TestResultItem.jsx //test 결과 item
 ┃ ┗ 📜TestResultList.jsx //test 결과 list
 ┣ 📂data
 ┃ ┗ 📜questions.js //test 질문 data
 ┣ 📂hooks
 ┃ ┗ 📜useForm.jsx // 로그인,회원가입 공통 훅
 ┣ 📂pages
 ┃ ┣ 📜ErrorPage.jsx //에러 페이지
 ┃ ┣ 📜HomePage.jsx //홈 페이지
 ┃ ┣ 📜LoginPage.jsx //로그인 페이지
 ┃ ┣ 📜ProfilePage.jsx //프로필 페이지
 ┃ ┣ 📜SignupPage.jsx //회원가입 페이지
 ┃ ┣ 📜TestPage.jsx //mbti테스트 페이지
 ┃ ┗ 📜TestResultPage.jsx //mbti 테스트 결과 페이지
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜configStore.js //리덕스 store 
 ┃ ┗ 📂slices
 ┃ ┃ ┗ 📜authSlice.js //리덕스 slice
 ┣ 📂routes
 ┃ ┗ 📜Router.jsx //라우터
 ┣ 📂utils
 ┃ ┣ 📜mbtiCalculator.js //mbti 계산 함수
 ┃ ┗ 📜validation.js //로그인,회원가입 유효성검사
 ┣ 📜App.jsx 
 ┣ 📜index.css
 ┗ 📜main.jsx
```
