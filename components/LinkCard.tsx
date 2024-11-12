import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import timeAgo from "@/util/timAgo";
import Image from "next/image";
import Dropdown from "./Dropdown";
import useModalStore from "@/store/useModalStore";

interface LinkCardProps {
  info: {
    id: number;
    title: string;
    description: string;
    favorite?: boolean;
    imageSource: string;
    url: string;
    createdAt: string;
  };
  onEdit?: () => void;
  openDelete?: () => void;
}

const LinkCard = ({ onEdit, openDelete, info }: LinkCardProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen: isModalOpen } = useModalStore(); // 모달 열림 상태 구독

  const formattedDate = info.createdAt?.slice(0, 10).replace(/-/g, ".");
  const createdTime = timeAgo(info.createdAt);

  const router = useRouter();
  const isFavoritePage = router.pathname === "/favorite";

  // 모달이 열릴 때 드롭다운 닫기
  useEffect(() => {
    if (isModalOpen) setIsDropdownOpen(false);
  }, [isModalOpen]);

  // dropdown 버튼
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="w-[340px] h-[344px] rounded-[12px] shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:duration-300">
      <section className="relative w-full h-[60%]">
        <Image
          src={info.imageSource || `/images/no-content.svg`}
          className="object-cover"
          alt="링크 미리보기"
          fill
        />
        {/* isFavoritePage일 때만 즐겨찾기 버튼 렌더링 */}
        {!isFavoritePage && (
          <div
            onClick={() => setIsSubscribed(!isSubscribed)}
            className="absolute top-[15px] right-[15px] z-1"
          >
            <Image
              src={
                isSubscribed ? "/icons/star-fill.svg" : "/icons/star-empty.svg"
              }
              width={32}
              height={32}
              alt="subscribe button"
            />
          </div>
        )}
      </section>

      <section className="w-full h-[40%] flex flex-col justify-between gap-[10px] pt-[15px] px-[20px] pb-[10px]">
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">
            {createdTime || "1일 전"}
          </span>
          {/* isFavoritePage일 때만 케밥 버튼 렌더링 */}
          {!isFavoritePage && (
            <div className="relative">
              <button
                className="relative w-[21px] h-[17px]"
                onClick={toggleDropdown}
              >
                <Image src="/icons/kebab.svg" alt="kebab button" fill />
              </button>
              {isDropdownOpen && (
                <Dropdown onEdit={onEdit} openDelete={openDelete} />
              )}
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
