import Image from "next/image";
import Link from "next/link";
import Facebook from "@/public/icons/Facebook.svg";
import twitter from "@/public/icons/twitter.svg";
import youtube from "@/public/icons/youtube.svg";
import instagram from "@/public/icons/instagram.svg";

const SocialLinks = () => {
  return (
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
  );
};

export default SocialLinks;
