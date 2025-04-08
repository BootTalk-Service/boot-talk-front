import React, { useState } from "react";
import Modal from "../common/modal/CommonModal";
import { Clock, PencilLine, UserSearch } from "lucide-react";
import { toast } from "react-toastify";
import useMentorRegistration from "@/hooks/coffee-chat/useMentorRegistration";
import TimeSlotSelector, { TimeSlot } from "./TimeSlotSelectorProps";

interface MentorSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MentorSignupFormData {
  jobType: string;
  userType: string;
  introduction: string;
  timeSlots: TimeSlot[];
}

const jobCategories = [
  "프론트엔드",
  "백엔드",
  "PM",
  "UI/UX 디자인",
  "데이터분석",
  "기타",
];

const dayMapping: Record<string, string> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};

const MentorSignupModal: React.FC<MentorSignupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mentorInfoMutation, timeSlotsMutation, isPending } =
    useMentorRegistration();

  const [formData, setFormData] = useState<MentorSignupFormData>({
    jobType: "",
    userType: "",
    introduction: "",
    timeSlots: [
      { day: "월", times: [] },
      { day: "화", times: [] },
      { day: "수", times: [] },
      { day: "목", times: [] },
      { day: "금", times: [] },
      { day: "토", times: [] },
      { day: "일", times: [] },
    ],
  });

  // 직군 선택 핸들러
  const handleJobCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      jobType: e.target.value,
    });
  };

  // 현업자 체크박스 핸들러
  const handleProfessionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      userType: e.target.checked ? "PROFESSIONAL" : "GENERAL",
    });
  };

  // 소개글 핸들러
  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      introduction: e.target.value,
    });
  };

  // 시간 슬롯 변경 핸들러
  const handleTimeSlotChange = (updatedTimeSlots: TimeSlot[]) => {
    setFormData({
      ...formData,
      timeSlots: updatedTimeSlots,
    });
  };

  // 등록 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 시간 선택 확인
      const hasSelectedTimes = formData.timeSlots.some(
        (slot) => slot.times.length > 0
      );
      if (!hasSelectedTimes) {
        toast.error("최소 한 개 이상의 가능한 시간을 선택해주세요.");
        return;
      }

      // 소개글 길이 확인
      if (formData.introduction.trim().length < 10) {
        toast.error("소개글은 최소 10자 이상 작성해주세요.");
        return;
      }

      // 필터링된 시간 슬롯 (빈 배열 제거)
      const filteredTimeSlots = formData.timeSlots.filter(
        (slot) => slot.times.length > 0
      );

      const availableTimes: Record<string, string[]> = {};

      console.log("Filtered Time Slots:", filteredTimeSlots);

      filteredTimeSlots.forEach((slot) => {
        if (slot.times.length > 0) {
          // 한글 요일을 영어로 변환
          const day = dayMapping[slot.day];
          availableTimes[day] = slot.times;
        }
      });

      const mentorInfoData = {
        jobType: formData.jobType,
        userType: formData.userType || "GENERAL",
        introduction: formData.introduction,
      };

      // 멘토 정보 등록 API 호출
      await mentorInfoMutation.mutateAsync(mentorInfoData);

      await timeSlotsMutation.mutateAsync(availableTimes);

      toast.success("커피챗 멘토로 성공적으로 등록되었습니다!");
      onClose();
    } catch (error) {
      toast.error("멘토 등록 중 오류가 발생했습니다.");
      console.error("Registration error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="멘토 등록" size="lg">
      <form className="space-y-4 " onSubmit={handleSubmit}>
        {/* 직군 선택 */}
        <div className="form-control">
          <label className="label text-black">
            <UserSearch size={18} className="text-black" />
            <span className="font-medium">직군 선택</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={formData.jobType}
            onChange={handleJobCategoryChange}
            required
          >
            <option value="" disabled>
              직군을 선택해주세요
            </option>
            {jobCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* 현업자 체크박스 */}
        <div className="form-control">
          <label className="cursor-pointer justify-start label">
            <input
              type="checkbox"
              className="checkbox checkbox-xs checkbox-neutral"
              checked={formData.userType === "PROFESSIONAL"}
              onChange={handleProfessionalChange}
            />
            <span className="font-medium text-black">
              현업 종사자인 경우에만 체크해주세요.
            </span>
          </label>
        </div>

        {/* 소개글 */}
        <div className="form-control flex flex-col">
          <label className="label text-black">
            <PencilLine size={18} className="text-black" />
            <span className="font-medium">멘토 소개글</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 mt-1"
            placeholder="멘티에게 보여질 자기소개와 도움을 줄 수 있는 영역에 대해 작성해주세요. (최소 10자 이상)"
            value={formData.introduction}
            onChange={handleIntroductionChange}
            required
          />
        </div>

        {/* 요일별 시간 선택 */}
        <div className="space-y-2">
          <div className="label">
            <Clock size={18} className="text-black" />
            <span className="font-medium text-black">멘토링 가능 시간</span>
          </div>

          {/* TimeSlotSelector 컴포넌트 사용 */}
          <TimeSlotSelector
            timeSlots={formData.timeSlots}
            onChange={handleTimeSlotChange}
          />
        </div>

        {/* 등록 버튼 */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="btn bg-amber-900 w-full hover:bg-amber-950 text-white"
            disabled={isPending}
          >
            {isPending ? "등록 중..." : "커피챗 멘토로 등록하기"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MentorSignupModal;
