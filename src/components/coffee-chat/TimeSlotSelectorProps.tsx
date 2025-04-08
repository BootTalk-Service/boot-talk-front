import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AlertCircle, Clock, Calendar, X } from "lucide-react";

export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export interface TimeSlot {
  day: DayOfWeek;
  times: string[];
}

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  onChange: (timeSlots: TimeSlot[]) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  timeSlots,
  onChange,
}) => {
  const [activeDay, setActiveDay] = useState<DayOfWeek>("월");
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  });

  // 현재 활성화된 요일의 시간 슬롯
  const activeTimeSlot = timeSlots.find((slot) => slot.day === activeDay) || {
    day: activeDay,
    times: [],
  };

  // 시간을 HH:mm 형식의 문자열로 변환
  const formatTimeToString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 문자열을 Date 객체로 변환 (비교용)
  const parseTimeString = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // 요일 탭 선택 핸들러
  const handleDayTabClick = (day: DayOfWeek) => {
    setActiveDay(day);
  };

  // DatePicker 값 변경 핸들러
  const handleTimeChange = (date: Date | null) => {
    if (!date) return;

    // 선택한 시간을 문자열로 변환
    const timeString = formatTimeToString(date);

    // 선택한 시간 저장
    setSelectedDate(date);

    // 시간 추가
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.day === activeDay) {
        const sortedTimes = [...slot.times, timeString].sort();
        return { ...slot, times: sortedTimes };
      }
      return slot;
    });

    onChange(updatedTimeSlots);
  };

  // 시간 삭제 핸들러
  const handleRemoveTime = (day: DayOfWeek, time: string) => {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.day === day) {
        return { ...slot, times: slot.times.filter((t) => t !== time) };
      }
      return slot;
    });

    onChange(updatedTimeSlots);
  };

  // 해당 요일의 선택된 시간 수 가져오기
  const getSelectedTimesCount = (day: DayOfWeek) => {
    const daySlot = timeSlots.find((slot) => slot.day === day);
    return daySlot ? daySlot.times.length : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* 요일 탭 */}
      <div className="flex overflow-x-auto p-1 bg-amber-50 border-b-gray-900 scrollbar-thin scrollbar-thumb-gray-300">
        {timeSlots.map((slot) => (
          <button
            key={slot.day}
            type="button"
            className={`flex items-center justify-center px-4 py-2 m-1 rounded-full transition-all ${
              activeDay === slot.day
                ? `bg-amber-900 text-white font-medium shadow-sm`
                : "bg-white shadow-inner text-amber-900 hover:bg-amber-900 hover:text-white"
            }`}
            onClick={() => handleDayTabClick(slot.day as DayOfWeek)}
          >
            <span className="mr-1">{slot.day}</span>
            {getSelectedTimesCount(slot.day as DayOfWeek) > 0 && (
              <span className="bg-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium text-amber-900">
                {getSelectedTimesCount(slot.day as DayOfWeek)}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* DatePicker (시간 선택기) */}
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <Clock size={18} className="text-black mr-2" />
            <span className="font-medium text-gray-700">시간 선택</span>
          </div>
          <div className="relative rounded-md">
            <DatePicker
              selected={selectedDate}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="시간"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              className="input"
              excludeTimes={activeTimeSlot.times.map(parseTimeString)}
              placeholderText="시간 선택"
              popperClassName="react-datepicker-right"
              popperPlacement="right-start"
              shouldCloseOnSelect={false}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center">
            <AlertCircle size={12} className="mr-1" />
            목록에서 시간을 선택하면 자동으로 추가됩니다
          </p>
        </div>

        {/* 선택된 시간 표시 */}
        <div>
          <div className="flex items-center mb-3">
            <Calendar size={18} className="text-black mr-2" />
            <span className="font-medium text-gray-700">
              {activeDay}요일 선택된 시간
            </span>
          </div>
          <div className="bg-amber-50 rounded-md p-3 min-h-[100px]">
            {activeTimeSlot.times.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {activeTimeSlot.times.map((time) => (
                  <div
                    key={time}
                    className="w-28 px-3 py-2 rounded-md flex items-center text-sm bg-white text-amber-900 border border-amber-900"
                  >
                    <Clock size={14} className="mr-1.5" />
                    <span>{time}</span>
                    <button
                      type="button"
                      className="ml-2 p-1 rounded-full hover:bg-amber-100 transition-colors"
                      onClick={() => handleRemoveTime(activeDay, time)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-16 text-gray-500 text-sm">
                <AlertCircle size={16} className="mr-2" />
                아직 선택된 시간이 없습니다
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
