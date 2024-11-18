import { useEffect, useState } from "react";

const debounce = (callback: any, delay: number) => {
  let timer;

  // 이벤트 발생하고 시간텀만큼 기다리다가 그 안에 이벤트 발생하면 마지막 기준으로 타임 세팅
  // 처음 타이머를 없애야됨, 다시 다음 타이머 세팅
  if (timer) clearTimeout(timer);
  return (...args: any) => {
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
