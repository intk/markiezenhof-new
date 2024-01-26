/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { LinkMore, ConditionalLink } from '@plone/volto/components';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  const linkHref = data.linkHref?.[0]?.['@id'];
  const title = data.title ? (
    <ConditionalLink
      to={flattenToAppURL(linkHref)}
      condition={!!linkHref}
      className="hero-title-link"
    >
      <h3 className="hero-title">
        <span>{data.title}</span>
      </h3>
    </ConditionalLink>
  ) : null;

  return (
    <div className="block hero">
      <div className="block-inner-wrapper">
        {data.url && (
          <figure className="hero-image">
            <img
              src={`${flattenToAppURL(data.url)}/@@images/image/preview`}
              alt=""
              loading="lazy"
            />
          </figure>
        )}
        <div className="hero-body">
          <div className="hero-text">
            {title}
            {data.description && (
              <p className="hero-description">{data.description}</p>
            )}
            <LinkMore data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
