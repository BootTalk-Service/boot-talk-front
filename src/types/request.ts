export interface ProfileFormData {
  name: string;
  profile_image?: string | null;
  desired_career: string;
}

export interface MentorInfoData {
  mentorType: string;
  jobType: string;
  introduction: string;
  time: {
    [key: string]: string[];
  };
}

export interface MentorApplicationData {
  coffeeChatInfoId: number;
  content: string;
  coffeeChatStartTime: string;
  coffeeChatEndTime: string;
}
