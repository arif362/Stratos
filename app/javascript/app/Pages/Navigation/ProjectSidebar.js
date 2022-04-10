import React from 'react'
import { Link } from 'react-router-dom'


function ProjectSidebar({}) {
  return (
    <nav className="p-4 bg-stratosGray h-full">
      <ul className="text-sm text-white space-y-4">
        <li>
          <Link to="/home" className="sidebar-link-decoration ">Project Home</Link>
        </li>
        <li>
          <Link to="/settings" className="sidebar-link-decoration">Project Administration</Link>
        </li>
        <li>
          <Link to="/costs" className="sidebar-link-decoration">Project Cost Management</Link>
        </li>
        <li>
          <Link to="/risks" className="sidebar-link-decoration">Project Risk</Link>
        </li>
        <li>
          <Link to="/schedule" className="sidebar-link-decoration">Project Schedule</Link>
        </li>
        <li>
          <Link to="/tasks" className="sidebar-link-decoration">Project Tasks</Link>
        </li>
        <li>
          <Link to="/correspondence" className="sidebar-link-decoration">Project Correspondence</Link>
        </li>
        <li>
          <Link to="/documents" className="sidebar-link-decoration">Project Documents</Link>
        </li>
        <li>
          <Link to="/process" className="sidebar-link-decoration">Project Process Map</Link>
        </li>
        <li>
          <Link to="/contacts" className="sidebar-link-decoration">Project Contacts</Link>
        </li>
        <li>
          <Link to="/calendar" className="sidebar-link-decoration">Project Calendar</Link>
        </li>
      </ul>
    </nav>
  )
}

export default ProjectSidebar