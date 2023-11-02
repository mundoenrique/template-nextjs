//Internal App
import { RootLayout } from '@/interfaces';
import Script from 'next/script';

export default function RootLayout({ children }: RootLayout) {
	return (
		<html lang={process.env.LANGUAGE}>
			<Script src="/register.js"></Script>
			<body>{children}</body>
		</html>
	);
}
