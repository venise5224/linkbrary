import Image from "next/image";

const ActionButtons = () => (
  <div className="w-[192px] h-[18px] flex justify-between gap-[12px] text-gray400">
    {[
      { src: "/icons/share.svg", alt: "공유", text: "공유" },
      { src: "/icons/pen.svg", alt: "이름 변경", text: "이름 변경" },
      { src: "/icons/delete.svg", alt: "삭제", text: "삭제" },
    ].map(({ src, alt, text }) => (
      <button key={text} className=" flex items-center gap-[4px] text-sm ">
        <Image width={18} height={18} src={src} alt={alt} />
        <span>{text}</span>
      </button>
    ))}
  </div>
);

export default ActionButtons;
