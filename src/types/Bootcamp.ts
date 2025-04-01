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
}

export interface Review {
  t_review_id: number;
  t_bt_id: string;
  t_user_id: number;
  rating: number;
  content: string;
  created_at: string;
}