import { ConditionalLink, UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const Card = ({ item, showDescription = true }) => {
  const image = item?.image_field
    ? `${item['@id']}/${
        item.image_scales[item.image_field]?.[0]?.scales?.teaser?.download
      }`
    : null;
  return (
    <div className="plone-item-card">
      {image && (
        <UniversalLink
          href={item['@id']}
          className="plone-item-card-link"
          title={item.title}
        >
          <figure className="listing-image">
            <img src={image} alt="" />
          </figure>
        </UniversalLink>
      )}
      <UniversalLink href={item['@id']} className="plone-item-card-link">
        <h3 className="plone-item-title">
          <span>{item.title}</span>
        </h3>
      </UniversalLink>
      {!!showDescription && (
        <p className="plone-item-description">{item.description}</p>
      )}
    </div>
  );
};

const ListingTemplate = (props) => {
  const {
    items,
    linkTitle,
    linkHref,
    showDescription = false,
    isEditMode,
    showListDescriptions = false,
  } = props;

  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <UniversalLink href={href}>{linkTitle || href}</UniversalLink>;
  }

  return (
    <div className="listing-template">
      {link && <div className="showmore-link">{link}</div>}

      <Grid columns={3} className="listings">
        {items.map((item, i) => (
          <Grid.Column
            mobile={12}
            tablet={6}
            computer={4}
            className="listing-column"
            key={i}
          >
            <Card
              item={item}
              showDescription={showDescription || showListDescriptions}
            />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

ListingTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ListingTemplate;
