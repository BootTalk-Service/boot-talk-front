import { CommonModalProps } from "@/types/components";
import { X } from "lucide-react";
import { useEffect } from "react";

const Modal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
}) => {
  // 모달 크기 클래스 매핑
  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-full",
  };

  // 모달이 열려있을 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
    }

    // 컴포넌트 언마운트 시 스크롤 원복
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* daisyUI 카드 컴포넌트 활용 */}
      <div
        className={`card ${sizeClasses[size]} w-full bg-base-100 border border-gray-300 shadow-xl animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-body p-0">
          {/* 모달 헤더 */}
          <div className="flex items-center justify-between px-4 py-2 border-b">
            {title && <h3 className="card-title text-lg">{title}</h3>}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>

          {/* 모달 콘텐츠 */}
          <div className="p-4 overflow-y-auto max-h-[70vh]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
