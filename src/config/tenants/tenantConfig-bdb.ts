import { tenantConfig as novoConfig } from './tenantConfig-novo';

let config = {
  favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/bdb/favicon.ico`,
  imagesFooter: ['img-logo-color'],
  networks: {
    facebook: '',
    instagram: '',
    twitter: '',
	},
	 PWA: {
      name: "Banco de Bogotá App",
      short_name: "bogot APP",
      description: "App Banco de Bogotá",
      theme_color: "#023669",
      background_color: "#BFCBCB",
      screenshots: [
        {
          src: "sc1.jpg",
          sizes: "600x1000",
          type: `image/jpg`,
          purpose: "any",
        },
        {
          src: "sc2.jpg",
          sizes: "600x1000",
          type: `image/jpg`,
          purpose: "any",
        },
        {
          src: "sc3.jpg",
          sizes: "600x1000",
          type: `image/jpg`,
          purpose: "any",
        },
        {
          src: "sc4.jpg",
          sizes: "600x1000",
          type: `image/jpg`,
          purpose: "any",
        },
      ],
    },
};

export let tenantConfig = { ...novoConfig, ...config };
