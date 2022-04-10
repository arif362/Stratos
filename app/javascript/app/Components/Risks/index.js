import React from 'react'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import { allRisks as risksQueryKey } from 'utils/queryKeys'
import Section from 'Components/Common/Section'
import List from 'Components/Risks/List';
import Button from 'Components/Common/Button';

function RiskOverview({projectId}) {

  async function getRisks() {
    const response = await apiClient.get('/projects/' + projectId + '/risks')
    return response.data
  }

  const query = useQuery(risksQueryKey, getRisks)

  return(
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
  )
}

export default RiskOverview;
