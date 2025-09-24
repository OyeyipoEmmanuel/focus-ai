import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGetPeriodOfDay } from './hooks/useGetPeriodOfDay.ts'

const queryCilent = new QueryClient()
useGetPeriodOfDay()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryCilent}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </QueryClientProvider>,
)
