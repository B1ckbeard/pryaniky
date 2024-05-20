const host = 'https://test.v5.pryaniky.com';
const path = 'ru/data/v3/testmethods/docs';

export const routes = {
  loginUrl: () => [host, path, 'login'].join('/'),
  getDataUrl: () => [host, path, 'userdocs/get'].join('/'),
  addDataurl: () => [host, path, 'userdocs/create'].join('/'),
  deleteUrl: () => [host, path, 'userdocs/delete'].join('/'),
  updateDataUrl: () => [host, path, 'userdocs/set'].join('/'),
  loginPage: () => '/login',
  mainPage: () => '/',
};

export default routes;
