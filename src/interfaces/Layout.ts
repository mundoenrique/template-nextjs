export type GenerateMetadataProps = {
  params: { tenant: string };
};

export type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    tenant: string;
  };
};

export type RootLayout = {
  children: React.ReactNode;
};
