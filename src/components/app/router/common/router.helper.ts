import { notFoundPage } from '../pages/not-found-page';
import { PATHS } from './router.constants';
import { Route } from '../models/route.model';

export const getLocationPath = () => window.location.hash.slice(1).toLowerCase() || '/';

export const isRouteHasPath = (route: Route, currentPath: string) => route.path.match(currentPath);

export const findPageByPath = (routes: Route[], currentPath: string) =>
  routes.find((route: Route) => isRouteHasPath(route, currentPath)) || {
    path: PATHS.NOT_FOUND,
    page: notFoundPage,
  };
