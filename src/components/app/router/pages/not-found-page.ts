import { Page } from '../models/page.model';

export const notFoundPage: Page = {
  render: () => `<h2 class="title">Error 404. Page not found!</h2>`,
};
