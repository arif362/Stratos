import React from 'react'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Section from 'Components/Common/Section'
import List from 'Components/Tasks/List';
import Button from 'Components/Common/Button';

function TaskOverview({projectId}) {

  async function getTasks() {
    const response = await apiClient.get('/projects/' + projectId + '/tasks')
    return response.data
  }

  const query = useQuery('api/tasks', getTasks)

  return(
    <Section>
      <div className="flex justify-between">
        <h1 className="Section-h1">Project Tasks</h1>
        <Button buttonStyle={'orange-solid-button'}>Add New +</Button>
      </div>
      { query.isLoading
        ? <p>Loading tasks ...</p>
        : query.data.length
          ? <List items={query.data} />
          : <p>No Tasks</p>
      }
    </Section>
  )
}

export default TaskOverview;
