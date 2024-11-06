import AuthInput from "@/components/Auth/AuthInput";
import SnsLogin from "@/components/Auth/SnsLogin";
import Button from "@/components/Button";
import AuthLayout from "@/components/Layout/AuthLayout";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <AuthLayout>
      <p className="mt-[16px] text-base font-normal">
        회원이 아니신가요?{" "}
        <Link
          href="/signup"
          className="cursor-pointer text-purple100 underline font-semibold"
        >
          회원 가입하기
        </Link>
      </p>
      <form
        className="w-full sm:max-w-[325px] mt-[30px]"
        aria-labelledby="login-form"
      >
        <AuthInput
          text="이메일"
          type="text"
          placeholder="이메일을 입력해주세요."
        />
        <AuthInput
          text="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <Button width="w-full" height="h-[53px]" className="mt-[30px]">
          로그인
        </Button>
        <SnsLogin />
      </form>
    </AuthLayout>
  );
};

export default Login;
