import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { BodyClass } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react'; // Segment,

const ListingView = ({ content, location: { pathname } }) => {
  const { show_list_descriptions: showListDescriptions } = content || {};

  return (
    <Container id="page-folder">
      <BodyClass className="multiple-content-view" />
      <section id="content-core">
        <ListingBody
          properties={content}
          data={{ showListDescriptions }}
          path={pathname}
        />
      </section>
    </Container>
  );
};

export default ListingView;
