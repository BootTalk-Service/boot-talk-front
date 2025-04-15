export interface UserInfo {
  email: string;
  name: string;
  desiredCareer: string;
  currentPoint: number;
  profileImage: string | null;
  certifications: Certification[];
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
  userId: number;
  userName: string;
  userType: string;
  jobType: string;
  introduction: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface ChatRoom {
  roomUuid: string;
  mentorName: string;
  menteeName: string;
  reservationAt: string;
  expiresAt: string;
  endAt: string;
  isActive: boolean;
  mentorId: number;
  menteeId: number;
}

export interface Course {
  courseId: number;
  courseName: string;
}
