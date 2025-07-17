import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SnsLogin = () => {
  const router = useRouter();
  const isSignUpPage = router.pathname.includes("signup");

  return (
    <div className="flex items-center justify-between bg-gray300 rounded-lg px-6 py-3 mt-8">
      <span>소셜 로그인</span>
      <div className="flex gap-4">
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile email&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_SIGN_IN}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          <Image src="/icons/google.svg" width="42" height="42" alt="구글" />
        </Link>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${isSignUpPage ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_SIGN_UP : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_SIGN_IN}&response_type=code`}
        >
          <Image
            src="/icons/kakaotalk.svg"
            width="42"
            height="42"
            alt="카카오톡"
          />
        </Link>
      </div>
    </div>
  );
};

export default SnsLogin;
