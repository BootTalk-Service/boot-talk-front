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
  training_center_url: string;
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
  reviewId: number;
  trainingProgramId: string;
  courseName: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface ReviewResponse {
  content: Review[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}


export interface CourseSuggestion {
  bootcampId: number;
  bootcampName: string;
}