import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Collapsible from 'Components/Common/Collapsible'
import Section from 'Components/Common/Section'
import {
  projectSchedule as projectScheduleQueryKey,
  ownersSchedule as ownersScheduleQueryKey,
  designSchedule as designScheduleQueryKey, 
  contractorSchedule as contractorScheduleQueryKey
} from 'utils/queryKeys'
import Schedule from 'Components/Schedule'
import { 
  scheduleURL, 
  scheduleOwnersURL, 
  scheduleDesignURL, 
  scheduleContractorURL
} from 'utils/urls'


function Index() {

  const currentURL = useLocation() 

  return(
    <>
      <Section>
        <section className="flex flex-row space-x-4 mb-4">
          <Link to={scheduleURL()} className={`Section-h1 ${currentURL.pathname === scheduleURL() ? "" : "text-lightGray"}` }>
          Project Schedule
          </Link>
          <Link to={scheduleOwnersURL()} className={`Section-h1 ${currentURL.pathname === scheduleOwnersURL() ? "" : "text-lightGray"}` }>
          Owners Schedule
          </Link>
          <Link to={scheduleDesignURL()} className={`Section-h1 ${currentURL.pathname === scheduleDesignURL() ? "" : "text-lightGray"}` }>
          Design Team Schedule
          </Link>
          <Link to={scheduleContractorURL()} className={`Section-h1 ${currentURL.pathname === scheduleContractorURL() ? "" : "text-lightGray"}` }>
          Contractor Schedule
          </Link>
      </section>
        <Routes>
          <Route path="*" element={<ProjectSchedule />} />
          <Route path="/owners" element={<OwnersSchedule />} />
          <Route path="/design" element={<DesignSchedule />} />
          <Route path="/contractor" element={<ContractorSchedule />} />
        </Routes>
      </Section>

      <Section >
        <section  className="gray-border">
        <Collapsible title='Pre Design'><Schedule />
        </Collapsible>
        <Collapsible title='Design Team Selection'>
          <h2>THIS SHOULD BE HIDDEN</h2>
        </Collapsible>
        <Collapsible title='Design Activities'>
          <h2>THIS SHOULD BE HIDDEN</h2>
        </Collapsible>
        <Collapsible title='Non Design Activities'>
          <h2>THIS SHOULD BE HIDDEN</h2>
        </Collapsible>
        <Collapsible title='Contractor Selection'>
          <h2>THIS SHOULD BE HIDDEN</h2>
        </Collapsible>
        <Collapsible title='Construction Phase'>
          <h2>THIS SHOULD BE HIDDEN</h2>
        </Collapsible>
        </section>
      </Section>
    </>
  )
}


function ProjectSchedule() {
  // async function getProjectSchedule() {
  //   const response = await apiClient.get('/schedule')
  //   return response.data
  // }

  // const query = useQuery(projectScheduleQueryKey, getProjectSchedule)

  return (
    <div className="gray-border">
      {/* <div>{query.data}</div> */}
      <Schedule title="Overall" />
    </div>
  )
}

function OwnersSchedule() {
  // async function getOwnersSchedule() {
  //   const response = await apiClient.get('/schedule')
  //   return response.data
  // }
  
  // const query = useQuery(ownersScheduleQueryKey, getOwnersSchedule)
  
  return (
    <div>OWNERS</div>
    )
  }

  function DesignSchedule() {
    // async function getDesignSchedule() {
    //   const response = await apiClient.get('/schedule')
    //   return response.data
    // }
  
    // const query = useQuery(designScheduleQueryKey, getDesignSchedule)
  
    return (
      <div>DESIGNERS</div>
    )
  }
  
function ContractorSchedule() {
  // async function getContractorSchedule() {
  //   const response = await apiClient.get('/schedule')
  //   return response.data
  // }

  // const query = useQuery(contractorScheduleQueryKey, getContractorSchedule)

  return (
    <div>CONTRACTORS</div>
  )
}




export default Index