import React, { useState } from 'react'
import s from './Search.module.scss'
import { searchclose, searchIcon } from '../../utils'
import filterStore from '../../store/filterStore'

const Search = () => {
  const { setSearchValue } = filterStore()
  const [searchText, setSearchText] = useState('');
  const confirm = (e: React.FormEvent)=>{
    e.preventDefault()
    setSearchValue(searchText);
  }
  const reset = ()=>{
    setSearchValue('');
    setSearchText('')
  }
  return (
    <form action="" className={s.search} onSubmit={confirm}>
      <button className={s.search__btn}>
        <img src={searchIcon} alt="" />
      </button>
      <input 
        type="text" 
        className={s.search__input} 
        placeholder='Введите блюдо или состав' 
        onChange={(e)=>{ setSearchText(e.target.value); }}
        value={searchText}
        />
      {searchText && <img onClick={reset} src={searchclose} alt="" className={s.search__clear} />}
    </form>
  )
}

export default Search