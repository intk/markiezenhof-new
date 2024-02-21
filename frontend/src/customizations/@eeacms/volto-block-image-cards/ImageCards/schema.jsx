import config from '@plone/volto/registry';

function ImageCard(isHero = false) {
  return isHero
    ? {
        title: 'Image Card',
        fieldsets: [
          {
            id: 'default',
            title: 'Default',
            fields: ['attachedimage', 'copyright'],
          },
        ],

        properties: {
          attachedimage: {
            widget: 'attachedimage',
            title: 'Image',
          },
          copyright: {
            widget: 'slate_richtext',
            title: 'Copyright',
          },
        },

        required: ['attachedimage'],
      }
    : {
        title: 'Image Card',
        fieldsets: [
          {
            id: 'default',
            title: 'Default',
            fields: ['title', 'text', 'attachedimage', 'link', 'copyright'],
          },
        ],

        properties: {
          title: {
            type: 'string',
            title: 'Title',
          },
          text: {
            widget: 'slate_richtext',
            title: 'Text',
          },
          link: {
            widget: 'url',
            title: 'Link',
          },
          attachedimage: {
            widget: 'attachedimage',
            title: 'Image',
          },
          copyright: {
            widget: 'slate_richtext',
            title: 'Copyright',
          },
        },

        required: ['attachedimage'],
      };
}

const ImageCards = (props) => {
  const display_types_obj =
    config.blocks.blocksConfig.imagecards.blockRenderers;
  const display_types = Object.keys(display_types_obj).map((template) => [
    template,
    display_types_obj[template].title || template,
  ]);
  const selected_renderer = props && props.data.display;
  const isHero = selected_renderer === 'hero_carousel';
  const schema =
    (selected_renderer && display_types_obj[selected_renderer]?.schema) ||
    ImageCard;

  const fields = ['display', 'cards'];

  const properties = {
    display: {
      title: 'Display',
      choices: [...display_types],
      default: 'carousel',
    },
    cards: {
      widget: 'object_list',
      title: 'Images',
      description: 'Add a list of Images as Carousel Items',
      schema: schema(isHero),
    },
  };

  if (!isHero) {
    properties.title = {
      type: 'string',
      title: 'Title',
    };
    properties.text = {
      widget: 'slate_richtext',
      title: 'Text',
    };
    properties.image_scale = {
      type: 'string',
      title: 'Image scale',
      default: 'large',
    };
    properties.align = {
      title: 'Alignment',
      widget: 'align',
      type: 'string',
    };

    fields.push('title', 'text', 'image_scale', 'align');
  }

  return {
    title: 'Image Cards',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields,
      },
    ],

    properties,

    required: ['display', 'cards'],
  };
};

export default ImageCards;
