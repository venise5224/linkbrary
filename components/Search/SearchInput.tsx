import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, search: value },
    });
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-[8px] w-full h-[54px] items-center px-[16px] py-[15px] bg-gray-100 rounded-[10px] md:h-[54px] sm:h-[43px] transition-all"
    >
      <Image
        src="/icons/search.svg"
        width={16}
        height={16}
        alt="search button"
      />
      <input
        value={value}
        onChange={handleChange}
        placeholder="링크를 검색해 보세요."
        className="flex-grow bg-transparent placeholder:text-gray-500"
      />
    </form>
  );
};

export default SearchInput;
