import { DB } from "@/mocks/db/db";
import type { User } from "@/store/user";
import type { Bootcamp } from "@/types/Bootcamp";

type MockUserFromDB = {
  t_user_id: number;
  name: string;
  email: string;
  profile_image?: string | null;
  current_point: number;
  desired_career: string;
  bootcamp_id: number[];
};

const normalizeBootcamp = (bootcamp: Partial<Bootcamp>): Bootcamp => ({
  ...bootcamp,
  ncs_yn: bootcamp.ncs_yn ?? "N",
  ncs_name: bootcamp.ncs_name ?? "",
  training_manager: bootcamp.training_manager ?? "",
  training_manager_tel: bootcamp.training_manager_tel ?? "",
  training_manager_email: bootcamp.training_manager_email ?? "",
  bootcampIds: bootcamp.bootcampIds ?? bootcamp.bootcamp_id ?? 0,
} as Bootcamp);

export const transformUser = (userFromDB: MockUserFromDB): User => {
  const bootcampIds = userFromDB.bootcamp_id ?? [];

  const bootcamps = bootcampIds
    .map((id) => {
      const found = DB.bootcamps?.find((b) => b.bootcamp_id === id);
      return found ? normalizeBootcamp(found) : null;
    })
    .filter((b): b is Bootcamp => !!b);

  return {
    t_user_id: userFromDB.t_user_id,
    name: userFromDB.name,
    email: userFromDB.email,
    profile_image: userFromDB.profile_image ?? "/profile-default.png",
    desired_career: userFromDB.desired_career ?? "프론트엔드",
    current_point: userFromDB.current_point ?? 0,
    bootcamps,
  };
};
