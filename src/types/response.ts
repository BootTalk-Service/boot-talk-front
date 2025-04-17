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
