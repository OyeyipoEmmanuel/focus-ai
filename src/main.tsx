import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGetPeriodOfDay } from './hooks/useGetPeriodOfDay.ts'
import { UserChangedProvider } from './context/UserChangeContext.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'

const queryCilent = new QueryClient()
useGetPeriodOfDay()
createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
  <QueryClientProvider client={queryCilent}>
    <BrowserRouter>
      <StrictMode>
        <UserChangedProvider>
          <App />
        </UserChangedProvider>
      </StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
  </Provider>,
)
