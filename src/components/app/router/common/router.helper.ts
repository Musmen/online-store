import { notFoundPage } from '../pages/not-found-page';
import { HASH_INDEX, PATHS } from './router.constants';
import { Route } from '../models/route.model';

export const getLocationPath = () => window.location.hash.slice(HASH_INDEX).toLowerCase() || PATHS.MAIN_PAGE;

export const isRouteHasPath = (route: Route, currentPath: string) =>
  route.path.match(new RegExp(`^\\${currentPath}$`, 'gm'));

export const findPageByPath = (routes: Route[], currentPath: string) =>
  routes.find((route: Route) => isRouteHasPath(route, currentPath)) || {
    path: PATHS.NOT_FOUND,
    page: notFoundPage,
  };
