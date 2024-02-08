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
      href={
        'https://gemeente-bergen-op-zoom-markiezenhof.email-provider.eu/' +
        'memberforms/subscribe/standalone/form/?a=kvlm5pg896&l=ccfiafesre'
      }
      target="_blank"
      rel="noopener noreferrer"
      className="newsletter-subscribe-link"
    >
      {intl.formatMessage(messages.subscribe)}
    </a>
  </div>
);

export default injectIntl(NewsletterSubscribe);
