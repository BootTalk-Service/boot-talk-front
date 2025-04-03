type MockUserFromDB = {
  t_user_id: number;
  name: string;
  email: string;
  profile_image?: string | null;
  current_point: number;
};

type MockUser = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  points: number;
};

export const transformUser = (userFromDB: MockUserFromDB): MockUser => {
  return {
    id: userFromDB.t_user_id,
    name: userFromDB.name,
    email: userFromDB.email,
    avatarUrl: userFromDB.profile_image || "/profile-default.png",
    points: userFromDB.current_point,
  };
};
