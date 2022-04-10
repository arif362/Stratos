import React from 'react'
import { Link } from 'react-router-dom'
import moment from "moment"

function List({items}) {

  const rankColor = (rank) => {

    switch (rank) {
      case 'low':
        return 'bg-trueGreen'
      case 'medium':
        return 'bg-yellow-500'
      case 'high':
        return 'bg-stratosRed'
    }

  }

  return(
    <React.Fragment>
      { items.map((risk,index) => {
          return (
            <tr className="p-2 border border-lightGray" key={risk.id}>
              <td className="p-3">
                <span className={`inline-block align-middle w-5 h-5 rounded-full mr-2 ${rankColor(risk.attributes["rank"])}`}></span>
                {risk.id}
              </td>
              <td>
                <Link to={`/risks/${risk.id}`} className="underline">
                  {risk.attributes["name"]}
                </Link>
              </td>
              <td>{risk.attributes["assigned"]}</td>
              <td>{moment(risk.attributes["due_date"]).format("MMM D, YYYY")}</td>
              <td>{risk.attributes["impact"]}</td>
              <td>{risk.attributes["rank"]}</td>
            </tr>
          )
      })}
    </React.Fragment>
  )
}

export default List
