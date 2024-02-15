// Customized to use the HeroSection
import HeroSection from '@package/components/theme/Header/HeroSection'; // , StickyHeader
import { Logo, Navigation } from '@plone/volto/components';
import { BodyClass, isCmsUi } from '@plone/volto/helpers';
import cx from 'classnames';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import usePreviewImage from './usePreviewImage';

const Header = (props) => {
  const { navigationItems } = props;
  const intl = useIntl();
  const { pathname, search } = useLocation();
  const searchableText = qs.parse(search).SearchableText;

  const content = useSelector((state) => state.content.data);

  const previewImage = usePreviewImage(pathname);

  const previewImageUrl = previewImage?.scales?.preview?.download;

  const contentType = content?.['@type'];
  const isHomePage = contentType === 'Plone Site' || contentType === 'LRF';
  const isSearch = pathname === '/search';
  const cmsView = isCmsUi(pathname);
  const homePageView = isHomePage && !cmsView && !isSearch;
  const [inView, setInView] = React.useState();
  const [smallLogo, setSmallLogo] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-width: 768px)');
      const handler = (e) => setSmallLogo(e.matches);

      setSmallLogo(mediaQuery.matches);
      mediaQuery.addEventListener('change', handler);

      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  return (
    <div className="portal-top">
      {homePageView && <BodyClass className="homepage-view" />}
      {!cmsView && !isSearch && <BodyClass className="has-image" />}
      {!((cmsView && isSearch) || isHomePage) && (
        <BodyClass className="has-hero-section" />
      )}
      {isSearch && <BodyClass className="has-hero-section" />}
      <div
        className={cx(
          'header-wrapper',
          homePageView ? 'homepage' : 'contentpage',
          inView ? 'header-in-view' : 'header-out-of-view fadeInDown',
        )}
        role="banner"
      >
        <div className="header">
          <div
            className={`logo-nav-wrapper ${
              homePageView ? 'home-nav' : 'page-nav'
            }`}
          >
            <div className="logo">
              <Logo smallLogo={!smallLogo} />
            </div>

            <div className="right-section">
              <Navigation pathname={pathname} navigation={navigationItems} />
            </div>
          </div>
        </div>
      </div>
      <div id="header-spacer"></div>
      <InView
        as="div"
        className="header-visibility-sensor"
        onChange={(inView, entry) => setInView(inView)}
      >
        {' '}
      </InView>

      {!((cmsView && !isSearch) || isHomePage) && (
        <div className="header-bg">
          <div className="header-container">
            <HeroSection image_url={previewImageUrl} content={content} />
          </div>
        </div>
      )}
      {isSearch && (
        <div className="header-bg">
          <div className="header-container">
            <HeroSection
              content={{
                title:
                  intl.locale === 'nl'
                    ? `Zoekresultaten voor "${searchableText}"`
                    : `Search results for "${searchableText}"`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
