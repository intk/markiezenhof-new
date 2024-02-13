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

  config.settings['volto-gdpr-privacy'].defaultPanelConfig = {
    ...modifiedPanelConfig,
    text: {
      en: {
        title: 'This site uses cookies',
        description:
          'For this website we use cookies for anonymous analytics gathering and show external content. You can also enable third parties independently.',
      },
      nl: {
        title: 'Deze site gebruikt cookies',
        description:
          'Voor deze website gebruiken we cookies voor anonieme statistieken en het tonen van externe content. U kunt ook onafhankelijk derden inschakelen.',
      },
    },
    technical: {
      text: {
        en: {
          title: 'Required cookies',
          description:
            'This website uses cookies for visitor analytics and login functionality. No personal identifiable information is collected or exchanged with third parties.',
        },
        nl: {
          title: 'Noodzakelijke cookies',
          description:
            'Deze website gebruikt cookies voor bezoekersstatistieken en login functionaliteit. Er wordt geen persoonlijke informatie verzameld of gedeeld met derden.',
        },
      },
      choices: [],
    },
    profiling: {
      text: {
        en: {
          title: 'Third party integrations',
          description:
            'To show rich content from other websites we use integrations from third parties. These might set cookies and collect personal data that can be used for profiling purposes across websites. You can disable individual services below.',
        },
        nl: {
          title: 'Derde partij integraties',
          description:
            'Om rijke content van andere websites te tonen gebruiken we integraties van derden. Deze kunnen cookies instellen en persoonlijke data verzamelen die gebruikt kan worden voor profilering over websites heen. U kunt individuele services hieronder uitschakelen.',
        },
      },
      choices: [
        ...modifiedPanelConfig.profiling.choices,
        {
          config_key: 'GTAG',
          text: {
            en: {
              title: 'Google Tag Manager',
              description:
                'Google Tag Manager is a tag management system that allows you to manage and deploy marketing tags (snippets of code or tracking pixels) on your website. Google Tag Manager does not collect any personal data.',
            },
            nl: {
              title: 'Google Tag Manager',
              description:
                'Google Tag Manager is een tag management systeem dat u in staat stelt om marketing tags (stukjes code of tracking pixels) te beheren en implementeren op uw website. Google Tag Manager verzamelt geen persoonlijke data.',
            },
          },
        },
      ],
    },
  };

  config.settings['volto-editablefooter'] = {
    options: { socials: true, newsletterSubscribe: true },
  };

  return installBlocks(config);
}
