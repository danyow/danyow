/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';
import './styles.css';
import styles from './styles.module.css';
import AnyText from "../../core/AnyText";
// eslint-disable-next-line react/function-component-definition
export const MainHeading = ({...props}) => (
  <header>
    <h1
      {...props}
      id={undefined} // h1 headings do not need an id because they don't appear in the TOC
    >
      {props.children}
    </h1>
  </header>
);

const createAnchorHeading =
  (Tag) =>
    ({id, ...props}) => {
      const {
        navbar: {hideOnScroll},
      } = useThemeConfig();

      if (!id) {
        return <Tag {...props} />;
      }

      const headingLinkTitle = AnyText.GetAny(AnyText.Heading.headingLinkTitle)

      return (
        <Tag
          {...props}
          className={clsx('anchor', {
            [styles.anchorWithHideOnScrollNavbar]: hideOnScroll,
            [styles.anchorWithStickyNavbar]: !hideOnScroll,
          })}
          id={id}>
          {props.children}
          <a
            className="hash-link"
            href={`#${id}`}
            title={translate({
              id: 'theme.common.headingLinkTitle',
              message: '{headingLinkTitle}',
              description: 'Title for link to heading',
            }, {
              headingLinkTitle
            })}>
            &#8203;
          </a>
        </Tag>
      );
    };

const Heading = (headingType) =>
  headingType === 'h1' ? MainHeading : createAnchorHeading(headingType);

export default Heading;