import { END_POINT } from "@/constants/endPoint";
import { http, HttpResponse } from "msw";
import { DB } from "./db/db";

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

  http.get(END_POINT.MENTOR_LIST, () => {
    return HttpResponse.json(DB.mentors, {});
  }),

  http.get(END_POINT.ACCEPTED_COFFEE_CHATS, () => {
    return HttpResponse.json(DB.acceptedCoffeeChats, {});
  }),
];
