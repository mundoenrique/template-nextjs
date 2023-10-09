import * as Icons from '@mui/icons-material';

export type MenuItem = {
  title: string;
  children: Array<MenuItem>;
  icon?: keyof typeof Icons;
  enable: boolean;
  url?: string;
};

export interface NavMenuProps {
  menuList: Array<MenuItem>;
  desktop: boolean;
}

export interface MenuChild {
  menuItem: MenuItem;
  depthLevel: number;
}

export interface iconNameProps {
  iconName: string | undefined;
}
