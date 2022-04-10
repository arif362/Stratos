import React, {useState} from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Axios from 'axios'
import List from 'Components/Tasks/List'
import Section from 'Components/Common/Section'
import Form from 'Components/Tasks/Form'
import { data } from 'autoprefixer'
import
{
  Table , 
  TableCell ,
  TableContainer, 
  TableHead ,
  TableBody ,
  TableRow ,
 } from '@mui/material/';
 import {
  allTasks as allTasksQueryKey,
  criticalTasks as criticalTasksQueryKey,
  myTasks as myTasksQueryKey,
} from 'utils/queryKeys'
 import moment from 'moment'

function Index() {

  const currentURL = useLocation()

  async function getTasks() {
    const response = await apiClient.get('/tasks')
    return response.data
  }

  async function getCriticalTasks() {
    const response = await apiClient.get('/tasks/critical')
    return response.data
  }

  async function getMyTasks() {
    const response = await apiClient.get('/tasks/mine')
    return response.data
  }

  const query = useQuery(allTasksQueryKey, getTasks)
  const criticalQuery = useQuery(criticalTasksQueryKey, getCriticalTasks)
  const myQuery = useQuery(myTasksQueryKey, getMyTasks)

  return (
    <>
        { query.isLoading || criticalQuery.isLoading || myQuery.isLoading  
        ? <p>Loading tasks ...</p>
        : 
    <section className="flex flex-row">
      <Section>
      <div className="flex flex-row justify-between">
        <section className="flex flex-row space-x-4 mb-4">
          <Link to="/tasks"  className={`pb-2 Section-h1 ${currentURL.pathname === "/tasks" ? "border-b-2 border-stratosOrange" : "text-lightGray"}` }>
          ALL TASKS
          </Link>
          <Link to="/tasks/critical"  className={`pb-2 Section-h1 ${currentURL.pathname === "/tasks/critical" ? "border-b-2 border-stratosOrange" : "text-lightGray"}` }>
          CRITICAL ISSUES
          </Link>
          <Link to="/tasks/mine" className={`pb-2 Section-h1 ${currentURL.pathname === "/tasks/mine" ? "border-b-2 border-stratosOrange" : "text-lightGray"}` }>
          MY TASKS
          </Link>
        </section>
      </div>
      <Routes>
        <Route path="*" element= {<List items={query.data}/>} />
        <Route path="/critical" element= {<List items={criticalQuery.data}/>} />
        <Route path="/mine" element= {<List items={myQuery.data}/>} />
      </Routes>
       </Section>
         <div className="ml-2">
         <Form/>
         </div>
       </section>
      }
    </>
  )
  
 
}


export default Index