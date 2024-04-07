import { RouteNeedParams, routes } from '@/routes/RouterProvider';

export const convertLabelToUrl = (label: string) => {
  return label
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const convertUrlToLabel = (url: string) => {
  return url
    .replace(/-/g, ' ')
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

export type RouteType = {
  path: RouteNeedParams;
  params?: {
    [key: string]: string;
  };
};

export const getPath = (props: RouteType) => {
  let route = routes[props.path];
  if (props.params) {
    Object.keys(props.params).forEach((key) => {
      if (!props.params) return;
      route = route.replace(`:${key}`, props.params[key]);
    });
  }
  return route;
};
