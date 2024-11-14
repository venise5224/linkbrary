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
  const shareUrl = `http://www.facebook.com/sharer/sharer.php?u=${sendUrl}`;
  window.open(shareUrl);
};

export const handleShareKakao = () => {
  const { Kakao, location } = window;
  if (window.Kakao && window.Kakao.isInitialized()) {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "나만의 링크 모음",
        description: "나에게 필요한 링크만 모아 두었어요!",
        imageUrl: "https://linkbrary-sooty.vercel.app/images/home_main.png",
        link: {
          webUrl: location.href,
        },
      },
    });
  }
};
