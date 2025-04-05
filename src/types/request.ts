export interface ProfileFormData {
  name: string;
  profile_image?: string | null;
  desired_career: string;
}

export interface MentorInfoData {
  userType: string;
  jobType: string;
  introduction: string;
}

export interface MentorTimeData {
  availableTimes: Record<
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY",
    string[]
  >;
}
