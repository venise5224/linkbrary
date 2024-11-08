import Image from "next/image";
import Link from "next/link";

const SnsLogin = () => {
  return (
    <div className="flex items-center justify-between bg-gray300 rounded-lg px-6 py-3 mt-8">
      <span>소셜 로그인</span>
      <div className="flex gap-4">
        <Link href="https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email&response_type=token&redirect_uri=http://localhost:3000/google&client_id=1079911783112-7rg5ecp9ia9lorm7pit0m2nb2ti1rpt0.apps.googleusercontent.com">
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
