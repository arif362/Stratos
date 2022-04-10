import React from 'react'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Section from 'Components/Common/Section'
import List from 'Components/Contacts/List';

function ContactOverview() {

  async function getContacts() {
    // TODO: Either per company or per project. Need to clarify
    // If all items are per project, will there be direct to the project in all Models?
    const response = await apiClient.get('/api/contacts')
    return response.data
  }

  const query = useQuery('api/contacts', getContacts)

  return(
    <Section>
      <h1 className="Section-h1">Project Contacts</h1>
      <table className="w-full">
        <thead className="w-full border border-lightGray text-left">
          <tr>
            <th className="p-3 font-bold text-lg">Contact #</th>
            <th className="font-bold text-lg">Name</th>
            <th className="font-bold text-lg">Title</th>
            <th className="font-bold text-lg">Email</th>
            <th className="font-bold text-lg">Phone</th>
          </tr>
        </thead>
        <tbody>
          { query.isLoading
            ? <tr><td colSpan="6"><p>Loading contacts ...</p></td></tr>
            : query.data.length
              ? <List items={query.data} />
              : <tr><td colSpan="6"><p>No Contacts</p></td></tr>
          }
        </tbody>
      </table>
    </Section>
  )
}

export default ContactOverview;
