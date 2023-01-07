import { QueryParams } from '../models/common.model';

class QueryParamsService {
  #getURLSearchParams(): URLSearchParams {
    return new URLSearchParams(window.location.search);
  }

  #updateHistoryState(urlParams: URLSearchParams): void {
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
  }

  clearAllQueryParams() {
    window.history.replaceState({}, '', `${window.location.pathname}`);
  }

  getQueryParams(): QueryParams {
    const urlParams: URLSearchParams = this.#getURLSearchParams();
    const queryParams: QueryParams = Object.fromEntries(urlParams.entries());

    return queryParams;
  }

  addQueryParam(name: string, value: string): void {
    const urlParams: URLSearchParams = this.#getURLSearchParams();
    const newQueryParamValuesString: string = urlParams.has(name) ? `${urlParams.get(name)} ${value}` : value;
    urlParams.set(name, newQueryParamValuesString);
    this.#updateHistoryState(urlParams);
  }

  deleteQueryParam(name: string, value: string): void {
    const urlParams: URLSearchParams = this.#getURLSearchParams();

    const queryParamValuesString: string | null = urlParams.get(name);
    if (!queryParamValuesString) return;

    const queryParamValues: string[] = queryParamValuesString.split(' ');

    if (queryParamValues.length === 1) {
      urlParams.delete(name);
    } else {
      const newQueryParamValues: string[] = queryParamValues.filter((queryParamValue) => queryParamValue !== value);
      urlParams.set(name, newQueryParamValues.join(' '));
    }

    this.#updateHistoryState(urlParams);
  }

  setQueryParam(name: string, value: string): void {
    const urlParams: URLSearchParams = this.#getURLSearchParams();
    urlParams.set(name, value);
    this.#updateHistoryState(urlParams);
  }

  unsetQueryParam(name: string): void {
    const urlParams: URLSearchParams = this.#getURLSearchParams();
    urlParams.delete(name);
    this.#updateHistoryState(urlParams);
  }
}

export default new QueryParamsService();
