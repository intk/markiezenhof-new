import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const Source = ({ source = '', sourceHref }) => (
  <span className="image-source">
    <ConditionalLink condition={!!sourceHref} to={sourceHref}>
      {source}
    </ConditionalLink>
  </span>
);

const ViewImage = (props) => {
  const { data = {} } = props;
  const { source, sourceHref, imageCaption } = data;
  const Wrapper = data.align === 'full' ? 'figure' : 'div';
  const commonClasses = {
    large: data.size === 'l',
    medium: data.size === 'm',
    small: data.size === 's',
  };

  return (
    <div
      className={cx(
        'block image',
        !data.align || data.align === 'center' ? '' : `align ${data.align}`,
      )}
    >
      <Wrapper
        className={cx(
          'image-wrapper',
          data.align === 'full' && 'full-width',
          commonClasses,
        )}
      >
        {data.url && (
          <>
            {(() => {
              const image = (
                <img
                  src={
                    isInternalURL(data.url)
                      ? // Backwards compat in the case that the block is storing the full server URL
                        (() => {
                          if (data.size === 'l')
                            return `${flattenToAppURL(
                              data.url,
                            )}/@@images/image/large`;
                          if (data.size === 'm')
                            return `${flattenToAppURL(
                              data.url,
                            )}/@@images/image/preview`;
                          if (data.size === 's')
                            return `${flattenToAppURL(
                              data.url,
                            )}/@@images/image/mini`;
                          return `${flattenToAppURL(
                            data.url,
                          )}/@@images/image/large`;
                        })()
                      : data.url
                  }
                  alt={data.alt || ''}
                  loading="lazy"
                />
              );
              if (data.href) {
                if (!isInternalURL(data.href)) {
                  return (
                    <a
                      target={data.openLinkInNewTab ? '_blank' : null}
                      href={data.href}
                    >
                      {image}
                    </a>
                  );
                } else {
                  return (
                    <Link
                      to={flattenToAppURL(data.href)}
                      target={data.openLinkInNewTab ? '_blank' : null}
                    >
                      {image}
                    </Link>
                  );
                }
              } else {
                return image;
              }
            })()}
          </>
        )}
        <figcaption>
          {source && <Source source={source} sourceHref={sourceHref} />}
          {imageCaption && (
            <span className="image-caption">{imageCaption}</span>
          )}
        </figcaption>
      </Wrapper>
    </div>
  );
};

const ImageBlockView = (props) => {
  const { data = {} } = props;
  return <ViewImage {...props} data={data} />;
};

export default ImageBlockView;
