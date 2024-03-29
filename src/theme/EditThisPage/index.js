/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Translate from '@docusaurus/Translate';
import IconEdit from '@theme/IconEdit';
import {ThemeClassNames} from '@docusaurus/theme-common';
import AnyText from "../../core/AnyText";

export default function EditThisPage({editUrl}) {
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={ThemeClassNames.common.editThisPage}>
      <IconEdit />
      <Translate
        id="theme.common.editThisPage"
        description="编辑当前页面的链接标签">
        {AnyText.GetAny(AnyText.EditThisPage.editThisPage)}
      </Translate>
    </a>
  );
}
