import { DEFAULT_ERROR_MESSAGE, ROMAN_DIGITS } from './common.constants';

export const fetchData = async <T>(url: string) => {
  const response: Response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText || DEFAULT_ERROR_MESSAGE);
  const result: T = await response.json();
  return result;
};

export const convertToRomane = (number: number | string): string => ROMAN_DIGITS[Number(number)];
