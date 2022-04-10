import React from 'react'
import { useParams } from 'react-router-dom'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Section from 'Components/Common/Section'
import EditTaskForm from 'Components/Tasks/Form/edittaskform'
import
  ContentTwoColumn, { WideColumn, NarrowColumn }
from 'Components/Common/Layout/ContentTwoColumn'

function Show() {

  const { taskId } = useParams()

  async function getTask() {
    const response = await apiClient.get(`/tasks/${taskId}`)
    return response.data
  }

  const query = useQuery(['api/risk', taskId], getTask)


  return(
    <ContentTwoColumn>
        <WideColumn>
            <Section>
            {query.isLoading
                ? <p>Loading...</p>
                : <div >
                    <h1 className="Section-h1">{query.data.attributes["name"]}</h1>
                    <table>
                        <thead>
                            <tr className="">
                                <th>Project ID</th>
                                <th>Task Due Date</th>
                                <th>Impact</th>
                                <th>Ranking</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{query.data.attributes["project-id"]}</td>
                                <td>{query.data.attributes["due-date"]}</td>
                                <td>{query.data.attributes["impact"]}</td>
                                <td>{query.data.attributes["ranking"]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            </Section>
        </WideColumn>
        <NarrowColumn>
            <EditTaskForm taskId={taskId} />
        </NarrowColumn>
    </ContentTwoColumn>
  )
}

export default Show;
