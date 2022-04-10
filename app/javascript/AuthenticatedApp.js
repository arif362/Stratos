import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'Pages/Navigation/Navbar'
import ProjectSidebar from 'Pages/Navigation/ProjectSidebar'
import Sidebar from './app/Pages/Navigation/Sidebar';
import HomeIndex from 'Pages/Home/Index'
import ProjectsShow from 'Pages/Projects/Show'
import ProjectsNew from 'Pages/Projects/New'
import TasksIndex from 'Pages/Tasks/Index'
import TasksShow from 'Pages/Tasks/Show'
import RisksIndex from 'Pages/Risks/Index'
import RisksShow from 'Pages/Risks/Show'
import CostsIndex from 'Pages/Costs/Index'
import CorrespondenceIndex from 'Pages/Correspondence/Index'
import DocumentsIndex from 'Pages/Documents/Index'
import ProcessIndex from 'Pages/Process/Index'
import ScheduleIndex from 'Pages/Schedule/Index'
import SettingsIndex from 'Pages/Settings/Index'
import ContactsIndex from 'Pages/Contacts/Index'
import ContactsShow from 'Pages/Contacts/Show'
import CalendarIndex from 'Pages/Calendar/Index'
import FilesIndex from 'Pages/Files/Index'
import TempProjectCall from './app/utils/TempProjectCall'

function AuthenticatedApp() {

  const projectId = TempProjectCall()

  return (
    <React.Fragment>
      <Navbar />
      <div className="grid grid-cols-8">
        <div className="col-span-1">
        {projectId ? <ProjectSidebar/> : <Sidebar />}
            ENV: {process.env.NODE_ENV}
            <ToastContainer
            position="bottom-left"
            autoClose={5000}
            closeOnClick
            rtl={false}
            pauseOnHover
            />
        </div>
        <div className="m-5 col-span-7">
          <AppRoutes />
        </div>
      </div>
    </React.Fragment>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<p>404 Not Found</p>} />
      <Route path="/home" element={<HomeIndex />} />
      <Route path="/projects/new" element={<ProjectsNew />} />
      <Route path="/projects/:projectId" element={<ProjectsShow />} />
      <Route path="/tasks" element={<TasksIndex />} />
      <Route path="/tasks/:taskId" element={<TasksShow />} />
      <Route path="/risks" element={<RisksIndex />} />
      <Route path="/risks/:riskId" element={<RisksShow />} />
      <Route path="/costs/*" element={<CostsIndex />} />
      <Route path="/correspondence" element={<CorrespondenceIndex />} />
      <Route path="/files" element={<FilesIndex />} />
      <Route path="/process/*" element={<ProcessIndex />} />
      <Route path="/schedule/*" element={<ScheduleIndex />} />
      <Route path="/settings" element={<SettingsIndex />} />
      <Route path="/contacts" element={<ContactsIndex />} />
      <Route path="/contacts/:contactId" element={<ContactsShow />} />
      <Route path="/documents" element={<DocumentsIndex />} />
      <Route path="/calendar" element={<CalendarIndex />} />
    </Routes>
  )
}



export default AuthenticatedApp
