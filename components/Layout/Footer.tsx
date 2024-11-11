import Image from "next/image";
import Facebook from "@/public/icons/Facebook.svg";
import twitter from "@/public/icons/twitter.svg";
import youtube from "@/public/icons/youtube.svg";
import instagram from "@/public/icons/instagram.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black200 pt-8 sm:px-8 pb-[108px] md:px-[104px] lg:px-[104px]">
      <nav className="relative flex justify-between">
        <p className="text-gray700 sm:absolute sm:top-[60px] leading-[18.4px]">
          ©codeit - 2023
        </p>

        <ul className="flex gap-[30px] text-gray800 leading-[18.4px]">
          <li>
            <Link href={"/"}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={"/"}>FAQ</Link>
          </li>
        </ul>

        <ul className="flex gap-3">
          <li>
            <Link href={"https://www.facebook.com/codeit.kr/"} target="_blank">
              <Image src={Facebook} width={20} height={20} alt="facebook" />
            </Link>
          </li>
          <li>
            <Link href={"https://x.com/"} target="_blank">
              <Image src={twitter} width={20} height={20} alt="twitter" />
            </Link>
          </li>
          <li>
            <Link
              href={"https://www.youtube.com/channel/UCCM79CPm2WbBYTRaiNEExbg"}
              target="_blank"
            >
              <Image src={youtube} width={20} height={20} alt="youtube" />
            </Link>
          </li>
          <li>
            <Link href={"https://www.instagram.com/codeit_kr/"} target="_blank">
              <Image src={instagram} width={20} height={20} alt="instagram" />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
