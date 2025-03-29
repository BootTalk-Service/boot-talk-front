"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "부트캠프", href: "/" },
  { label: "리뷰", href: "/review" },
  { label: "커피챗", href: "/chat" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b border-base-300 text-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex justify-around gap-12 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "text-amber-950 text-sm hover:text-amber-900 transition-colors",
                  pathname === item.href && "text-amber-900 font-semibold"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
