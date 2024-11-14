// tailwind 동적 스타일을 위한 함수
export const bindCls = (...cls: string[]) => {
  return cls.join(" ");
};

export const handleCopyUrl = () => {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl);
};

export const handleShareFacebook = () => {
  const currentUrl = window.location.href;
  const sendUrl = encodeURIComponent(currentUrl);
  const shareUrl = `http://www.facebook.com/sharer/sharer.php?u=${sendUrl}&quote=${sendUrl}`;
  window.open(shareUrl);
};
