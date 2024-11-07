import Image from "next/image";

const SnsLogin = () => {
  return (
    <div className="flex items-center justify-between bg-gray300 rounded-lg px-6 py-3 mt-8">
      <span>소셜 로그인</span>
      <div className="flex gap-4">
        <Image src="/icons/google.svg" width="42" height="42" alt="구글" />
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
