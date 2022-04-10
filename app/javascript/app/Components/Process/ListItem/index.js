import React from 'react'

function ListItem({items}) {

  const { name, lastModified, type, size } = items

  return(
    <ul className="p-3 flex flex-row justify-evenly space-x-3 border-b border-lightGray">
        <li key={name}>{name}</li>
        <li key={lastModified}>{lastModified}</li>
        <li key={type}>{type}</li>
        <li key={size}>{size}</li>
    </ul>
  )
}

export default ListItem; 