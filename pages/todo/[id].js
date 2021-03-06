import Head from 'next/head';
import Image from 'next/image';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getTodoById } from '../api/todo';
import SingleTodoItem from '../../components/SingleTodo/SingleTodoItem';
import Typography from '@material-ui/core/Typography';

export default function SingleTodo() {
  const { query } = useRouter();

  const { data, isError, isLoading } = useQuery(['todo', query.id], () => getTodoById(query.id));

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Typography variant='headline' component='h1' align='center' className='main-title'>
        TODO LIST
      </Typography>

      <SingleTodoItem title={data?.title} subject={data?.subject} status={data?.status} />
    </div>
  );
}
export async function getStaticPaths() {
  const res = await axios.get('https://front-end-todo-test.herokuapp.com/todos', { params: { key: 'ois-006' } }).catch((err) => err);
  const data = await res.data;
  const paths = data.map((todo) => {
    return {
      params: {
        id: `${todo._id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('todo', getTodoById(params.id));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
