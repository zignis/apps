import classNames from 'classnames';
import React, { ReactElement } from 'react';

import classed from '../lib/classed';
import { Button, ButtonProps, ButtonVariant } from './buttons/ButtonV2';

export const EmptyScreenContainer = classed(
  'div',
  'flex flex-col justify-center items-center px-6 w-full max-w-screen-tablet h-screen max-h-full -mt-12',
);

export const EmptyScreenTitle = classed('h2', 'my-4 text-center typo-title1');

export const EmptyScreenDescription = classed(
  'p',
  'p-0 m-0 text-center text-theme-label-secondary typo-body',
);

export const EmptyScreenButton = ({
  className,
  children,
  variant = ButtonVariant.Primary,
  ...props
}: ButtonProps<'a' | 'button'>): ReactElement => (
  <Button
    variant={variant}
    className={classNames('mt-10', className)}
    {...props}
  >
    {children}
  </Button>
);

export const EmptyScreenIcon = {
  className: 'text-theme-label-disabled',
  style: { fontSize: '5rem', width: 'auto', height: 'auto' },
};
