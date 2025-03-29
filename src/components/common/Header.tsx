import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4 relative justify-between">

      {/* 햄버거 (모바일 전용) */}
        <div className="flex md:hidden items-center">
          <button className="btn btn-ghost">
            <Menu size={24} /> 
          </button>
        </div>

        {/* 왼쪽 - 로고 (모바일: 중앙) */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <Image
              src="/logo.png"
              alt="로고"
              width={160}
              height={20}
              className="mr-2"
              priority
            />
          </Link>
        </div>

        {/* 오른쪽 - 사용자 정보 */}
        <div className="hidden md:flex items-center">
          {/* 로그인되지 않은 경우 */}
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn bg-base-100 border-none text-amber-950 text-sm hover:text-amber-900 transition-colors">
              로그인/회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
