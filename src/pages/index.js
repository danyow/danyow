import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from "@docusaurus/core/lib/client/exports/useBaseUrl";

export default (props) => (
  <Layout>
    <Index {...props} />
  </Layout>
);

const Index = () => {
  return (
    <div>
      <HomeSplash/>
      {/*<div className="homePage mainContainer">*/}
      {/*  <Container className="textSection" background="light">*/}
      {/*    <h2>Built for scale</h2>*/}
      {/*    <p>*/}
      {/*      Relay is designed for high performance at any scale. Relay keeps*/}
      {/*      management of data-fetching easy, whether your app has tens,*/}
      {/*      hundreds, or thousands of components. And thanks to Relay’s*/}
      {/*      incremental compiler, it keeps your iteration speed fast even as*/}
      {/*      your app grows.*/}
      {/*    </p>*/}
      {/*  </Container>*/}
      {/*</div>*/}
    </div>
  );
};

const HomeSplash = () => {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className="homeContainer">
      <div className="homeSplashFade">
        <div className="logo">
          <img src={useBaseUrl('img/puzzle.svg')} alt={'puzzle'}/>
        </div>
        <div className="wrapper homeWrapper">
          <h2 className="projectTitle">
            {siteConfig.title}
            <small>{siteConfig.tagline}</small>
            <small>{siteConfig.subtagline}</small>
          </h2>
        </div>
      </div>
    </div>
  );
};
