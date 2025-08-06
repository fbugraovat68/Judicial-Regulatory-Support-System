export const PAGES = {
  HOME: 'cases',
  DASHBOARD: 'dashboard',
  CASES: 'cases',
  CALENDAR: 'calendar',
  CASE_DETAILS: 'case-details',
  NOT_FOUND: '404',
  SANDBOX: 'sandbox',
  ADMIN: 'admin'
} as const;

export type PageType = typeof PAGES[keyof typeof PAGES];

export const getPagePath = (page: PageType): string => {
  switch (page) {
    case PAGES.CASES:
      return `/${PAGES.CASES}`;
    case PAGES.CASE_DETAILS:
      return `/${PAGES.CASES}/case-details`;
    case PAGES.ADMIN:
      return `/${PAGES.ADMIN}`;
    case PAGES.DASHBOARD:
      return `/${PAGES.DASHBOARD}`;
    case PAGES.CALENDAR:
      return `/${PAGES.CALENDAR}`;
    case PAGES.NOT_FOUND:
      return `/${PAGES.NOT_FOUND}`;
    case PAGES.SANDBOX:
      return `/${PAGES.SANDBOX}`;
    case PAGES.HOME:
    default:
      return `/${PAGES.HOME}`;
  }
}; 