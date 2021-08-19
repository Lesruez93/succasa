import './ExploreContainer.css';
import useSWR from "swr";
import {fetcher, fetcherOption} from "../api";


function User()  {
  const { data, error } = useSWR('auth/user', fetcher,fetcherOption);

  return data
}

export default User
