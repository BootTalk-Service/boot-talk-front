export interface Bootcamp {
  bootcampId: number;
  trainingCenterName: string;
  bootcampName: string;
  bootcampRegion: string;
  bootcampCost: boolean;
  bootcampLink: string;
  bootcampCategory: string;
  bootcampDegree: number;
  bootcampCapacity: number;
  bootcampStartDate: string;
  bootcampEndDate: string;
  courseAverageRating: number;
  courseReviewCount: number;
}

export interface BootcampDetail extends Bootcamp {
  training_center_name: string;
  training_center_address: string;
  training_center_phone_number: string;
  training_center_email: string;
  training_center_url: string;
  reviews: Review[];
}


export interface Review {
  t_review_id: number;
  reviewId: number;
  userName: string;
  review_id: string;
  t_user_id: number;
  rating: number;
  content: string;
  created_at: string;
  trainingProgramId: string;
}

export type ReviewPage = {
  reviewId: number;
  trainingProgramId: string;
  courseName: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;

};

export interface CourseSuggestion {
  bootcampId: number;
  bootcampName: string;
}