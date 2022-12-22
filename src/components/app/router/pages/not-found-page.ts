import { Page } from '../models/page.model';

export const notFoundPage: Page = {
  render: () => `<h2 style="color:white;">Error 404. Page not found!</h2>`,
};
