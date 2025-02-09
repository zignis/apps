import React, { ReactElement } from 'react';
import Icon, { IconProps } from '../../Icon';
import { PlusIcon } from '../Plus';

const Primary = () => (
  <div className="rounded-6 bg-theme-bg-secondary">
    <PlusIcon />
  </div>
);

export const NewSquadIcon = (props: IconProps): ReactElement => (
  <Icon {...props} IconPrimary={Primary} IconSecondary={Primary} />
);
