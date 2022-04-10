import React, { useEffect, useState } from 'react'
import Form from 'Components/Projects/Form'
import Section from 'Components/Common/Section'

function New() {

  return(
    <Section>
      <h1 className="Section-h1">Create a New Project</h1>
      <h2 className="mt-2 uppercase font-semibold text-stratosOrange">Details</h2>
      <Form />
    </Section>
  )
}

export default New