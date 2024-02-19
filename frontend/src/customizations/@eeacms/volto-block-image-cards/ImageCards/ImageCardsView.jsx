import config from '@plone/volto/registry';

const CardsView = (props) => {
  const byDisplayType = {};
  const blockRenderers = config.blocks.blocksConfig.imagecards.blockRenderers;
  const block_renderers_ids = Object.keys(blockRenderers);
  block_renderers_ids.forEach(function (value) {
    byDisplayType[value] = blockRenderers[value].view;
  });

  const Impl = byDisplayType[props.data.display || 'carousel'];
  return Impl ? <Impl {...props} /> : '';
};

const ImageCardsView = (props) => {
  return (
    <div className="image-cards-wrapper">
      <CardsView {...props} />
    </div>
  );
};

export default ImageCardsView;
