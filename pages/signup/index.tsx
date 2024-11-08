import AuthInput from "@/components/Auth/AuthInput";
import Button from "@/components/Button";
import AuthLayout from "@/components/Layout/AuthLayout";
import Link from "next/link";

const signup = () => {
  return (
    <AuthLayout>
      <p className="mt-[16px] text-base font-normal">
        이미 회원이신가요?{" "}
        <Link
          href="/login"
          className="cursor-pointer text-purple100 underline font-semibold"
        >
          로그인하기
        </Link>
      </p>
      <form
        className="w-full sm:max-w-[325px] md:max-w-[400px] lg:max-w-[400px] mt-[30px]"
        aria-labelledby="login-form"
      >
        <AuthInput
          text="이메일"
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
        />
        <AuthInput
          text="이름"
          type="text"
          name="nickname"
          placeholder="이름을 입력해주세요."
        />
        <AuthInput
          text="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <AuthInput
          text="비밀번호 확인"
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요."
        />
        <Button width="w-full" height="h-[53px]" className="mt-[30px]">
          회원가입
        </Button>
      </form>
    </AuthLayout>
  );
};

export default signup;
