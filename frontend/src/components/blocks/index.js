import installButtonBlock from './Button';
import installImageBlock from './Image';
import installBreakBlock from './Break';
import installListingBlock from './Listing';
import installTeaserBlock from './Teaser';
import installTextHighlightBlock from './TextHighlight';
import { compose } from 'redux';

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
  )(config);
};

export default installBlocks;
