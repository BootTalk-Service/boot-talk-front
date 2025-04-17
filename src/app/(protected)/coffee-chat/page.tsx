"use client";

import React from "react";
// import { useAuthGuard } from "@/hooks/useAuthGuard";
import FindMentors from "@/components/feature/coffee-chat/mentor/FindMentors";

const MentorPage = () => {
  // const { user } = useAuthGuard();
  // if (!user) return null;

  return <FindMentors />;
};

export default MentorPage;
