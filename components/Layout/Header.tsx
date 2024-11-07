import Logo from "@/public/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "../HeaderMenu";

const Header = () => {
  return (
    <header className="bg-gray100 py-[13px] px-[32px] md:py-[33px] md:px-[200px]">
      <div className="flex justify-between items-center max-w-[1520px]">
        <Link
          href={"/"}
          className="w-[88.67px] h-[16px] md:w-[133px] md:h-[24px]"
        >
          <Image src={Logo} width={133} height={24} alt="로고" />
        </Link>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
