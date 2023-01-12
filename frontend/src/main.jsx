import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider,QueryClient } from 'react-query'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './store/store'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider >
)
