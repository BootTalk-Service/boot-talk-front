import AuthCard from "@/components/common/AuthCard"
import Image from "next/image"

const SocialLogin  = () => {
  return (
    <AuthCard>
      <div className="flex flex-col items-center justify-center w-full h-full gap-4">
        <Image
          src="/logo.PNG"
          alt="BootTalk Logo"
          width={300}
          height={90}
          className="object-contain mt-6 mb-10"
        />
        <p className="text-base text-center leading-relaxed">
          우리 부트톡<br />너희들의 미래를 담당하지
        </p>
        <button
          className="btn btn-success text-white text-base mt-6 min-w-[180px] min-h-[44px] mb-6"
          onClick={() => {
            // TODO: 소셜로그인 - api 명세, 로그인 주소 / 로그인 후 첫 이용 고객은 직무 선택
            window.location.href =
              "https://your-backend.com/oauth2/authorization/naver";
          }}
        >
          네이버로 로그인
        </button>
      </div>
    </AuthCard>
  )
}

export default SocialLogin