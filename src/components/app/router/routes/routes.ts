import { mainPage } from '../pages/main-page';
import { cartPage } from '../pages/cart-page';
import { notFoundPage } from '../pages/not-found-page';
import { productPage } from '../pages/product-page';

import { PATHS } from '../common/router.constants';

import { Route } from '../models/route.model';

const routes: Route[] = [
  { path: PATHS.MAIN_PAGE, page: mainPage },
  { path: PATHS.CART, page: cartPage },
  { path: PATHS.PRODUCT, page: productPage },
  { path: PATHS.NOT_FOUND, page: notFoundPage },
];

export default routes;
