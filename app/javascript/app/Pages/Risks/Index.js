import React from 'react'
import { useParams } from "react-router-dom"
import Section from 'Components/Common/Section'
import RiskOverview from 'Components/Risks'
import Form from 'Components/Risks/Form'
import List from 'Components/Risks/List'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import { allRisks as risksQueryKey } from 'utils/queryKeys'

import
  ContentTwoColumn, { WideColumn, NarrowColumn }
from 'Components/Common/Layout/ContentTwoColumn'

function Index() {

  // const { projectId } = useParams()

  async function getRisks() {
    const response = await apiClient.get('/risks')
    return response.data
  }

  const query = useQuery(risksQueryKey, getRisks)

 //FixMe: Add RisksOverview component back into view once working again delete lines 31-54 (<Section...to...Section>)

  return(
    <ContentTwoColumn>
      <WideColumn>
        {/* <RiskOverview projectId={projectId} />  */}
        <Section>
          <h1 className="Section-h1">Project Risks</h1>
          <table className="w-full">
            <thead className="w-full border border-lightGray text-left">
              <tr>
                <th className="p-3 font-bold text-lg">Project #</th>
                <th className="font-bold text-lg">RISK</th>
                <th className="font-bold text-lg">Assigned To</th>
                <th className="font-bold text-lg">Due Date</th>
                <th className="font-bold text-lg">Impact</th>
                <th className="font-bold text-lg">Ranking</th>
              </tr>
            </thead>
            <tbody>
              { query.isLoading
                ? <tr><td colSpan="6"><p>Loading risks ...</p></td></tr>
                : query.data.length
                  ? <List items={query.data} />
                  : <tr><td colSpan="6"><p>No Risks</p></td></tr>
              }
            </tbody>
          </table>
        </Section>
      </WideColumn>
      <NarrowColumn>
        <Section>
          <h2 className="Section-h1">Add New Risk</h2>
          <Form></Form>
        </Section>
      </NarrowColumn>
    </ContentTwoColumn>
  )
}

export default Index;
