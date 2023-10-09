'use client';

import * as Icons from '@mui/icons-material';
//Internal app
import { iconNameProps } from '@/interfaces';

export default function IconComponent({ iconName }: iconNameProps): JSX.Element {
  const Icon = Icons[iconName as keyof typeof Icons];

  return Icon ? <Icon /> : <></>;
}
