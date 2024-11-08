import { useForm } from "@/hooks/useForm";
import AuthInput from "@/components/Auth/AuthInput";
import SnsLogin from "@/components/Auth/SnsLogin";
import Button from "@/components/Button";
import AuthLayout from "@/components/Layout/AuthLayout";
import Link from "next/link";

const Login = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm(false);

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
        className="w-full sm:max-w-[325px] md:max-w-[400px] mt-[30px]"
        aria-labelledby="login-form"
        onSubmit={handleSubmit}
      >
        <AuthInput
          text="이메일"
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <AuthInput
          text="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <Button
          type="submit"
          width="w-full"
          height="h-[53px]"
          className="mt-[30px]"
        >
          로그인
        </Button>
        <SnsLogin />
      </form>
    </AuthLayout>
  );
};

export default Login;
