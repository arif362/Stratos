import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Collapsible from 'Components/Common/Collapsible'
import Section from 'Components/Common/Section'
import Button from 'Components/Common/Button'
import BudgetForm from 'Components/Costs/Forms/BudgetItem'
import ContractForm from 'Components/Costs/Forms/Contract'
import InvoiceFrom from 'Components/Costs/Forms/Invoice'
import ProformaTable from 'Components/Costs/Tables/ProformaTable'
import { Field } from 'Components/Common/Forms'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import { allCategories as categoriesQueryKey } from 'utils/queryKeys'
import { allProjects as projectsQueryKey } from 'utils/queryKeys'
import {
  costsURL,
  costsContractsURL,
  costsInvoicesURL
} from 'utils/urls'

function Index() {

  async function getCategories() {
    const resp = await apiClient.get("/categories")
    return resp.data
  }

  const categories = useQuery(categoriesQueryKey, getCategories)

  async function getProjects() {
    const response = await apiClient.get("/projects")
    return response.data
  }

  const projects = useQuery(projectsQueryKey, getProjects)

  const currentURL = useLocation()
  const [ showForm, setShowForm ] = useState(false);
  const [ selectedProject, setSelectedProject ] = useState();

  const openForm = () => {
    setShowForm(true)
  }

  const showFormButton = (url) => {
    switch(url) {
      case costsURL():
        return <button className="orange-transparent-button" onClick={() => openForm()}>Add Budget Item</button>
      case costsContractsURL():
        return <button className="orange-transparent-button" onClick={() => openForm()}>Add Contract</button>
      case costsInvoicesURL():
        return  <button className="orange-transparent-button" onClick={() => openForm()}>Add Invoice</button>
    }
  }

  const displayForm = (url, categories, selectedProject) => {
    switch(url){
      case costsURL():
        return <BudgetForm setShowForm={setShowForm}></BudgetForm>
      case costsContractsURL():
        return <ContractForm setShowForm={setShowForm}></ContractForm>
      case costsInvoicesURL():
        return <InvoiceFrom setShowForm={setShowForm} categories={categories} projectId={selectedProject}></InvoiceFrom>
    }
  }

  const handleChange = (e) => {
    setSelectedProject(e.target.value);
  }

  return(
    <section className="flex flex-row">
      <Section>
      <div className="flex flex-row justify-between">
        <section className="flex flex-row space-x-4 mb-4">
          <Link to={costsURL()} className={`pb-2 Section-h1 ${currentURL.pathname === costsURL() ? "border-b-2 border-stratosOrange" : "text-lightGray"}` }>
          Project Proforma
          </Link>
          <Link to={costsContractsURL()} className={`pb-2 Section-h1 ${currentURL.pathname === costsContractsURL() ? "border-b-2 border-stratosOrange" : "text-lightGray"}` }>
          Project Contracts
          </Link>
          <Link to={costsInvoicesURL()} className={`pb-2 Section-h1 ${currentURL.pathname === costsInvoicesURL() ? "border-b-2 border-stratosOrange" : "text-lightGray"}` }>
          Project Invoices
          </Link>
        </section>
         <Field>
            <select className="input-select" value={selectedProject} onChange={handleChange}>
              <option value="">Select Project</option>
              {projects.isLoading ?
                <option value="0">Loading</option>
                : projects.data.map((project) => {
                  return (
                    <option key={project.id} value={project.id}> {project.attributes.name} </option>
                  )
                })
              }
            </select>
        </Field>
        <div>{showFormButton(currentURL.pathname)}</div>
      </div>
      <Routes>
        <Route path="*" element={selectedProject ? <ProjectProforma categories={categories} selectedProject={selectedProject} /> : <p>Please Select the project</p>} />
        <Route path="/contracts" element={<ProjectContracts />} />
        <Route path="/invoices" element={<ProjectInvoices />} />
      </Routes>
      <div className="mt-4 flex justify-end">
        <Button buttonStyle={'orange-transparent-button'}>Export to PDF</Button>
      </div>
    </Section>
    {showForm ?
      <div className="ml-2">
        {displayForm(currentURL.pathname, categories, selectedProject)}
      </div>
      : null
    }
    </section>
  )
}

export default Index

function CollapsibleComponent() {
  return (
    <section className="border border-outlineGray">
    <Collapsible title="A. Land Cost" style="border-b border-outlineGray">
    <div className="table-container" role="table" aria-label="Destinations">
    <div className="flex-table header" role="rowgroup">
    <div className="flex-row first" role="columnheader">Country</div>
    <div className="flex-row" role="columnheader">Events</div>
    <div className="flex-row" role="columnheader">Time</div>
    <div className="flex-row" role="columnheader">Fees</div>
</div>
</div>
      </Collapsible>
      <Collapsible title="B. Hard Cost" style="border-b border-outlineGray">
        <h2>THIS SHOULD BE HIDDEN</h2>
      </Collapsible>
      <Collapsible title="C. Soft Cost" style="border-b border-outlineGray">
        <h2>THIS SHOULD BE HIDDEN</h2>
      </Collapsible>
  </section>
  )
}

function ProjectProforma(props) {
  let categories = props.categories.data
  let selectedProject = props.selectedProject
  let markup = ''
  { categories ?
    markup = (
      <section className="border border-outlineGray">
        {
          categories.map((category) => {
            return (
              <Collapsible title={category.attributes.name} key={category.id} style="border-b border-outlineGray">
                <ProformaTable majorCategory={category.attributes.name} projectId={selectedProject} ></ProformaTable>
              </Collapsible>
            )
          })
        }
      </section>
    )
  :
    markup = (<p>No data found!</p>)
  }
  return markup
}

function ProjectContracts() {

  return (
    <section className="border border-outlineGray">
      <Collapsible title="A. Land Cost" style="border-b border-outlineGray">
      <ProformaTable></ProformaTable>
      </Collapsible>
      <Collapsible title="B. Hard Cost" style="border-b border-outlineGray">
      <ProformaTable></ProformaTable>
      </Collapsible>
      <Collapsible title="C. Soft Cost" style="border-b border-outlineGray">
      <ProformaTable></ProformaTable>
      </Collapsible>
  </section>
  )
}

function ProjectInvoices() {

  return (
    <section className="border border-outlineGray">
      <Collapsible title="A. Land Cost" style="border-b border-outlineGray">
      <ProformaTable></ProformaTable>
      </Collapsible>
      <Collapsible title="B. Hard Cost" style="border-b border-outlineGray">
      <ProformaTable></ProformaTable>
      </Collapsible>
      <Collapsible title="C. Soft Cost" style="border-b border-outlineGray">
      <ProformaTable></ProformaTable>
      </Collapsible>
  </section>
  )
}
