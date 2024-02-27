/**
 * SocialLinks component.
 * @module volto-social-settings/src/components/SocialLinks/SocialLinks
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { getSocialSettings } from '../../actions/getSocialSettings';
import { XLogoSVG } from './x-twitter';

const SocialLinks = ({ wrapperCssClass, itemCssClass }) => {
  const socialSettings = useSelector((state) => state.socialSettings?.results);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSocialSettings());
  }, [dispatch]);

  return socialSettings?.length > 0 ? (
    <div className={cx('social-header', wrapperCssClass)}>
      {socialSettings.map((social) => (
        <a
          href={social.url}
          title={social.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          {social.icon === 'x-twitter' ? (
            <i className="icon large">
              <XLogoSVG />
            </i>
          ) : (
            <Icon name={social.icon} size="large" />
          )}
        </a>
      ))}
    </div>
  ) : null;
};

SocialLinks.propTypes = {
  wrapperCssClass: PropTypes.string,
  itemCssClass: PropTypes.string,
};

export default SocialLinks;
