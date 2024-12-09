import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const dataUrl = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const queryClient = new QueryClient();

const App = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <TermPage/>
    </QueryClientProvider>
  );
};

export default App;