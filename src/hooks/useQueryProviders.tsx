import { useQuery } from 'react-query'
import axios from 'axios'
import { Provider } from '../types/types'

export const useQueryProviders = () => {
  const getProviders = async () => {
    const { data } = await axios.get<Provider[]>(
      `${process.env.REACT_APP_REST_URL}/get_providers`
    )
    return data
  }
  return useQuery<Provider[], Error>({
    queryKey: 'providers',
    queryFn: getProviders,
    // staleTime: ,
  })
}
