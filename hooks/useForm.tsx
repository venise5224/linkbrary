import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { postSignUp } from "@/lib/api/auth";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { getUserInfo } from "@/lib/api/user";
import { validateEmail } from "@/util/regex";

interface FormValues {
  email: string;
  password: string;
  nickname?: string;
  passwordConfirm?: string;
}

const INITIAL_VALUES: FormValues = {
  email: "",
  password: "",
  nickname: "",
  passwordConfirm: "",
};

const useForm = (isSignUp = false) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormValues>(INITIAL_VALUES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          email: "이메일을 입력해주세요.",
        }));
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "잘못된 이메일 형식입니다.",
        }));
      }
    } else if (isSignUp && name === "nickname") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          nickname: "이름을 입력해주세요.",
        }));
      }
    } else if (name === "password") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          password: "비밀번호를 입력해주세요.",
        }));
      } else if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "비밀번호를 8자 이상 입력해주세요.",
        }));
      }
    } else if (isSignUp && name === "passwordConfirm") {
      if (value !== values.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: "비밀번호가 일치하지 않습니다.",
        }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormInvalid() || isLoading) return;

    setIsLoading(true);

    const { email, password, nickname } = values;

    try {
      if (isSignUp) {
        const data = await postSignUp({
          email,
          password,
          name: nickname || "",
        });

        if (data) {
          router.push("/signin");
          toast.success(toastMessages.success.signup);
        } else {
          toast.error(toastMessages.error.signup);
        }
      } else {
        const data = await login({ email, password });

        if (data) {
          router.push("/");
          toast.success(toastMessages.success.login);
        } else {
          toast.error(toastMessages.error.login);
        }
      }
    } catch (error) {
      toast.error("요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setValues(INITIAL_VALUES);
    }
  };

  const isFormInvalid = () =>
    !values.email ||
    !values.password ||
    !!errors.email ||
    !!errors.password ||
    (isSignUp &&
      (!values.nickname ||
        !values.passwordConfirm ||
        !!errors.nickname ||
        !!errors.passwordConfirm));

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormInvalid,
    isLoading,
  };
};

export default useForm;
