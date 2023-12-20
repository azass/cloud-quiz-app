import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/router/Router'
import { ToastProvider } from './hooks/useToast'
import { QueryClient, QueryClientProvider } from 'react-query'
import Colors from './consts/colors'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: React.FC = () => {
  return (
    <div
      className={`flex items-center flex-col h-screen overscroll-y-contain text-gray-600 text-sm py-4 ${Colors.baseBg}`}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastProvider>
            <Router />
          </ToastProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
