import React from 'react'
import ListItem from '../ListItem'


function List({items, getDataFromList}) {

  return(
    <ul>
      {items.map(file => (
        <li
          key={file.name}
          className="hover:bg-gray-300"
          aria-label={file.name}
          onClick={() => {getDataFromList(file)}} 
        >
          <ListItem items={file}/>
        </li>
      ))}
    </ul>
  )
}

export default List