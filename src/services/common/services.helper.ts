import { MAIN_API_URLS } from './services.constants';

export const getEndpointUrl = (endpointUrl: string) => `${MAIN_API_URLS.BASE}${endpointUrl}`;
