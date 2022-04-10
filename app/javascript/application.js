

import React from 'react'
import ReactDOM from 'react-dom'
import { makeMirageServer } from './mirage'
import { register as registerServiceWorker } from './serviceWorkerRegistration'
import { AppProviders } from 'context/providers'
import AuthenticatedApp from './AuthenticatedApp'


if (process.env.NODE_ENV === "development") {
  makeMirageServer({ environment: "development" })
}

ReactDOM.render(
  <AppProviders>
    <AuthenticatedApp />
  </AppProviders>
  ,document.getElementById('app')
)

registerServiceWorker()