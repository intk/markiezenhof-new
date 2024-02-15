/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { LogoSVG } from '@package/components/theme/Logo/LogoSVG';
import { SmallLogoSVG } from '@package/components/theme/SmallLogo/SmallLogoSVG';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

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
const Logo = (props) => {
  const { smallLogo } = props || false;
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();

  return smallLogo === true ? (
    <UniversalLink
      className="site-logo small-logo"
      href={settings.isMultilingual ? `/${lang}` : '/'}
      title={intl.formatMessage(messages.site)}
    >
      <SmallLogoSVG title={intl.formatMessage(messages.plonesite)} />
    </UniversalLink>
  ) : (
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
