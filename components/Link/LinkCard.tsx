import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { putLinkFavorite } from "@/lib/api/link";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import timeAgo from "@/util/timeAgo";
import Image from "next/image";
import Dropdown from "../Dropdown";
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
}

const LinkCard = ({ info }: LinkCardProps) => {
  const [isSubscribed, setIsSubscribed] = useState(info.favorite || false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isOpen, openModal } = useModalStore();
  const { updateFavorite } = useLinkCardStore();

  const formattedDate = info.createdAt?.slice(0, 10).replace(/-/g, ".");
  const createdTime = timeAgo(info.createdAt);

  const router = useRouter();
  const isFavoritePage = router.pathname === "/favorite";

  // 모달이 열릴 때 드롭다운 닫기
  useEffect(() => {
    if (isOpen) setIsDropdownOpen(false);
  }, [isOpen]);

  // 즐겨찾기 버튼 클릭 시 호출되는 함수
  const handleFavoriteToggle = async () => {
    setIsSubscribed((prev) => !prev);
    try {
      await putLinkFavorite(info.id, { favorite: !isSubscribed });
      updateFavorite(info.id, !isSubscribed);
    } catch (error) {
      console.error("즐겨찾기 설정 중 오류 발생:", error);
    }
  };

  // dropdown 버튼
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleModalOpen = (
    type: "EditLink" | "DeleteLinkModal",
    link: string,
    linkId: number
  ) => {
    openModal(type, { link, linkId });
  };

  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => handleModalOpen("EditLink", info.url, info.id),
    },
    {
      label: "삭제하기",
      onClick: () => handleModalOpen("DeleteLinkModal", info.url, info.id),
    },
  ];

  return (
    <div className="w-[340px] h-[344px] rounded-[12px] shadow-lg overflow-hidden cursor-pointer hover:scale-105 hover:duration-300">
      <section className="relative w-full h-[60%]">
        <Image
          src={info.imageSource || `/images/no-content.svg`}
          className="object-cover"
          alt="링크 미리보기"
          fill
        />
        {/* 즐겨찾기 페이지가 아닐 때에는 즐겨찾기 버튼 렌더링x */}
        {!isFavoritePage && (
          <div
            onClick={handleFavoriteToggle}
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
              {isDropdownOpen && <Dropdown items={dropdownItems} />}
            </div>
          )}
        </div>
        <div className="text-black100 y-[42px] line-clamp-2">
          {info.description || "설명"}
        </div>
        <div className="text-sm">{formattedDate || "2024.11.06"}</div>
      </section>
    </div>
  );
};

export default LinkCard;
