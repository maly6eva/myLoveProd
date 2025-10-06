// import React, { useState } from "react";
// import cn from "classnames";
// import styles from "./Pagination.module.css";
//
// type PaginatorProps = {
//     totalItemsCount: number;
//     pageSize: number;
//     currentPage: number;
//     onPageChanged: (pageNumber: number) => void;
//     portionSize?: number;
// };
//
// export const Pagination: React.FC<PaginatorProps> = ({
//                                                         totalItemsCount,
//                                                         pageSize,
//                                                         currentPage,
//                                                         onPageChanged,
//                                                         portionSize = 10,
//                                                     }) => {
//     // 1️⃣ Вычисляем количество страниц
//     const pagesCount = Math.ceil(totalItemsCount / pageSize);
//     const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
//
//     // 2️⃣ Разбиваем страницы на порции
//     const portionCount = Math.ceil(pagesCount / portionSize);
//     const [portionNumber, setPortionNumber] = useState(1);
//
//     const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
//     const rightPortionPageNumber = portionNumber * portionSize;
//
//     return (
//         <div className={styles.paginator}>
//             {/* Кнопка "PREV" */}
//             {portionNumber > 1 && (
//                 <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
//             )}
//
//             {/* Номера страниц */}
//             {pages
//                 .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
//                 .map((p) => (
//                     <span
//                         key={p}
//                         className={cn(styles.pageNumber, {
//                             [styles.selectedPage]: currentPage === p,
//                         })}
//                         onClick={() => onPageChanged(p)}
//                     >
//             {p}
//           </span>
//                 ))}
//
//             {/* Кнопка "NEXT" */}
//             {portionCount > portionNumber && (
//                 <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
//             )}
//         </div>
//     );
// };

import s from "./Pagination.module.css"
type PaginationProps = {
    onClickPage: (page: number) => void;
    currentPage: number;
    totalUsersCount: number;
    pageSize: number;
};

export const Pagination = ({onClickPage, currentPage, totalUsersCount, pageSize}: PaginationProps) => {
    const blockSize = 5;
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    const currentBlock = Math.ceil(currentPage / blockSize);

    const startPage = (currentBlock - 1) * blockSize + 1;
    const endPage = Math.min(currentBlock * blockSize, pagesCount);

    const pages: (number | string)[] = [];

    if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < pagesCount) {
        if (endPage < pagesCount - 1) pages.push("...");
        pages.push(pagesCount);
    }

    return (
        <div style={{display: "flex", gap: "8px", marginBottom: "10px", alignItems: "center"}}>
            {/* Prev */}
            <button
                disabled={currentPage === 1}
                onClick={() => onClickPage(currentPage - 1)}
            >
                Prev
            </button>

            {/* Pages */}
            {pages.map((p, i) =>
                p === "..." ? (
                    <span key={`dots-${i}`}> ... </span>
                ) : (
                    <span
                        key={p}
                        className={currentPage === p ? s.selectedPage : ""}
                        onClick={() => onClickPage(p as number)}
                        style={{cursor: "pointer"}}
                    >
                        {p}
                    </span>
                )
            )}

            {/* Next */}
            <button
                disabled={currentPage === pagesCount}
                onClick={() => onClickPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};


