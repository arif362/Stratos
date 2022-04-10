import React from 'react'
import { useParams } from 'react-router-dom'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Section from 'Components/Common/Section'

function Show() {

  const { riskId } = useParams()

  async function getRisk() {
    const response = await apiClient.get(`/risks/${riskId}`)
    return response.data
  }

  const query = useQuery(['api/risk', riskId], getRisk)

  return(
    <Section>
      {query.isLoading
        ? <p>Loading.</p>
        : <div>
            <h1 className="Section-h1">{query.data.attributes["title"]}</h1>
            <ul>
              <li>{query.data.attributes["project_id"]}</li>
              <li>{query.data.attributes["due_date"]}</li>
              <li>{query.data.attributes["impact"]}</li>
              <li>{query.data.attributes["rank"]}</li>
            </ul>
          </div>
      
      }
    </Section>
  )
}

export default Show
