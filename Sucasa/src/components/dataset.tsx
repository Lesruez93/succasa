import './ExploreContainer.css';
import useSWR from "swr";
import {fetcher, fetcherOption} from "../api";
import {PropertyImagesStore} from "../Store/UserStore";


function Dataset(id:any)  {
  const { data, error } = useSWR('propertyimages?filter[property_id]=' + id, fetcher,fetcherOption);


  return data
}

export default Dataset
