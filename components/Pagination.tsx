import Image from "next/image";
import Link from "next/link";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalCount,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const LiStyle = "relative w-12 h-12 rounded-lg bg-gray900";
  const buttonStyle = "flex justify-center items-center h-full text-black400";
  const activebuttonStyle = `${buttonStyle} text-black500`;

  return (
    <ul className="flex justify-center gap-[10px] my-10">
      <li className={LiStyle}>
        <Link
          href={`/link?page=${page - 1}&pageSize=${pageSize}`}
          className={buttonStyle}
        >
          <Image
            src="/icons/pagination-left.png"
            width={24}
            height={24}
            alt="prev"
          />
        </Link>
      </li>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNum) => (
          <li key={pageNum} className={LiStyle}>
            <Link
              href={`/link?page=${pageNum}&pageSize=${pageSize}`}
              className={pageNum === page ? activebuttonStyle : buttonStyle}
            >
              {pageNum}
            </Link>
          </li>
        )
      )}

      <li className={LiStyle}>
        <Link
          href={`/link?page=${page + 1}&pageSize=${pageSize}`}
          className={buttonStyle}
        >
          <Image
            src="/icons/pagination-right.png"
            width={24}
            height={24}
            alt="next"
          />
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
