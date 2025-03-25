import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto px-4">
        {/* 왼쪽 - 로고 */}
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            <Image
              src="/logo.png"
              alt="로고"
              width={160}
              height={40}
              className="mr-2"
            />
          </Link>
        </div>

        {/* 오른쪽 - 사용자 정보 */}
        <div className="navbar-end">
          {/* 로그인되지 않은 경우 */}
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-neutral">
              로그인/회원가입
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
