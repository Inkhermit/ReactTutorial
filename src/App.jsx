import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <TermPage/>
    </QueryClientProvider>
  );
};

export default App;