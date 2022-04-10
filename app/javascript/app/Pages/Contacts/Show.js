import React from 'react'
import { useParams } from 'react-router-dom'
import { client as apiClient } from 'utils/api'
import { useQuery } from 'react-query'
import Section from 'Components/Common/Section'

function Show() {

    const { contactId } = useParams()

    async function getContact() {
        const response = await apiClient.get(`/contacts/${contactId}`)
        return response.data
    }

    const query = useQuery(['api/contact', contactId], getContact)

    return(
        <Section>
            {query.isLoading
                ? <p>Loading.</p>
                : <div>
                    <h1 className="Section-h1">Contact #{query.data.attributes["id"]}</h1>
                    <ul>
                        <li>{query.data.attributes["first_name"]}</li>
                        <li>{query.data.attributes["last_name"]}</li>
                        <li>{query.data.attributes["title"]}</li>
                        <li>{query.data.attributes["phone"]}</li>
                    </ul>
                </div>

            }
        </Section>
    )
}

export default Show
