# BootTalk
신뢰할 수 있는 부트캠프 정보를 제공하고, 예비 교육생이 현명한 선택을 내릴 수 있도록 돕는 맞춤형 플랫폼입니다.
<br><br>
## 목차
### [1. 프로젝트 기간](#프로젝트-기간)
### [2. 기술스텍](#기술스텍)
### [3. 주요 기능](#주요-기능)
### [4. 트러블 슈팅](#트러블-슈팅)
### [5. 프로젝트 아키텍처](#프로젝트-아키텍처)
<br><br>
## 프로젝트 기간
📍 2025.03.17 ~ 2025.04.23

- 1주차: 프로젝트 기획, 와이어프레임 제작
- 2주차:
  - 프로젝트 초기 세팅
  - 소셜 회원가입/로그인, 메인페이지, 대시보드 UI 구현 
- 3주차: MSW 설정, Express 서버 구축, 구축, 부트캠프 데이터/리뷰 데이터/사용자 데이터 등 모의 데이터 생성
- 4주차: 메인 페이지 및 리뷰 페이지 기능 구현(필터링, 작성 포함), 마이페이지 기능 구현, 커피챗 페이지 기능 구현
- 5주차: 1:1 채팅, 알림 구현, 관리자 페이지 구현
- 6주차: 백&프론트 연동 및 리팩토링 오류 버그 수정
<br><br>
<br><br>
## 팀원
<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/180407885?v=4" width="100px;" alt=""/><br />
      <b>FE 손유진</b>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/154823788?v=4" width="100px;" alt=""/><br />
      <b>FE 방주영</b>
    </td>
  </tr>
</table>
<br><br>

## 기술스텍
### Front-End
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-4353FF?style=for-the-badge&logo=socket.io&logoColor=white)
![STOMP](https://img.shields.io/badge/STOMP-black?style=for-the-badge&logo=apache-activemq&logoColor=white)
![SSE](https://img.shields.io/badge/SSE-008000?style=for-the-badge)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Collaboration Tool
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

<br><br>
## 주요 기능
<table>
  <tr>
    <th align="center">✨ 네이버 회원가입</th>
     <th align="center">✨ 무한스크롤</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/d6ae4aa6-58b4-4194-a22d-7b834553974b/%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif?table=block&id=1de06396-6d91-8080-a8b2-f87692ccb869&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=jY_rN-Hwd-2VCECCCbXI5QqXt-pczvS9dE9In2mZjZg&downloadName=%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif" width="60px;" alt="네이버 회원가입"><br />
    </td>
     <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/a4b9e306-57a9-45eb-a16a-f2d2a1dc626e/%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4.gif?table=block&id=1de06396-6d91-804b-830d-c671d6c3d8d4&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=L7Bqcj1iIexQIQjumuCbisHI2xkqGhzjPjTSI2ntScg&downloadName=%EB%AC%B4%ED%95%9C%EC%8A%A4%ED%81%AC%EB%A1%A4.gif" width="100px;" alt="무한스크롤"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 필터링</th>
    <th align="center">✨ 검색</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/f46cfd1d-5736-40b8-bcc4-2ec343290b38/%ED%95%84%ED%84%B0%EB%A7%81.gif?table=block&id=1de06396-6d91-8024-bd72-d993f7b19a6d&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746028800000&signature=MfBtf8j7ZBxI3fTVY4kJGlbNWPYtnfgPDLpA9dNx9Ws&downloadName=%ED%95%84%ED%84%B0%EB%A7%81.gif" width="100px;" alt="필터링"><br />
    </td>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/1686f933-3939-4573-bebc-d82bbde64c01/%EC%9E%90%EB%8F%99%EC%99%84%EC%84%B1.gif?table=block&id=1de06396-6d91-8047-8c81-e01c3c67b2f1&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=2SiBolfgtAsdXvOBAMxzTfn_kiFl-S13Te2iEiOz8pA&downloadName=%EC%9E%90%EB%8F%99%EC%99%84%EC%84%B1.gif" width="100px;" alt="검색"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 이미지 업로드</th>
    <th align="center">✨ 수료증 업로드</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/cbb5c5dc-4086-4582-9983-251dfeb6842c/%EC%9D%B4%EB%AF%B8%EC%A7%80.gif?table=block&id=1de06396-6d91-801c-bc17-e62818545d33&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=rT-CQmxXPIxuaB7jB0ajDXMHxN-sHneqsUkKyrQqyPI&downloadName=%EC%9D%B4%EB%AF%B8%EC%A7%80.gif" width="100px;" alt="이미지 업로드"><br />
    </td>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/ad306dd4-4156-4cab-95c8-f89d27f5ae69/%EC%88%98%EB%A3%8C%EC%A6%9D%EC%9D%B8%EC%A6%9D.gif?table=block&id=1de06396-6d91-8044-af8b-d8fc88b531b2&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=Xao5kzuq4RcCihAaASqRiNUUXnX8jDkBw-dl7bkH9fg&downloadName=%EC%88%98%EB%A3%8C%EC%A6%9D%EC%9D%B8%EC%A6%9D.gif" width="100px;" alt="수료증 업로드"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center">✨ 멘토 찾기</th>
    <th align="center">✨ 멘토 등록</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/29039ca1-4019-4e5c-9ebe-d008b070397b/Untitled_design.gif?table=block&id=1de06396-6d91-80c0-a8df-d748848a02b1&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=OjPqPhOvJikPWAemsR_Wm4ZYknOJD_a5_Kqb_2LUysw&downloadName=Untitled+design.gif" width="100px;" alt="멘토 찾기"><br />
    </td>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/f07b0ecf-c912-472e-ae97-3b223f4bca34/%EB%A9%98%ED%86%A0%EB%93%B1%EB%A1%9D.gif?table=block&id=1de06396-6d91-80e7-b45c-c70d52d05de9&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=0Vw1WZM_fjbEC4ycUuKT17Nog00B3a54zlgjjv21-Uo&downloadName=%EB%A9%98%ED%86%A0%EB%93%B1%EB%A1%9D.gif" width="100px;" alt="멘토 등록"><br />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th align="center width:50%">✨ 커피챗 신청</th>
    <th align="center width:50%">✨ 커피챗 승인</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://file.notion.so/f/f/297b4e11-c098-46e3-a9e3-ac155071bda4/0ab47a4d-1914-47a6-816a-861b012749cc/%EC%BB%A4%ED%94%BC%EC%B1%97_%EC%8B%A0%EC%B2%AD.gif?table=block&id=1de06396-6d91-80a6-a809-c3206ea1786a&spaceId=297b4e11-c098-46e3-a9e3-ac155071bda4&expirationTimestamp=1746036000000&signature=1HudLAMNgCffka_XLm6YLprlMHM2IE4OObrEQ0EHUUY&downloadName=%EC%BB%A4%ED%94%BC%EC%B1%97+%EC%8B%A0%EC%B2%AD.gif" width="100px;"  alt="커피챗 신청"><br />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/73cf4963-8f77-4d68-b84f-75ee26868695" width="100px;" alt="커피챗 승인"><br />
    </td>
  </tr>
</table>

## 트러블 슈팅

## 프로젝트 아키텍처
![image](https://github.com/user-attachments/assets/c83fb717-a8f3-459e-bc82-3167317f2607)
