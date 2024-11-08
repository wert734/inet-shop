import React, { useState } from 'react'
import Select from 'react-select';
import filterStore from '../../store/filterStore';

const Sort = () => {
  const {setSortValue} = filterStore((state)=> state)
  const options = [
    { value: 'price', label: 'Цене' },
    { value: 'rating', label: 'Рейтингу' },
    { value: 'title', label: 'Названию' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const changeOption = (option)=> {
    setSelectedOption(option)
    setSortValue(option.value);
  }
  return (
    <Select 
      value={selectedOption}
      placeholder='Сортировать по:'
      options={options}
      onChange={changeOption}
    />
  )
}

export default Sort