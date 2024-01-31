import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  subscribe: {
    id: 'Subscribe',
    defaultMessage: 'Subscribe',
  },
});

const NewsletterSubscribe = ({ intl }) => (
  <div className="newsletter-subscribe">
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="newsletter-subscribe-link"
    >
      {intl.formatMessage(messages.subscribe)}
    </a>
  </div>
);

export default injectIntl(NewsletterSubscribe);
