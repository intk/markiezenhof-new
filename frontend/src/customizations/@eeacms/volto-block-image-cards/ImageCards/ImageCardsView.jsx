import config from '@plone/volto/registry';
import cx from 'classnames';

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
  const { display, align } = props.data || undefined;

  return (
    <div
      className={cx(
        'image-cards-wrapper',
        display === 'hero_carousel' ? 'hero' : '',
        align === 'full' ? 'full' : '',
      )}
    >
      <CardsView {...props} />
    </div>
  );
};

export default ImageCardsView;
