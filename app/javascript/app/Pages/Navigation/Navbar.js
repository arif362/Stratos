import React from 'react'
import { Link } from 'react-router-dom'
import { homeURL } from 'utils/urls'

function Navbar() {
	return(
    <nav className="pt-4 pr-4 bg-darkGray text-white flex justify-start">
      <div className="m-4">
        <img src="/Stratos_logo_white.svg" className="h-6"/>
      </div>
      <ul className="space-x-10 ml-3 pt-5">
        <li className="inline-block navigation-link-decoration">
          <Link to={homeURL()}>My Projects</Link>
        </li>
        <li className="inline-block navigation-link-decoration">
          <Link to="/tasks">My Tasks</Link>
        </li>
        <li className="inline-block navigation-link-decoration">
          <Link to="/correspondence">Correspondence</Link>
        </li>
        <li className="inline-block navigation-link-decoration">
          <Link to="/documents">Project Documents</Link>
        </li>
        <li className="inline-block navigation-link-decoration">
          <Link to="/process" >Process </Link>
        </li>
        <li className="inline-block navigation-link-decoration">
          <Link to="/files">Forms & Templates</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar