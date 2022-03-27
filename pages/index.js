import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useQuery, QueryClient, dehydrate } from 'react-query';

import { getTodoList } from './api/todo';
import TodoList from '../components/TodoList/TodoList';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  const { data, isLoading, isFetching } = useQuery('todoList', getTodoList);

  return (
    <div>
      <Head>
        <title>TodoList App</title>
        <meta name='description' content='TodoList for manage your tasks' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Typography variant='headline' component='h1' align='center' className='main-title'>
        TODO LIST
      </Typography>
      <TodoList items={data} />
    </div>
  );
}
export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('todoList', getTodoList);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
