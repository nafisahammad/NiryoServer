import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App'
import './index.css'

// GitHub Pages SPA redirect: restore path from ?/query
(function(l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function(s) {
      return s.replace(/~and~/g, '&')
    }).join('?')
    window.history.replaceState(null, null,
      l.pathname.slice(0, -1) + decoded + l.hash
    )
  }
}(window.location))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter basename="/NiryoServer">
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
