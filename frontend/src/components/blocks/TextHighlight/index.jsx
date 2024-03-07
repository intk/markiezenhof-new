import { TextBlockEdit, TextBlockView } from '@plone/volto-slate/blocks/Text';
import alertSVG from '@plone/volto/icons/alert.svg';
import { Container } from 'semantic-ui-react';

const installTextHighlightBlock = (config) => {
  config.blocks.blocksConfig.textHighlight = {
    id: 'textHighlight',
    title: 'Text Highlight',
    icon: alertSVG,
    group: 'common',
    view: (props) => {
      const text = props.data.plaintext.trim() || '';
      return text ? (
        <div className="block full-width text-highlight">
          <Container>
            <TextBlockView {...props} />
          </Container>
        </div>
      ) : (
        ''
      );
    },
    edit: (props) => (
      <div className="block edit-mode text-highlight">
        <TextBlockEdit {...props} />
      </div>
    ),
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
    blockHasValue: (data) => {
      // TODO: this should be handled better
      return data && !!data.plaintext?.trim();
    },
    tocEntry: (block = {}) => {
      const { value, override_toc, entry_text, level, plaintext } = block;
      const type = value?.[0]?.type;
      return override_toc && level
        ? [parseInt(level.slice(1)), entry_text]
        : config.settings.slate.topLevelTargetElements.includes(type)
        ? [parseInt(type.slice(1)), plaintext]
        : null;
    },
  };

  return config;
};

export default installTextHighlightBlock;
