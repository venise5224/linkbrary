import Image from "next/image";
import Profile from "@/public/icons/profile.png"
import Star from "@/public/icons/star.png"
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";

const HeaderMenu = () => {
    const isLoggedIn = false;
    const router = useRouter()

    return (
    <>
      {!isLoggedIn ? (
          <Button onClick={()=>{router.push('/login')}} width="w-[80px] md:w-[128px]" height="h-[37px] md:h-[53px]" size="text-[14px] md:text-[18px]" type="button">로그인</Button>
      ) : (
        <div className="flex items-center gap-[24px]">
          <Link href={'/favorite'} className="flex items-center gap-[6px] bg-gray200 border border-purple100 rounded-[4px] py-[10px] px-[12px] text-[12px] leading-[14.32px] md:text-[14px] md:leading-[16.71px] font-normal">
            <Image src={Star} width={14} height={17} alt="" className="align-top"/>즐겨찾기
          </Link>
          <div className="flex items-center gap-[6px] text-[14px] leading-[16.71px] font-normal">
            <Image src={Profile} width={28} height={28} alt="프로필" />
            {/* 임시 유저 네임 */}
            <span className="hidden md:block">전상민</span>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderMenu;

