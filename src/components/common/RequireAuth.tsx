// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore, transformToAuthUser } from "@/store/authStore";
// import { toast } from "react-toastify";
// import { axiosDefault } from "@/api/axiosInstance";
// import { END_POINT } from "@/constants/endPoint";

// const RequireAuth = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const { setUser, isAuthenticated } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       router.push("/login");
//       setIsLoading(false);
//       return;
//     }

//     if (!isAuthenticated) {
//       axiosDefault
//         .get(END_POINT.MY_INFO)
//         .then((res) => {
//           const transformedUser = transformToAuthUser(res.data);
//           setUser(transformedUser);
//         })
//         .catch(() => {
//           toast.error("로그인 후, 이용 부탁드립니다.");
//           router.push("/login");
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       setIsLoading(false);
//     }
//   }, [isAuthenticated, setUser, router]);

//   if (isLoading) return null;

//   return <>{children}</>;
// };

// export default RequireAuth;
