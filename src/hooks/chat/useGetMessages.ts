import { axiosDefault } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchPreviousMessages = async (roomUuid: string) => {
  const response = await axiosDefault.get(
    `/api/chat-rooms/${roomUuid}/messages`,
    {}
  );
  return response.data;
};

export const useGetMessages = () => {
  const { data: previousMessages } = useQuery({
    queryKey: ["previousMessages"],
    queryFn: () => fetchPreviousMessages,
  });
  return { previousMessages };
};
