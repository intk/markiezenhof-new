import ListingBody from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import { BodyClass } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react'; // Segment,

const ListingView = ({ content, location: { pathname } }) => {
  const { show_description: folderShowDescription } = content || {};

  return (
    <Container id="page-folder">
      <BodyClass className="multiple-content-view" />
      <section id="content-core">
        <ListingBody
          properties={content}
          data={{ folderShowDescription }}
          path={pathname}
        />
      </section>
    </Container>
  );
};

export default ListingView;
