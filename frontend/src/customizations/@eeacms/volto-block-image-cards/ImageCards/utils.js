import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';

export const getScaleUrl = (url, size) => {
  if (!url) return url;
  return url.includes(config.settings.apiPath)
    ? `${flattenToAppURL(url.replace('/api', ''))}/@@images/image/${size}`
    : `${url.replace('/api', '')}/@@images/image/${size}`;
};
