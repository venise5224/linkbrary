import Image from "next/image";
import Profile from "@/public/icons/profile.svg";
import Star from "@/public/icons/star.png";
import Link from "next/link";
import SubmitButton from "./SubMitButton";
import { useRouter } from "next/router";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

const HeaderMenu = () => {
  const { user, checkLogin, isLoggedIn, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.location.href !== "/link") {
      checkLogin();
    }
  }, [checkLogin]);

  const dropdownItems = [
    {
      label: "마이링크",
      href: "/link",
    },
    {
      label: "로그아웃",
      onClick: logout,
    },
  ];

  return (
    <>
      {!isLoggedIn ? (
        <SubmitButton
          onClick={() => {
            router.push("/login");
          }}
          width="w-[80px] md:w-[128px] lg:w-[128px]"
          height="h-[37px] md:h-[53px] lg:h-[53px]"
          size="text-[14px] md:text-[18px] lg:text-[18px]"
          type="button"
        >
          로그인
        </SubmitButton>
      ) : (
        <div className="relative flex items-center gap-[24px]">
          <Link
            href={"/favorite"}
            className="flex items-center gap-[6px] bg-gray200 border border-purple100 rounded-[4px] py-[10px] px-[12px] text-[12px] leading-[14.32px] md:text-[14px] md:leading-[16.71px] lg:text-[14px] lg:leading-[16.71px] font-normal"
          >
            <Image
              src={Star}
              width={14}
              height={17}
              alt=""
              className="align-top"
            />
            즐겨찾기
          </Link>
          <div
            className="flex items-center gap-[6px] text-[14px] leading-[16.71px] font-normal"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image src={Profile} width={28} height={28} alt="프로필" />
            <span className="hidden md:block lg:block">{user?.name}</span>
          </div>
          <div className="absolute top-8 right-0">
            {isOpen && <Dropdown items={dropdownItems} />}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMenu;
