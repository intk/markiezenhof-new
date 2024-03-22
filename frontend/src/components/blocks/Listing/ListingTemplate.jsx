import { getDateRangeDescription } from '@package/helpers/getDateRangeDescription';
import { ConditionalLink, UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Grid } from 'semantic-ui-react';

const Card = ({ item, showDescription = true, hideDates = false }) => {
  const intl = useIntl();
  const wholeDay = typeof item.whole_day === 'boolean' ? item.whole_day : true;
  const start = item.start ? new Date(item.start) : undefined;
  const end = item.end ? new Date(item.end) : undefined;
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
      {!hideDates && (
        <div className="event-label">
          {item['@type'] === 'Event' && start && end && (
            <div className="listing-dates">
              <div className={`listing-dates-wrapper`}>
                {getDateRangeDescription(intl.locale, start, end, wholeDay)}
              </div>
            </div>
          )}
          {item['@type'] === 'News Item' && (
            <div className="listing-dates">
              <div className={`listing-dates-wrapper`}>
                {getDateRangeDescription(intl.locale, start, end, wholeDay)}
              </div>
            </div>
          )}
        </div>
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
    hideDates = false,
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
              hideDates={hideDates}
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
