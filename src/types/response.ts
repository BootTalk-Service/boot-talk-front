import type { Bootcamp } from "./Bootcamp";

export interface UserInfo {
  email: string;
  name: string;
  desiredCareer: string;
  currentPoint: number;
  profileImage: string | null;
  certifications: Certification[];
  userId: number;
  bootcamps: Bootcamp[];
}

export interface Certification {
  categoryName: string;
  courseName: string;
}

export interface CoffeeChat {
  coffeeChatAppId: string;
  content: string;
  status: string;
  menteeName: string;
  mentorName: string;
  coffeeChatStartTime: string;
}

export interface Mentor {
  coffeeChatInfoId: number;
  mentorUserId: number;
  mentorName: string;
  mentorType: string;
  jobType: string;
  introduction: string;
}

export interface ChatRoom {
  roomUuid: string;
  chatRoomId: number;
  mentor: {
    userId: number;
    name: string;
    profileImage: string;
  };
  mentee: {
    userId: number;
    name: string;
    profileImage: string;
  };
  reservationAt: string;
  expiresAt: string;
  endAt: string;
  isActive: boolean;
}

export interface Course {
  courseId: number;
  courseName: string;
}

export interface Certification {
  courseName: string;
  categoryName: string;
  trainingProgramId?: string;
}

export interface Review {
  reviewId: number;
  courseName: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  trainingProgramId: string;
  userName: string;
}

export interface ReviewBootcamp {
  userName: string;
  courseName: string;
  categoryName: string;
  trainingProgramId: string;
}

export interface AuthUser {
  name: string;
  email: string;
  profileImage: string | null;
  currentPoint: number;
  userId: number;
}

export interface ReviewBootcamp {
  userName: string;
  courseName: string;
  categoryName: string;
  trainingProgramId: string;
}
