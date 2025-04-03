export interface Bootcamp {
  bootcamp_id: number;
  bootcamp_name: string;
  training_center_name: string;
  bootcamp_region: string;
  bootcamp_cost: boolean;
  bootcamp_link: string;
  bootcamp_category: string;
  bootcamp_degree: number;
  bootcamp_capacity: number;
  bootcamp_start_date: string;
  bootcamp_end_date: string;
  bootcamp_rating: number;
  bootcamp_review_count: number;
  ncs_yn: string;
  ncs_name: string;
  training_manager: string;
  training_manager_tel: string;
  training_manager_email: string;
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
  userName: string;
  review_id: string;
  t_user_id: number;
  rating: number;
  content: string;
  created_at: string;
}