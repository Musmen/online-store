import { DEFAULT_ERROR_MESSAGE } from './common.constants';

export const fetchData = async <T>(url: string) => {
  const response: Response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText || DEFAULT_ERROR_MESSAGE);
  const result: T = await response.json();
  return result;
};
