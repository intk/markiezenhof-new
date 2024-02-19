import { compose } from 'redux';
import installImageCardsBlock from '../../customizations/@eeacms/volto-block-image-cards';
import installBreakBlock from './Break';
import installButtonBlock from './Button';
import installImageBlock from './Image';
import installListingBlock from './Listing';
import installTeaserBlock from './Teaser';
import installTextHighlightBlock from './TextHighlight';

import HeroView from './Hero/HeroView';

const installBlocks = (config) => {
  config.blocks.blocksConfig.hero.view = HeroView;

  return compose(
    installListingBlock,
    installButtonBlock,
    installImageBlock,
    installBreakBlock,
    installTeaserBlock,
    installTextHighlightBlock,
    installImageCardsBlock,
  )(config);
};

export default installBlocks;
