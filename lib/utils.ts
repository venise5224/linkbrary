// tailwind 동적 스타일을 위한 함수
export const bindCls = (...cls: string[]) => {
  return cls.join(" ");
};
