"use client";
// import { useTranslations } from "next-intl";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  disableNext: boolean;
  numberOfPages: number;
  language: string;
}

function Pagination({
  currentPage,
  onPageChange,
  disableNext,
  language,
  numberOfPages,
}: PaginationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const totalPages = numberOfPages;
  const pages = Array.from(
    { length: numberOfPages > 5 ? 5 : numberOfPages },
    (_, i) => currentPage + i
  );

  const isNextDisabled = currentPage === numberOfPages;
  const isPrevDisabled = currentPage <= 1;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-3 items-center w-full line-clamp-1">
      <div className="flex gap-2.5 items-start self-stretch my-auto ">
        {!isPrevDisabled && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap rounded-lg border border-solid bg-white text-black border-zinc-100"
          >
            &lt;
          </button>
        )}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap rounded-lg border border-solid 
                        ${page === currentPage
                ? "bg-primary text-white"
                : "bg-white text-black border-zinc-100"
              }
                         ${page > numberOfPages
                ? "opacity-50 cursor-not-allowed"
                : ""
              }
                    `}
            disabled={page > numberOfPages}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-3 py-2.5 text-xs font-semibold whitespace-nowrap rounded-lg border border-solid 
                    bg-white text-black border-zinc-100 ${isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }
                `}
          disabled={isNextDisabled}
        >
          &gt;
        </button>
      </div>
      <div className="flex-1 shrink self-stretch my-auto text-sm font-medium text-start text-black basis-0 max-md:max-w-full">
        <span>
          {language == "en" ? "Currently browsing" : "المتصفح حاليا"}
          {/* {t("head1")} */}
        </span>
        <span className="text-slate-800"> ( {currentPage} ) </span>
        <span>
          {language == "en" ? "Page of Total" : "من المجموع"}
          {/* {t("head2")} */}
        </span>
        <span className="text-slate-800"> {totalPages} </span>
        <span>
          {language == "en" ? "Page" : "صفحه"}
          {/* {t("head3")} */}
        </span>
      </div>
    </div>
  );
}

export default Pagination;
