import useSWR from 'swr';
import { fetcher } from './index';

export const useGetUser = () => {
  const { data: user, error, ...rest } = useSWR('/api/v1/me', fetcher);
  return { user, error, loading: !user && !error, ...rest };
};
