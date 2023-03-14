import React, { createContext, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/router/Router'
import { ToastProvider } from './hooks/useToast'
import { QueryClient, QueryClientProvider } from 'react-query'

export const ColorContext = createContext({
  bgColor: 'bg-gray-900',
  baseText: 'text-white',
  iconColor: 'text-gray-600',
  linkIconColor: 'text-green-300',
  linkIconColorOld: 'text-gray-600',
  linkIconColorNotReady: 'text-pink-600',
  linkIconColorBug: 'text-orange-300',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: React.VFC = () => {
  const color = useContext(ColorContext)
  return (
    <div
      className={`flex items-center flex-col min-h-screen text-gray-600 text-sm ${color.bgColor}`}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastProvider>
            <Router />
          </ToastProvider>
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </div>
  )
}

export default App
