import { create } from 'zustand';

type tenantState = {
  tenant: string;
};

export const useTenantStore = create<tenantState>((set) => ({
  tenant: 'novo',
}));
