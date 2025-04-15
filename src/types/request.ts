export interface ProfileFormData {
  name: string;
  profile_image?: string | null;
  desired_career: string;
}

export interface MentorInfoData {
  mentorType: string;
  jobType: string;
  introduction: string;
  time: Record<string, string[]>;
}

export interface TimeSlot {
  day: string;
  times: string[];
}

export interface MentorApplicationData {
  coffeeChatInfoId: number;
  content: string;
  coffeeChatStartTime: string;
  coffeeChatEndTime: string;
}

export interface CertificationData {
  courseId: number;
  fileUrl: string;
}
