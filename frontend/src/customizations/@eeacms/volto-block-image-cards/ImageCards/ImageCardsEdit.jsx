import { SidebarPortal } from '@plone/volto/components';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';
import config from '@plone/volto/registry';

import ImageCardsView from './ImageCardsView';
import ImageCardSchema from './schema';

const tweakSchema = (schema, data) => {
  const { blockRenderers } = config.blocks.blocksConfig.imagecards;
  const extension = data.display
    ? blockRenderers[data.display]?.schemaExtender
    : null;
  return extension ? extension(schema, data) : schema;
};

const CardsEdit = (props) => {
  const { selected, onChangeBlock, data = {}, block } = props;
  const basicSchema = ImageCardSchema(props);
  const schema = tweakSchema(basicSchema, props.data);

  return (
    <>
      <ImageCardsView {...props} />

      <SidebarPortal selected={selected}>
        <InlineForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

const ImageCardsEdit = (props) => {
  return <CardsEdit {...props} />;
};

export default ImageCardsEdit;
