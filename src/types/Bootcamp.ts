export interface Bootcamp {
  bootcampId: number;
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
  trainingCenterId: number;
  trainingCenterName: string;
  trainingCenterPhoneNumber: string;
  trainingCenterEmail: string;
  trainingCenterAddress: string;
  trainingCenterUrl: string;
}

export interface BootcampDetail extends Bootcamp {
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
  updatedAt: string;
}

export interface CourseSuggestion {
  bootcampId: number;
  bootcampName: string;
}