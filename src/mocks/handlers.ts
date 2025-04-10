import { MentorInfoData, MentorTimeData } from "./../types/request";
import { END_POINT } from "@/constants/endPoint";
import { http, HttpResponse } from "msw";
import { DB } from "./db/db";
import { ProfileFormData } from "@/types/request";

export const handlers = [
  http.get(END_POINT.EXAMPLE, () => {
    return HttpResponse.json(DB.example, {});
  }),

  http.get(END_POINT.MY_INFO, () => {
    return HttpResponse.json(DB.myInfo, {});
  }),

  http.get(END_POINT.BOOTCAMPS, () => {
    return HttpResponse.json(DB.bootcamps, {});
  }),

  http.get(END_POINT.MY_REVIEWS, () => {
    return HttpResponse.json(DB.myReviews, {});
  }),

  http.get(END_POINT.POINT_HISTORY, () => {
    return HttpResponse.json(DB.pointHistory, {});
  }),

  http.get(END_POINT.MENTOR_LIST, () => {
    return HttpResponse.json(DB.mentorList, {});
  }),

  http.put(END_POINT.MY_INFO, async ({ request }) => {
    try {
      const body = await request.json();
      console.log("받은 요청 데이터:", body);
      const { name, profile_image, desired_career } = body as ProfileFormData;

      if (!profile_image || !desired_career || !name) {
        return HttpResponse.json(
          { error: "필수 입력값이 누락되었습니다." },
          { status: 400 }
        );
      }

      if (!DB.myInfo) {
        return HttpResponse.json(
          { error: "사용자를 찾을 수 없습니다." },
          {
            status: 404,
          }
        );
      }

      DB.myInfo = {
        ...DB.myInfo,
        profile_image,
        desired_career,
        name,
      };

      return HttpResponse.json({
        message: "사용자 정보가 정상적으로 수정되었습니다.",
        data: DB.myInfo,
      });
    } catch (error) {
      console.log(error);
      return HttpResponse.json(
        { error: "서버 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  }),

  http.post(END_POINT.FILE_UPLOAD, async ({ request }) => {
    try {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!(file instanceof File)) {
        return HttpResponse.json(
          { error: "유효한 파일이 제공되지 않았습니다." },
          { status: 400 }
        );
      }

      // 목 서버에서는 실제 파일 저장 없이 URL만 생성
      const fileName = `${Date.now()}-${
        file instanceof File ? file.name : "image.jpg"
      }`;
      const fileUrl = `/upload/${fileName}`;

      return HttpResponse.json(
        {
          fileUrl: fileUrl,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      return HttpResponse.json(
        { error: "서버 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  }),

  http.get(END_POINT.APPROVED_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.approvedCoffeeChats, {});
  }),

  http.get(END_POINT.SENT_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.sentCoffeeChats, {});
  }),

  http.get(END_POINT.RECEIVED_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.receivedCoffeeChats, {});
  }),

  http.get(END_POINT.BOOTCAMP_DETAIL(":id"), ({ params }) => {
    const bootcampId = Number(params.id);
    const bootcamp = DB.bootcamps.find((b) => b.bootcamp_id === bootcampId);

    if (!bootcamp) {
      return HttpResponse.json(
        { error: "부트캠프를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const reviews = DB.reviews.filter((r) => r.reviewId === bootcampId);

    return HttpResponse.json({
      ...bootcamp,
      reviews,
    });
  }),

  http.get(END_POINT.REVIEWS, () => {
    return HttpResponse.json({ content: DB.reviews });
  }),

  http.post(END_POINT.MENTOR_INFO, async ({ request }) => {
    const body = await request.json();
    const { userType, jobType, introduction } = body as MentorInfoData;

    if (!userType || !jobType || !introduction) {
      return HttpResponse.json(
        {
          message: "필수 입력 항목이 누락되었습니다.",
        },
        { status: 400 }
      );
    }

    // 성공 응답
    return HttpResponse.json(
      {
        userType,
        jobType,
        introduction,
      },
      { status: 200 }
    );
  }),

  http.post(END_POINT.MENTOR_TIME, async ({ request }) => {
    const body = await request.json();
    const { availableTimes } = body as MentorTimeData;

    if (
      !availableTimes ||
      typeof availableTimes !== "object" ||
      Object.keys(availableTimes).length === 0
    ) {
      return HttpResponse.json(
        {
          message: "가능한 시간대를 하나 이상 입력해주세요.",
        },
        { status: 400 }
      );
    }
    return HttpResponse.json(
      {
        availableTimes,
      },
      { status: 200 }
    );
  }),

  http.get(END_POINT.CHAT_ROOM_LIST, () => {
    return HttpResponse.json(DB.chatRoomList, {});
  }),

  http.get(END_POINT.CHAT_ROOM(":roomUuid"), ({ params }) => {
    const roomUuid = params.roomUuid;
    const chatRoom = DB.chatRoomList.find((c) => c.roomUuid === roomUuid);
    if (!chatRoom) {
      return HttpResponse.json(
        { error: "채팅방을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    return HttpResponse.json(chatRoom, {});
  }),
];
