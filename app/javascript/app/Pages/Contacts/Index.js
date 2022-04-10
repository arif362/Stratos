import React from 'react'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import ContactOverview from 'Components/Contacts'
import Section from 'Components/Common/Section'
import ContentTwoColumn, { WideColumn, NarrowColumn } from 'Components/Common/Layout/ContentTwoColumn'
import Form from 'Components/Contacts/Form'
import List from 'Components/Contacts/List'

function Index() {

  async function getContacts() {
    const response = await apiClient.get('/contacts')
    return response.data
  }

  const query = useQuery('api/contacts', getContacts);

      //FixMe: Add ContactsOverview component back into view once working again delete lines 25-47 (<Section...to...Section>)

  return(
    <ContentTwoColumn>
      <WideColumn>
        {/* <ContactOverview /> */}
        <Section>
          <h1 className="Section-h1">Project Contacts</h1>
          <table className="w-full">
            <thead className="w-full border border-lightGray text-left">
              <tr>
                <th className="p-3 font-bold text-lg">Contact #</th>
                <th className="font-bold text-lg">Name</th>
                <th className="font-bold text-lg">Title</th>
                <th className="font-bold text-lg">Company</th>
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
      </WideColumn>
      <NarrowColumn>
        <Section>
          <h2 className="Section-h2">Add a New Contact</h2>
          <Form />
        </Section>
      </NarrowColumn>
    </ContentTwoColumn>

  )
}

export default Index
