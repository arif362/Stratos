import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Section from 'Components/Common/Section'
import ProgressBar from 'Components/Common/ProgressBar';
import ProcessMapOverview from 'Components/Process';
import Schedule from 'Components/Schedule';
import TaskOverview from 'Components/Tasks';
import RiskOverview from 'Components/Risks';
import ContactOverview from 'Components/Contacts';



function Index() {
    const { projectId } = useParams()

    async function getProject() {
        const response = await apiClient.get(`/projects/${projectId}`)
        console.log(response.data, 'response')
        return response.data
    }

    const query = useQuery(['api/project', projectId], getProject)

    //FixMe: Add ContactsOverview back into view once working again

    return(
        <React.Fragment>
      <Section>
        { query.isLoading
          ? <p>Loading Project...</p>
          : <div>
              <h1 className="Section-h1">{query.data.attributes["name"]}
                <span className="text-outlineGray float-right">{query.data.attributes["identifier"]} - {query.data.attributes["location"]}</span>
              </h1>
              <div className="flex flex-row p-2 border border-outlineGray">
                <div className="bg-blue-400 text-center h-auto w-1/3">Image</div>
                <div className="p-6">
                  <h2 className="uppercase font-semibold">Description</h2>
                  <p>{query.data.attributes["description"]}</p>
                  <div className="pt-5 grid grid-cols-2 gap-x-10">
                    <section>
                      <h4 className="text-left text-xl font-light inline-block text-lightGray">Progress vs. <br/>Authorized Schedule</h4>
                      <ProgressBar progress="100%" isOver={true} isSmall={false}/>
                      <h4>On Schedule</h4>
                    </section>
                    <section>
                      <h4 className="text-left text-xl font-light inline-block text-lightGray">Anticipated Cost vs.<br/> Authorized Budget</h4>
                      <ProgressBar progress="70%" isOver={false} isSmall={false}/>
                      <div className="flex justify-between">
                          <p className="text-xs text-lightGray">${70}k</p>
                          <p className="text-xs text-lightGray">${100}k</p>
                      </div>
                      <h4 className={`text-trueGreen text-xs font-semibold py-1 px-2`}>On Budget
                      </h4>
                    </section>
                  </div>
                </div>
              </div>
            </div>
        }
      </Section>
      <ProcessMapOverview />
      <Schedule title="Owners Project Schedule" />
      <TaskOverview projectId={projectId} />
      <RiskOverview projectId={projectId} />
      {/* <ContactOverview/> */}
        </React.Fragment>
    )
}

export default Index
