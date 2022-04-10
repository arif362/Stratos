import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '../ListItem'


function List({items}) {
  return(
    <ul>
      {items.map(project => (
        <li
          className="gray-border"  
          key={project.id}
          aria-label={project.attributes.name}
        >
          <ListItem item={project}/>
        </li>
      ))}
    </ul>
  )
}

export default List