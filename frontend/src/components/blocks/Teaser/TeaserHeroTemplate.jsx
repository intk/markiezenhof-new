import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import { getTeaserImageURL } from '@plone/volto/components/manage/Blocks/Teaser/utils';
import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { BodyClass } from '@plone/volto/helpers';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
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

const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;

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

const TeaserHeroTemplate = (props) => {
  const { className, data, isEditMode } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const align = data?.styles?.align;

  const hasImageComponent = config.getComponent('Image').component;
  const Image = config.getComponent('Image').component || DefaultImage;
  const { openExternalLinkInNewTab } = config.settings;
  const defaultImageSrc =
    href && flattenToAppURL(getTeaserImageURL({ href, image, align }));

  const isEvent = data.href?.[0]?.['@type'] === 'Event';
  const end = new Date(data.href?.[0]?.end || Date.now());
  const start = new Date(data.href?.[0]?.start || Date.now());

  const isCurrentEvent = start <= Date.now() && end >= Date.now();
  const isFutureEvent = start > Date.now();

  const isFirstBlock =
    props.properties?.blocks_layout?.items?.findIndex(
      (id) => id === props.id,
    ) === 0;

  return (
    <div
      className={cx('block teaser hero full-width', className, {
        'first-block': isFirstBlock,
      })}
    >
      <>
        {isFirstBlock && <BodyClass className="has-hero-section" />}
        {!href && isEditMode && (
          <Message>
            <div className="teaser-item placeholder">
              <img src={imageBlockSVG} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            </div>
          </Message>
        )}
        {href && (
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={
              data.openLinkInNewTab ||
              (openExternalLinkInNewTab && !isInternalURL(href['@id']))
                ? '_blank'
                : null
            }
          >
            <div className="teaser-item hero">
              {(href.hasPreviewImage || href.image_field || image) && (
                <div className="image-wrapper">
                  <Image
                    src={hasImageComponent ? href : defaultImageSrc}
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
              <div className="content">
                {isEvent && (
                  <div className="event-label">
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
                {data?.head_title && (
                  <div className="headline">{data.head_title}</div>
                )}
                <h2>{data?.title}</h2>
                {!data.hide_description && !isEvent && (
                  <p>{data?.description}</p>
                )}
                {isEvent && (
                  <p className="hero-dates">
                    {getDateRangeDescription(intl.locale, start, end)}
                  </p>
                )}
              </div>
            </div>
          </MaybeWrap>
        )}
      </>
    </div>
  );
};

TeaserHeroTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserHeroTemplate;
