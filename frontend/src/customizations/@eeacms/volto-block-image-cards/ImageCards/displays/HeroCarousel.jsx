import { HeroCarouselschemaExtender } from '@eeacms/volto-block-image-cards/ImageCards/CommonAssets/schema';
import { getScaleUrl } from '@eeacms/volto-block-image-cards/ImageCards/utils';
import { getFieldURL } from '@eeacms/volto-block-image-cards/helpers';
import loadable from '@loadable/component';
import { getDateRangeDescription } from '@package/helpers/getDateRangeDescription';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { Icon } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Container, Message } from 'semantic-ui-react';
import 'slick-carousel/slick/slick.css';
import '../css/carousel.less';

const Slider = loadable(() => import('react-slick'));

const noSlidesBlock = (title, description) => {
  return (
    <div className="herosection">
      <h1 className="title no-slides">{title}</h1>
      {description && (
        <div className="description-container no-slides">
          <p id="no-slides" className="content-description no-slides">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

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

const Arrows = (props) => {
  const { slider = {} } = props;
  const [size, setSize] = useState('40px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 469) {
        setSize('0px');
      } else {
        setSize('20px');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="slider-arrow hero">
      <div className="ui container">
        <button
          className="left-arrow"
          style={{ padding: size }}
          aria-label="Prev Slide"
          onClick={() => {
            if (slider.current) {
              slider.current.slickPrev();
            }
          }}
        >
          <Icon name={leftSVG} size="40px" />
        </button>

        <button
          className="right-arrow"
          style={{ padding: size }}
          aria-label="Prev Slide"
          onClick={() => {
            if (slider.current) {
              slider.current.slickNext();
            }
          }}
        >
          <Icon name={rightSVG} size="40px" />
        </button>
      </div>
    </div>
  );
};

const HeroCarousel = (props) => {
  const intl = useIntl();
  const { data, editable, properties } = props;
  const { title, description, start, end, whole_day } = properties || {};

  const isEvent = properties?.['@type'] === 'Event';
  const endDate = new Date(end || Date.now());
  const startDate = new Date(start || Date.now());
  const isCurrentEvent = startDate <= Date.now() && endDate >= Date.now();
  const isFutureEvent = startDate > Date.now();
  const {
    cards,
    height = '90vh',
    fade = true,
    infinite = true,
    autoplay = false,
    hideArrows = false,
    pauseOnHover = true,
    autoplaySpeed = 10000,
    hideNavigationDots = true,
    hideTitle = false,
  } = data;
  const slider = React.useRef(null);

  const settings = {
    fade: fade,
    infinite: infinite,
    autoplay: autoplay && !editable,
    pauseOnHover: pauseOnHover,
    autoplaySpeed: parseInt(autoplaySpeed),
    dots: !hideNavigationDots,
    slidesToShow: 1,
    arrows: false, // we use custom arrows
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
  };

  if (!cards?.length && editable) {
    return (
      <>
        <Message>No image cards, defaulting to text</Message>
        {noSlidesBlock(title, description)}
      </>
    );
  }

  const isFirstBlock =
    props.properties?.blocks_layout?.items?.findIndex(
      (id) => id === props.id,
    ) === 0;

  return cards?.length ? (
    <div
      className={cx('block imagecards-block hero full-width', {
        'first-block': isFirstBlock,
      })}
    >
      {isFirstBlock && <BodyClass className="has-hero-section" />}
      <BodyClass className="has-carousel" />
      <div className="slider-wrapper hero" style={{ height: `${height}` }}>
        <Slider {...settings} ref={slider}>
          {(cards || []).map((card, index) => {
            const image = getFieldURL(card.attachedimage);

            return (
              <div className="slider-slide hero" key={index}>
                <div
                  className="slide-img hero"
                  style={
                    image
                      ? {
                          backgroundImage: `url(${getScaleUrl(
                            image,
                            'great',
                          )})`,
                          height: `${height}`,
                          // backgroundSize: 'fit',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }
                      : {}
                  }
                />
                <div className="slide-overlay hero"></div>
                <div className="slider-caption hero">
                  <div className="slide-body hero">
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
                    {hideTitle ? (
                      ''
                    ) : (
                      <h1 className="slide-title hero">{title || ''}</h1>
                    )}
                    {startDate && isEvent && (
                      <p className="slide-description hero">
                        {getDateRangeDescription(
                          intl.locale,
                          startDate,
                          endDate,
                          whole_day,
                        )}
                      </p>
                    )}
                  </div>
                </div>
                <div className="slide-copyright ui container hero">
                  {serializeNodes(card.copyright)}
                </div>
              </div>
            );
          })}
        </Slider>
        {!hideArrows && cards.length > 1 && <Arrows slider={slider} />}
      </div>
      {description && (
        <div className="description-container hero">
          <Container id="description">
            <p className="content-description hero">{description}</p>
          </Container>
        </div>
      )}
    </div>
  ) : (
    <>{noSlidesBlock(title, description)}</>
  );
};

export default HeroCarousel;

HeroCarousel.schemaExtender = (schema, data, intl) => {
  const Common = HeroCarouselschemaExtender({ data, schema, intl });

  return {
    ...schema,
    ...Common,
    properties: {
      ...schema.properties,
      ...Common.properties,
    },
    fieldsets: [...schema.fieldsets, ...Common.fieldsets],
  };
};
