import React from 'react';
import styles from './HomepageFeatures.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function HomepageFeatures() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <section className={styles.features}>
      <div className="container">
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </section>
  );
}
