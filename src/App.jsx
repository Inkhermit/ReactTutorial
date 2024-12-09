import Banner from './components/Banner'
import CourseList from './components/CourseList';
import { useJsonQuery } from './utilities/fetch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const dataUrl = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const queryClient = new QueryClient();

const Wrap = () => {
  const [schedule, isLoading, error] = useJsonQuery(dataUrl);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>
  if (isLoading) return <h1>Loading user data...</h1>
  if (!schedule) return <h1>No user data found</h1>;

  return (<div>
    <Banner title={schedule.title}/>
    <CourseList courses={schedule.courses}/>
  </div>);
};

const App = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <Wrap/>
    </QueryClientProvider>
  );
};

export default App;