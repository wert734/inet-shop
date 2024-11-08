import { RouterProvider } from 'react-router-dom'
import './scss/main.scss'
import { createRoot } from 'react-dom/client'
import { router } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ToastContainer/>
  </QueryClientProvider>
)
