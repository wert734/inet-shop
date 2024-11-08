import React, { FC } from 'react'
import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'

interface IPaginationProps {
    totalCount: number,
    changePage: (num: number)=>void,
    currentPage: number,
    limit: number
}

const Pagination: FC<IPaginationProps> = ({totalCount, changePage, limit, currentPage}) => {
  const total = Math.ceil(totalCount / limit);
  // console.log(total);
  return (
    <ReactPaginate
        className={s.pagination}
        activeClassName={s.active}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(page)=>{
          changePage(page.selected + 1)
        }}
        pageRangeDisplayed={3}
        pageCount={total}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
  )
}

export default Pagination