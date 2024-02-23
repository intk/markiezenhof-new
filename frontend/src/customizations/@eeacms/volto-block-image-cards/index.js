import iconSVG from '@plone/volto/icons/images.svg';
import { ImageCardsEdit, ImageCardsView } from './ImageCards';
import { Carousel, HeroCarousel } from './ImageCards/displays';

export default (config) => {
  config.blocks.blocksConfig.imagecards = {
    id: 'imagecards',
    title: 'Image Cards',
    icon: iconSVG,
    group: 'common',
    view: ImageCardsView,
    edit: ImageCardsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockRenderers: {
      carousel: {
        title: 'Carousel',
        schema: null,
        view: Carousel,
        schemaExtender: Carousel.schemaExtender,
      },
      hero_carousel: {
        title: 'Hero Carousel & Summary',
        schema: null,
        view: HeroCarousel,
        schemaExtender: HeroCarousel.schemaExtender,
      },
    },
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};
