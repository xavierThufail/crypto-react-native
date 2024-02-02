import { FetchAPIType } from "@/constants/types";


export const fetchAPI: FetchAPIType = async (url, config) => {
  const response = await fetch(url, config);

  return await response.json();
};
