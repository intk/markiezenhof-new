import PropTypes from 'prop-types';
import { useRef } from 'react';
// import { ListingBlockHeader } from '@package/components';
import useInViewHomepage from '@package/helpers/useInViewHomepage';
import { Icon, UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';
import { defineMessages, useIntl } from 'react-intl';
import ReactSwipe from 'react-swipe';
import SlideshowPreview from '../../theme/SlideshowPreview/SlideshowPreview';
import './less/HomepageSliderTemplate.less';

const messages = defineMessages({
  pastExibition: {
    id: 'Past exhibition',
    defaultMessage: 'Past exhibition',
  },
  nowOnDisplay: {
    id: 'Now on display',
    defaultMessage: 'Now on display',
  },
  future: {
    id: 'Future',
    defaultMessage: 'Future',
  },
});

const getDateRangeDescription = (lang, start, end) => {
  if (
    !end ||
    (start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear() &&
      start.getDate() === end.getDate())
  ) {
    return new Intl.DateTimeFormat(lang, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(start);
  }

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${new Intl.DateTimeFormat(lang, {
      day: 'numeric',
    }).format(start)} ${lang === 'nl' ? 't/m' : 'to'} ${new Intl.DateTimeFormat(
      lang,
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      },
    ).format(end)}`;
  }

  return `${new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    month: 'short',
  }).format(start)} ${lang === 'nl' ? 't/m' : 'to'} ${new Intl.DateTimeFormat(
    lang,
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  ).format(end)}`;
};

const Card = ({ item, index }) => {
  const { title, start, end } = item || {};
  const isEvent = item?.['@type'] === 'Event';
  const endDate = new Date(end || Date.now());
  const startDate = new Date(start || Date.now());
  const isCurrentEvent = startDate <= Date.now() && endDate >= Date.now();
  const isFutureEvent = startDate > Date.now();

  const intl = useIntl();
  const ref = useRef();
  const titleInView = useInViewHomepage(ref);

  return (
    <div className="plone-item-card" ref={ref}>
      {titleInView ? (
        <BodyClass className="homepage-title-in-view" />
      ) : (
        <BodyClass className="homepage-title-out-of-view" />
      )}
      <UniversalLink href={item['@id']} className="plone-item-card-link">
        <div className="content">
          <SlideshowPreview {...item} lazy={index !== 0} />
          <div className="title-wrapper">
            <div className="title-description">
              <div className="slide-description">
                {startDate && isEvent && (
                  <div className="hero event-label">
                    <span
                      className={
                        isFutureEvent
                          ? 'future'
                          : isCurrentEvent
                          ? 'current'
                          : 'past'
                      }
                    >
                      {isFutureEvent
                        ? intl.formatMessage(messages.future)
                        : isCurrentEvent
                        ? intl.formatMessage(messages.nowOnDisplay)
                        : intl.formatMessage(messages.pastExibition)}
                    </span>
                  </div>
                )}
                <h1 className="slide-title hero">{title || ''}</h1>
                {startDate && isEvent && (
                  <p className="slide-description hero">
                    {getDateRangeDescription(intl.locale, startDate, endDate)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </UniversalLink>
    </div>
  );
};

const HomepageSliderTemplate = (props) => {
  const { items, firstBlock } = props;
  let reactSwipeEl;

  return (
    <div className={`homepage-slider-template ${firstBlock ? 'hero' : ''}`}>
      {firstBlock && <BodyClass className="has-hero-section" />}
      <div className="content-wrapper">
        <ReactSwipe
          className="listing-slider"
          swipeOptions={{
            continuous: true,
          }}
          ref={(el) => (reactSwipeEl = el)}
        >
          {items.map((item, index) => (
            <div>
              <Card item={item} index={index} />
            </div>
          ))}
        </ReactSwipe>
        {items.length > 1 && (
          <div className="buttons">
            <button
              aria-label="left-arrow"
              className="left-button"
              onClick={() => {
                reactSwipeEl.prev();
              }}
            >
              <Icon name={leftSVG} size="40px" />
            </button>
            <button
              aria-label="right-arrow"
              className="right-button"
              onClick={() => {
                reactSwipeEl.next();
              }}
            >
              <Icon name={rightSVG} size="40px" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

HomepageSliderTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default HomepageSliderTemplate;
