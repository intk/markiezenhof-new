// See https://react-slick.neostack.com/docs/api
export const CommonCarouselschemaExtender = ({ data }) => {
  return {
    fieldsets: [
      {
        id: 'settings',
        title: 'Carousel Settings',
        fields: [
          'autoplay',
          ...(data.autoplay ? ['autoplaySpeed'] : []),
          'pauseOnHover',
          'infinite',
          'hideArrows',
          'hideNavigationDots',
          'fade',
          'height',
          'hideTitle',
        ],
      },
    ],
    properties: {
      autoplay: {
        type: 'boolean',
        title: 'Autoplay',
      },
      autoplaySpeed: {
        type: 'number',
        title: 'Autoplay delay',
        description: 'Delay between each auto scroll (in milliseconds)',
        defaultValue: 10000,
      },
      pauseOnHover: {
        type: 'boolean',
        title: 'Pause on hover',
        description: 'Prevents autoplay while hovering on track',
      },
      infinite: {
        type: 'boolean',
        title: 'Infinite',
        description: 'Infinitely wrap around contents',
      },
      hideArrows: {
        type: 'boolean',
        title: 'Hide arrows',
      },
      hideNavigationDots: {
        type: 'boolean',
        title: 'Hide navigation dots',
      },
      fade: {
        type: 'boolean',
        title: 'Fade',
      },
      height: {
        title: (
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/height"
          >
            CSS height
          </a>
        ),
      },
      hideTitle: {
        type: 'boolean',
        title: 'Hide title',
      },
    },
  };
};

// See https://react-slick.neostack.com/docs/api
export const HeroCarouselschemaExtender = ({ data }) => {
  return {
    fieldsets: [
      {
        id: 'settings',
        title: 'Carousel Settings',
        fields: [
          'autoplay',
          ...(data.autoplay ? ['autoplaySpeed'] : []),
          'pauseOnHover',
          'infinite',
          'fade',
          'hideTitle',
        ],
      },
    ],
    properties: {
      autoplay: {
        type: 'boolean',
        title: 'Autoplay',
      },
      autoplaySpeed: {
        type: 'number',
        title: 'Autoplay delay',
        description: 'Delay between each auto scroll (in milliseconds)',
        defaultValue: 10000,
      },
      pauseOnHover: {
        type: 'boolean',
        title: 'Pause on hover',
        description: 'Prevents autoplay while hovering on track',
      },
      infinite: {
        type: 'boolean',
        title: 'Infinite',
        description: 'Infinitely wrap around contents',
      },
      fade: {
        type: 'boolean',
        title: 'Fade',
      },
      hideTitle: {
        type: 'boolean',
        title: 'Hide title',
      },
    },
  };
};
