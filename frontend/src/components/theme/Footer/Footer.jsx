/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import FooterColumns from '@package/components/theme/Footer/FooterColumns';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => (
  <footer className="site-footer" role="contentinfo">
    <Container>
      <FooterColumns />
      {/* <div className="sponsors-wrapper">
        <div className="sponsor">
          <a
            aria-label=""
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class=""></span>
          </a>
        </div>
      </div> */}
    </Container>
  </footer>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
