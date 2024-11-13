import Image from "next/image";
import Link from "next/link";

const SnsLogin = () => {
  return (
    <div className="flex items-center justify-between bg-gray300 rounded-lg px-6 py-3 mt-8">
      <span>소셜 회원가입</span>
      <div className="flex gap-4">
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=http://localhost:3000/api/auth/sign-up/google&client_id=${process.env.GOOGLE_CLIENT_ID}`}
        >
          <Image src="/icons/google.svg" width="42" height="42" alt="구글" />
        </Link>
        <Image
          src="/icons/kakaotalk.svg"
          width="42"
          height="42"
          alt="카카오톡"
        />
      </div>
    </div>
  );
};

export default SnsLogin;
