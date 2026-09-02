import { create } from 'zustand';

interface SidebarState {
    isSourcesOpen: boolean;
    isUtilitiesOpen: boolean;
    toggleSources: () => void;
    toggleUtilities: () => void;
    setSourcesOpen: (open: boolean) => void;
    setUtilitiesOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isSourcesOpen: true,
    isUtilitiesOpen: true,
    toggleSources: () => set((state) => ({ isSourcesOpen: !state.isSourcesOpen })),
    toggleUtilities: () => set((state) => ({ isUtilitiesOpen: !state.isUtilitiesOpen })),
    setSourcesOpen: (open) => set({ isSourcesOpen: open }),
    setUtilitiesOpen: (open) => set({ isUtilitiesOpen: open }),
}));
