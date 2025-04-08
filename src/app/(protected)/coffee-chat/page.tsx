import React from "react";
import FindMentors from "@/components/coffee-chat/mentor/FindMentors";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const MentorPage = () => {
  const { user } = useAuthGuard();
  if (!user) return null;

  return <FindMentors />;
  );

export default MentorPage;
