import localFont from '@next/font/local';

export const font = localFont({
  src: [
    {
      path: './Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});
