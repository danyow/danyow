/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import AnyText from "../../core/AnyText";

function DocPaginatorNavLink(props) {
  const {navLink, next} = props;
  return (
    <Link className={clsx('pagination-nav__link')} to={navLink.permalink}>
      <div className="pagination-nav__sublabel">
        {next ? (
          <Translate
            id="theme.docs.paginator.next"
            description="The label used to navigate to the next doc">
            {AnyText.GetAny(AnyText.DocPaginatorNavLink.next)}
          </Translate>
        ) : (
          <Translate
            id="theme.docs.paginator.previous"
            description="The label used to navigate to the previous doc">
            {AnyText.GetAny(AnyText.DocPaginatorNavLink.previous)}
          </Translate>
        )}
      </div>
      <div className="pagination-nav__label">{navLink.title}</div>
    </Link>
  );
}

export default DocPaginatorNavLink;
