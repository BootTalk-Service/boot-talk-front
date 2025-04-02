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
    return HttpResponse.json(DB.mentors, {});
  }),

  http.get(END_POINT.ACCEPTED_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.acceptedCoffeeChats, {});
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
];

