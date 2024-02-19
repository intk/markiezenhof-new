import { CommonCarouselschemaExtender } from '@eeacms/volto-block-image-cards/ImageCards/CommonAssets/schema';
import { getScaleUrl } from '@eeacms/volto-block-image-cards/ImageCards/utils';
import { getFieldURL } from '@eeacms/volto-block-image-cards/helpers';
import loadable from '@loadable/component';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { Icon, UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import cx from 'classnames';
import React from 'react';
import { Message } from 'semantic-ui-react';

import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';
import 'slick-carousel/slick/slick.css';
import '../css/carousel.less';

const Slider = loadable(() => import('react-slick'));

const Arrows = (props) => {
  const { slider = {} } = props;

  return (
    <div className="slider-arrow">
      <div className="ui container">
        <button
          className="left-arrow"
          aria-label="Prev Slide"
          onClick={() => {
            if (slider.current) {
              slider.current.slickPrev();
            }
          }}
        >
          <Icon name={leftSVG} size="55px" />
        </button>

        <button
          className="right-arrow"
          aria-label="Prev Slide"
          onClick={() => {
            if (slider.current) {
              slider.current.slickNext();
            }
          }}
        >
          <Icon name={rightSVG} size="55px" />
        </button>
      </div>
    </div>
  );
};

const HeroCarousel = (props) => {
  const { data, editable } = props;
  const {
    cards,
    image_scale,
    height = '950',
    fade = true,
    infinite = true,
    autoplay = true,
    hideArrows = false,
    pauseOnHover = true,
    autoplaySpeed = 10000,
    hideNavigationDots = true,
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
    return <Message>No image cards</Message>;
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
      <div className="slider-wrapper hero" style={{ height: `${height}px` }}>
        <Slider {...settings} ref={slider}>
          {(cards || []).map((card, index) => {
            const link = getFieldURL(card.link);
            const image = getFieldURL(card.attachedimage);

            return (
              <div className="slider-slide" key={index}>
                <div
                  className="slide-img"
                  style={
                    image
                      ? {
                          backgroundImage: `url(${getScaleUrl(
                            image,
                            image_scale || 'large',
                          )})`,
                          height: `${height}px`,
                        }
                      : {}
                  }
                />
                <div className="slide-overlay"></div>
                <div className="slider-caption ui container">
                  <div className="slide-body">
                    {card.link ? (
                      <UniversalLink href={link}>
                        <div className="slide-title">{card.title || ''}</div>
                      </UniversalLink>
                    ) : (
                      <div className="slide-title">{card.title || ''}</div>
                    )}
                    {/* Incomplete backward-compatibility: */}
                    {card.text?.data ? (
                      <div
                        className="slide-description"
                        dangerouslySetInnerHTML={{
                          __html: card.text?.data || '',
                        }}
                      />
                    ) : (
                      <div className="slide-description">
                        {serializeNodes(card.text)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="slide-copyright ui container">
                  {serializeNodes(card.copyright)}
                </div>
              </div>
            );
          })}
        </Slider>
        {!hideArrows && cards.length > 1 && <Arrows slider={slider} />}
      </div>
    </div>
  ) : (
    ''
  );
};

export default HeroCarousel;

HeroCarousel.schemaExtender = (schema, data, intl) => {
  const Common = CommonCarouselschemaExtender({ data, schema, intl });

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
