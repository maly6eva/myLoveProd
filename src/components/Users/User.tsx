// import {useState} from "react";
//
// type PaginationProps = {
//     totalPages: number;
// };
//
// export const Pagination = ({ totalPages }: PaginationProps) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageGroup, setPageGroup] = useState(0); // номер группы (0 → первые 5)
//
//     const pagesPerGroup = 5;
//
//     // вычисляем текущие 5 страниц
//     const startPage = pageGroup * pagesPerGroup + 1;
//     const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
//
//     const pages = [];
//     for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//     }
//
//     const handleClick = (page: number) => {
//         setCurrentPage(page);
//
//         // если клик по последней в группе → переключаемся вперёд
//         if (page === endPage && page < totalPages) {
//             setPageGroup(pageGroup + 1);
//         }
//
//         // если клик по первой в группе (и это не первые страницы) → назад
//         if (page === startPage && page > 1) {
//             setPageGroup(pageGroup - 1);
//         }
//     };
