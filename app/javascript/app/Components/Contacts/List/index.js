import React from 'react'
import { client as apiClient } from 'utils/api'
import { Link } from 'react-router-dom'
import {useQuery} from "react-query";

function List({items}) {

  return(
    <React.Fragment>
      { items.map((contact, index) => {
          return (
            <tr className="p-2 border border-lightGray" key={contact.id}>
              <td className="p-3">
                {contact.id}
              </td>
              <td>
                <Link to={`/contacts/${contact.id}`} className="underline">
                  {contact.attributes["first_name"]} {contact.attributes["last_name"]}
                </Link>
              </td>
              <td>{contact.attributes["title"]}</td>
              <td>{contact.attributes["phone"]}</td>
            </tr>
          )
      })}
    </React.Fragment>
  )
}

export default List
