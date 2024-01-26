/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import LogoSVG from '@package/components/theme/Logo/LogoSVG';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();

  return (
    <UniversalLink
      className="site-logo"
      href={settings.isMultilingual ? `/${lang}` : '/'}
      title={intl.formatMessage(messages.site)}
    >
      <LogoSVG title={intl.formatMessage(messages.plonesite)} />
    </UniversalLink>
  );
};

export default Logo;
