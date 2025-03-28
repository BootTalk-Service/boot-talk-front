export const DB = {
  example: [{ id: 1, name: "홍길동" }],

  myInfo: {
    message: "사용자 정보가 조회되었습니다.",
    data: {
      t_user_id: 1,
      email: "frontend@example.com",
      name: "김개발",
      desired_Career: "프론트엔드",
      current_point: 5,
      profile_image: null,
    },
    error: null,
  },

  bootcamps: [
    {
      id: 1,
      tcname: "제로베이스",
      name: "스프링 백엔드 부트캠프",
      region: "서울특별시 강남구",
      bt_cost: true,
      bt_link: "https://example.com/bootcamp/1",
      Category: "백엔드",
      degree: 3,
      capacity: 20,
      bt_startDate: "2025-04-01",
      bt_endDate: "2025-06-30",
      bt_rating: 4.8,
      bt_reviewCount: 12,
    },
    {
      id: 2,
      tcname: "패스트캠퍼스",
      name: "프론트엔드 실무 마스터 캠프",
      region: "서울특별시 마포구",
      bt_cost: false,
      bt_link: "https://example.com/bootcamp/2",
      Category: "프론트엔드",
      degree: 2,
      capacity: 25,
      bt_startDate: "2025-05-10",
      bt_endDate: "2025-09-15",
      bt_rating: 4.5,
      bt_reviewCount: 25,
    },
    {
      id: 3,
      tcname: "항해99",
      name: "AI 엔지니어 부트캠프",
      region: "경기도 성남시",
      bt_cost: true,
      bt_link: "https://example.com/bootcamp/3",
      Category: "AI",
      degree: 4,
      capacity: 30,
      bt_startDate: "2025-03-26",
      bt_endDate: "2025-10-01",
      bt_rating: 4.9,
      bt_reviewCount: 34,
    },
    {
      id: 4,
      tcname: "코드스테이츠",
      name: "백엔드 개발자 트랙",
      region: "부산광역시 해운대구",
      bt_cost: false,
      bt_link: "https://example.com/bootcamp/4",
      Category: "백엔드",
      degree: 3,
      capacity: 18,
      bt_startDate: "2025-06-01",
      bt_endDate: "2025-10-31",
      bt_rating: 4.1,
      bt_reviewCount: 17,
    },
    {
      id: 5,
      tcname: "멋쟁이사자처럼",
      name: "웹 풀스택 부트캠프",
      region: "대구광역시 달서구",
      bt_cost: true,
      bt_link: "https://example.com/bootcamp/5",
      Category: "풀스택",
      degree: 2,
      capacity: 22,
      bt_startDate: "2025-07-15",
      bt_endDate: "2025-12-15",
      bt_rating: 4.3,
      bt_reviewCount: 20,
    },
    {
      id: 6,
      tcname: "제로베이스",
      name: "스프링 백엔드 부트캠프",
      region: "서울특별시 강남구",
      bt_cost: true,
      bt_link: "https://example.com/bootcamp/1",
      Category: "백엔드",
      degree: 3,
      capacity: 20,
      bt_startDate: "2025-04-01",
      bt_endDate: "2025-06-30",
      bt_rating: 4.8,
      bt_reviewCount: 12,
    },
    {
      id: 7,
      tcname: "패스트캠퍼스",
      name: "프론트엔드 실무 마스터 캠프",
      region: "서울특별시 마포구",
      bt_cost: false,
      bt_link: "https://example.com/bootcamp/2",
      Category: "프론트엔드",
      degree: 2,
      capacity: 25,
      bt_startDate: "2025-05-10",
      bt_endDate: "2025-06-15",
      bt_rating: 4.5,
      bt_reviewCount: 25,
    },
    {
      id: 8,
      tcname: "항해99",
      name: "AI 엔지니어 부트캠프",
      region: "경기도 성남시",
      bt_cost: true,
      bt_link: "https://example.com/bootcamp/3",
      Category: "AI",
      degree: 4,
      capacity: 30,
      bt_startDate: "2025-03-26",
      bt_endDate: "2025-10-01",
      bt_rating: 4.9,
      bt_reviewCount: 34,
    },
    {
      id: 9,
      tcname: "코드스테이츠",
      name: "백엔드 개발자 트랙",
      region: "부산광역시 해운대구",
      bt_cost: false,
      bt_link: "https://example.com/bootcamp/4",
      Category: "백엔드",
      degree: 3,
      capacity: 18,
      bt_startDate: "2025-06-01",
      bt_endDate: "2025-10-31",
      bt_rating: 4.1,
      bt_reviewCount: 17,
    },
    {
      id: 10,
      tcname: "멋쟁이사자처럼",
      name: "웹 풀스택 부트캠프",
      region: "대구광역시 달서구",
      bt_cost: true,
      bt_link: "https://example.com/bootcamp/5",
      Category: "풀스택",
      degree: 2,
      capacity: 22,
      bt_startDate: "2025-07-15",
      bt_endDate: "2025-12-15",
      bt_rating: 4.3,
      bt_reviewCount: 20,
    },
  ],

  mentors: {
    message: "멘토 목록이 조회되었습니다.",
    data: [
      {
        t_user_id: 101,
        user_type: "수료자",
        name: "김백엔드",
        career: "백엔드",
        introduction: "제로베이스 30기 수료자",
        coffee_chat_schedule: [
          {
            day_of_week: "월",
            start_time: "21:00",
            end_time: "23:00",
            is_available: true,
          },
          {
            day_of_week: "수",
            start_time: "20:00",
            end_time: "22:00",
            is_available: true,
          },
        ],
      },
      {
        t_user_id: 102,
        user_type: "현업자",
        name: "박프론트",
        career: "프론트엔드",
        introduction: "Vue와 React에 익숙한 프리랜서 개발자입니다.",
        coffee_chat_schedule: [
          {
            day_of_week: "화",
            start_time: "19:00",
            end_time: "21:00",
            is_available: true,
          },
          {
            day_of_week: "목",
            start_time: "20:00",
            end_time: "22:00",
            is_available: true,
          },
        ],
      },
      {
        t_user_id: 103,
        user_type: "현업자",
        name: "이AI",
        career: "AI 엔지니어",
        introduction: "LLM, 챗봇 개발 경험 있습니다. 관심 있으신 분 환영!",
        coffee_chat_schedule: [
          {
            day_of_week: "월",
            start_time: "18:00",
            end_time: "20:00",
            is_available: true,
          },
        ],
      },
      {
        t_user_id: 104,
        user_type: "현업자",
        name: "최디자인",
        career: "UX/UI 디자이너",
        introduction: "프론트와 협업 경험이 풍부한 디자이너입니다.",
        coffee_chat_schedule: [
          {
            day_of_week: "화",
            start_time: "20:00",
            end_time: "22:00",
            is_available: true,
          },
          {
            day_of_week: "금",
            start_time: "21:00",
            end_time: "23:00",
            is_available: true,
          },
        ],
      },
      {
        t_user_id: 105,
        user_type: "현업자",
        name: "정데이터",
        career: "데이터 분석가",
        introduction: "SQL, Tableau, Python 활용 데이터 시각화 도움 가능",
        coffee_chat_schedule: [
          {
            day_of_week: "수",
            start_time: "19:00",
            end_time: "21:00",
            is_available: true,
          },
        ],
      },
      {
        t_user_id: 106,
        user_type: "현업자",
        name: "이프론트",
        career: "DevOps 엔지니어",
        introduction: "AWS 인프라 구성 및 CI/CD 파이프라인 경험 공유 가능",
        coffee_chat_schedule: [
          {
            day_of_week: "목",
            start_time: "19:30",
            end_time: "21:30",
            is_available: true,
          },
          {
            day_of_week: "토",
            start_time: "14:00",
            end_time: "16:00",
            is_available: true,
          },
        ],
      },
    ],
  },

  chat_messages: [
    {
      messageId: 1,
      senderId: 1,
      message: "안녕하세요! 만나서 반가워요.",
      isRead: true,
      createdAt: "2025-03-20 15:05",
    },
    {
      messageId: 2,
      senderId: 2,
      message: "반가워요! 어떤 직무 관심 있으세요?",
      isRead: true,
      createdAt: "2025-03-20 15:06",
    },
    {
      messageId: 3,
      senderId: 1,
      message: "프론트엔드에 관심 많아요!",
      isRead: true,
      createdAt: "2025-03-20 15:07",
    },
    {
      messageId: 4,
      senderId: 3,
      message: "저도 프론트엔드 준비 중이에요~",
      isRead: true,
      createdAt: "2025-03-20 15:08",
    },
    {
      messageId: 5,
      senderId: 2,
      message: "혹시 부트캠프 수강 중이신가요?",
      isRead: true,
      createdAt: "2025-03-20 15:08",
    },
    {
      messageId: 6,
      senderId: 1,
      message: "네! 지금 진행 중이에요 ㅎㅎ",
      isRead: true,
      createdAt: "2025-03-20 15:09",
    },
  ],

  reviews: [
    {
      t_review_id: 1,
      t_bt_id: "ACG20243001060786",
      t_user_id: 3,
      rating: 5,
      content: "너무 도움됐어요!",
      created_at: "2024-03-01",
    },
    {
      t_review_id: 2,
      t_bt_id: "AIG20243001060799",
      t_user_id: 5,
      rating: 4,
      content: "실무 기반 프로젝트가 많아서 포트폴리오 준비에 좋아요.",
      created_at: "2024-03-04",
    },
    {
      t_review_id: 3,
      t_bt_id: "ACG20243001060795",
      t_user_id: 2,
      rating: 3,
      content: "강사님은 좋았는데 자료가 조금 부족했어요.",
      created_at: "2024-03-07",
    },
    {
      t_review_id: 4,
      t_bt_id: "ACG20243001060789",
      t_user_id: 4,
      rating: 5,
      content: "멘토링이 진짜 인생 바뀌는 줄..!",
      created_at: "2024-03-10",
    },
    {
      t_review_id: 5,
      t_bt_id: "ACG20243001060786",
      t_user_id: 6,
      rating: 4,
      content: "더 많은 인사이트를 얻었습니다.",
      created_at: "2024-03-13",
    },
    {
      t_review_id: 6,
      t_bt_id: "AIG20243001060799",
      t_user_id: 7,
      rating: 5,
      content: "비전공자도 이해하기 쉬운 강의였습니다.",
      created_at: "2024-03-16",
    },
    {
      t_review_id: 7,
      t_bt_id: "ACG20243001060795",
      t_user_id: 3,
      rating: 4,
      content: "온라인 강의지만 실시간 소통이 잘 되었어요.",
      created_at: "2024-03-19",
    },
    {
      t_review_id: 8,
      t_bt_id: "ACG20243001060789",
      t_user_id: 8,
      rating: 3,
      content: "과제가 많지만 실력 향상에 좋았어요.",
      created_at: "2024-03-22",
    },
    {
      t_review_id: 9,
      t_bt_id: "ACG20243001060788",
      t_user_id: 1,
      rating: 4,
      content: "시설은 조금 아쉬웠지만 커리큘럼은 알찼어요.",
      created_at: "2024-03-25",
    },
    {
      t_review_id: 10,
      t_bt_id: "ACG20243001060786",
      t_user_id: 9,
      rating: 5,
      content: "수료 후 멘토링 시스템이 유익했어요.",
      created_at: "2024-03-28",
    },
  ],

  myReviews: {
    message: "사용자가 작성한 리뷰 조회 성공",
    data: [
      {
        t_user_id: 1,
        bootcampId: 1,
        bootcampName: "부트1",
        content: "오프라인 강의가 정말 좋았어요!",
        rating: 5,
        created_at: "2024-03-08",
      },
      {
        t_user_id: 2,
        bootcampId: 2,
        bootcampName: "부트2",
        rating: 4,
        content:
          "실무 기반 프로젝트가 많아서 포트폴리오 준비에 좋아요. 실무 기반 프로젝트가 많아서 포트폴리오 준비에 좋아요. 실무 기반 프로젝트가 많아서 포트폴리오 준비에 좋아요. 실무 기반 프로젝트가 많아서 포트폴리오 준비에 좋아요.",
        created_at: "2024-03-08",
      },
      {
        t_user_id: 3,
        bootcampId: 3,
        bootcampName: "부트3",
        rating: 3,
        content: "강사님은 좋았는데 자료가 조금 부족했어요.",
        created_at: "2024-03-15",
      },
    ],
  },

  points: [
    {
      point_id: 1,
      user_id: 1,
      current_points: 2,
      changed_points: 2,
      type: "EARN",
      event_type: "회원가입",
      created_at: "2025-03-20T00:00:00",
    },
    {
      point_id: 2,
      user_id: 1,
      current_points: 3,
      changed_points: 1,
      type: "EARN",
      event_type: "리뷰작성",
      created_at: "2025-03-24T00:00:00",
    },
    {
      point_id: 3,
      user_id: 1,
      current_points: 2,
      changed_points: -1,
      type: "USE",
      event_type: "커피챗",
      created_at: "2025-03-28T00:00:00",
    },
  ],

  acceptedCoffeeChats: {
    message: "커피챗 수락 목록이 조회되었습니다.",
    data: [
      {
        id: 1,
        title: "프론트엔드 개발 이야기",
        host: "김개발",
        date: "2025-03-30",
        status: "예정됨",
      },
      {
        id: 2,
        title: "리액트 학습 팁",
        host: "이리액트",
        date: "2025-04-02",
        status: "예정됨",
      },
      {
        id: 3,
        title: "주니어 개발자 성장기",
        host: "박주니어",
        date: "2025-04-05",
        status: "예정됨",
      },
    ],
    error: null,
  },
};
