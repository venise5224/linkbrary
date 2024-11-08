import { useState } from "react";
import timeAgo from "@/util/timAgo";
import Image from "next/image";

interface linkDataType {
  id: number;
  title: string;
  description: string;
  favorite?: boolean;
  imageSource: string;
  url: string;
  createdAt: string;
}

interface CardItemProps extends linkDataType {
  isFavoritePage?: boolean; // 즐겨찾기 페이지 여부를 판별하는 flag
}

const LinkCard = ({ isFavoritePage, ...info }: CardItemProps) => {
  const [isSubscribed, seIsSubscribed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = info.createdAt?.slice(0, 10).replace(/-/g, ".");
  const createdTime = timeAgo(info.createdAt);

  return (
    <div className="w-[340px] h-[344px] rounded-[12px] shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:duration-300">
      <section className="relative w-full h-[60%]">
        <Image
          src={info.imageSource || `/images/no-content.svg`}
          className="object-cover"
          alt="링크 미리보기"
          fill
        />
        {/* isFavoritePage가 false일 때만 즐겨찾기 버튼 렌더링 */}
        {!isFavoritePage &&
          (isSubscribed ? (
            <div
              onClick={() => seIsSubscribed(!isSubscribed)}
              className="absolute top-[15px] right-[15px] z-1"
            >
              <Image
                src="/icons/star-fill.svg"
                width={32}
                height={32}
                alt="subscripe button"
              />
            </div>
          ) : (
            <div
              onClick={() => seIsSubscribed(!isSubscribed)}
              className="absolute top-[15px] right-[15px] z-1"
            >
              <Image
                src="/icons/star-empty.svg"
                width={32}
                height={32}
                alt="subscripe button"
              />
            </div>
          ))}
      </section>

      <section className="w-full h-[40%] flex flex-col justify-between gap-[10px] pt-[15px] px-[20px] pb-[10px]">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">
            {createdTime || "1일 전"}
          </span>
          {/* isFavoritePage가 false일 때만 케밥 버튼 렌더링 */}
          {!isFavoritePage && (
            <div
              className="relative w-[21px] h-[17px]"
              onClick={(state) => setIsOpen(!state)}
            >
              <Image src="/icons/kebab.svg" alt="kebab button" fill />
            </div>
          )}
        </div>
        <div className="text-[black100] text-lg ">
          {info.description || "설명"}
        </div>
        <div className="text-sm text-[black200]">
          {formattedDate || "2024.11.06"}
        </div>
      </section>
    </div>
  );
};

export default LinkCard;
