import React from 'react'
import s from './Products.module.scss'
import Sort from '../Sort/Sort'
import Search from '../Search/Search'
import ProductsItem from './ProductsItem'
import { useGetProducts } from '../../services/products'
import { IProduct } from '../../types'
import ProductsSkeleton from './ProductsSkeleton'
import filterStore from '../../store/filterStore'
import Pagination from '../Pagination/Pagination'

const Products = () => {
  const {sortValue, searchValue, currentPage, setCurrentPage, limit, skip, setSkip} = filterStore((state)=> state)
  const {data} = useGetProducts({sort: sortValue, search: searchValue, limit, skip});
  const products = data?.results.map((elem: IProduct)=>(
    <ProductsItem key={elem.id} {...elem}/>
  ))
  const skeletons = [...Array(6)].map((elem, i)=> <ProductsSkeleton key={i}/>)
  const changePage = (num: number)=>{
    setCurrentPage(num)
    setSkip(num * limit - limit)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
 
  return (
    <div className={s.products}>
      <div className={s.products__filter}>
        <h1 className={s.products__title}>Меню</h1>
        <Sort/>
        <Search/>
      </div>
      <div className={s.products__list}>
        {
          data ? products : skeletons
        }
      </div>
      {data && <Pagination totalCount={data.count} changePage={changePage} currentPage={currentPage} limit={limit}/>}
    </div>
  )
}

export default Products