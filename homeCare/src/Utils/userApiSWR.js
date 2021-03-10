import useSWR from 'swr';
import api from '../services/api';

export function useApiSWR(url) {
  const {data, error} = useSWR(url, async (url) => {
    const response = await api.get(url, {
      headers: {cpf: '63446014500'},
      params,
    });
    const data = await response.data;
    console.log(data);
    return data;
  });

  return {data, error};
}
