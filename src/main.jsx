import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider as ReduxProvider } from 'react-redux'
import ThemeProvider from './themes/ThemeProvider.jsx'
import Router from './Router.jsx'
import { store } from './redux/store.js'
import SocketProvider from './context/SocketContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  <ReduxProvider store={store}>
    <ThemeProvider>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </ThemeProvider>
  </ReduxProvider>

  // </React.StrictMode>,
)
