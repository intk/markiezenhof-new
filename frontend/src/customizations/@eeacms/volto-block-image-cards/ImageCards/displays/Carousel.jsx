import React from 'react';
import cx from 'classnames';
import loadable from '@loadable/component';
import { Message } from 'semantic-ui-react';
import { Icon, UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { getFieldURL } from '@eeacms/volto-block-image-cards/helpers';
import { getScaleUrl } from '@eeacms/volto-block-image-cards/ImageCards/utils';
import { CommonCarouselschemaExtender } from '@eeacms/volto-block-image-cards/ImageCards/CommonAssets/schema';

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

const Carousel = (props) => {
  const { data, editable } = props;
  const {
    cards,
    image_scale,
    height = '600',
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

  return cards?.length ? (
    <div
      className={cx(
        'block align imagecards-block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <BodyClass className="has-carousel" />
      <div
        className={cx({
          'full-width': data.align === 'full',
        })}
      >
        <div className="slider-wrapper" style={{ height: `${height}px` }}>
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
    </div>
  ) : (
    ''
  );
};

export default Carousel;

Carousel.schemaExtender = (schema, data, intl) => {
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
