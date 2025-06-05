import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { PokedexPost } from './assets/components/PokedexPost'



function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <PokedexPost/>
      </QueryClientProvider>
    </>
  )
}

export default App
