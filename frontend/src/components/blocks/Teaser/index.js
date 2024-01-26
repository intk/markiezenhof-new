import TeaserDefaultTemplate from './TeaserDefaultTemplate';
import TeaserHeroTemplate from './TeaserHeroTemplate';
import { TeaserSchema } from './schema';
import { TeaserBlockDataAdapter } from './dataAdapter';

export default (config) => {
  config.blocks.blocksConfig.teaser.blockSchema = TeaserSchema;
  config.blocks.blocksConfig.teaser.schema = TeaserSchema;
  config.blocks.blocksConfig.teaser.dataAdapter = TeaserBlockDataAdapter;
  config.blocks.blocksConfig.teaser.variations = [
    {
      id: 'default',
      isDefault: true,
      title: 'Default',
      template: TeaserDefaultTemplate,
    },
    {
      id: 'hero',
      isDefault: false,
      title: 'Hero',
      template: TeaserHeroTemplate,
    },
  ];
  return config;
};
