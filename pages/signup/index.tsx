import AuthInput from "@/components/Auth/AuthInput";
import SubmitButton from "@/components/SubMitButton";
import AuthLayout from "@/components/Layout/AuthLayout";
import Link from "next/link";
import useForm from "@/hooks/useForm";
import Head from "next/head";
import SnsLogin from "@/components/Auth/SnsLogin";

const SignupPage = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm(true);

  return (
    <>
      <Head>
        <title>Linkbrary - 회원가입</title>
        <meta
          name="description"
          content="Linkbrary에 가입하여 나만의 링크를 관리하고, 즐겨찾기 및 공유 기능을 활용해보세요. 간편한 회원가입 절차로 시작하세요."
        />
      </Head>
      <div className="bg-gray100 min-h-screen">
        <AuthLayout>
          <p className="mt-[16px] text-base font-normal">
            이미 회원이신가요?{" "}
            <Link
              href="/signin"
              className="text-purple100 underline font-semibold"
            >
              로그인하기
            </Link>
          </p>
          <form
            className="w-full sm:max-w-[325px] md:max-w-[400px] lg:max-w-[400px] mt-[30px] h-full"
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
              text="이름"
              type="text"
              name="nickname"
              placeholder="이름을 입력해주세요."
              value={values.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nickname}
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
            <AuthInput
              text="비밀번호 확인"
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호를 한번 더 입력해주세요."
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.passwordConfirm}
            />
            <SubmitButton
              type="submit"
              width="w-full"
              height="h-[53px]"
              className="mt-[30px]"
            >
              회원가입
            </SubmitButton>
            <SnsLogin />
          </form>
        </AuthLayout>
      </div>
    </>
  );
};

export default SignupPage;
