import installBlocks from './components/blocks';
import ListingView from './components/theme/View/ListingView';
import MultipleContentView from './components/theme/View/MultipleContentView';
import modifiedPanelConfig from './cookieOptions';

import TagManager from 'react-gtm-module';

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';

const tagManagerArgs = {
  gtmId: 'GTM-WHNL655',
};

__CLIENT__ && !__DEVELOPMENT__ && TagManager.initialize(tagManagerArgs);

export default function applyConfig(config) {
  const DEFAULT_LANG = 'nl';

  if (__DEVELOPMENT__) {
    config.settings.apiPath = 'http://localhost:8080/Plone';
    config.settings.internalApiPath = 'http://localhost:8080/Plone';
  }

  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'nl'];
  config.settings.defaultLanguage = DEFAULT_LANG;

  config.blocks.blocksConfig.title.view = () => null;

  config.settings.navDepth = 2;

  config.settings.apiExpanders = [
    ...config.settings.apiExpanders,
    {
      match: '',
      GET_CONTENT: ['translations', ''],
    },
  ];

  config.views.layoutViews.multiple_content = MultipleContentView;
  config.views.layoutViewsNamesMapping.multiple_content = 'Section layout';
  config.views.layoutViews.listing_view = ListingView;

  config.blocks.initialBlocks = {
    ...config.blocks.initialBlocks,
    Document: ['title', 'description'],
    Event: ['title', 'description'],
    'News Item': ['title', 'description'],
  };

  config.blocks.initialBlocksFocus = {
    ...config.blocks.initialBlocksFocus,
    Document: 'title',
    Event: 'title',
    'News Item': 'title',
  };

  config.settings[
    'volto-gdpr-privacy'
  ].defaultPanelConfig = modifiedPanelConfig;

  config.settings['volto-editablefooter'] = {
    options: { socials: true, newsletterSubscribe: true },
  };

  return installBlocks(config);
}
