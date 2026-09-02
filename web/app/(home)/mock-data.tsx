import { Globe } from "@gravity-ui/icons";
import { TabId } from "./Home";

interface FeaturedNotebook {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    date: string;
    sourcesCount: number;
}

interface RecentNotebook {
    id: string;
    title: string;
    date: string;
    sourcesCount: number;
    badgeText?: string;
    iconType?: 'book' | 'text' | 'laptop';
    bgColor: string;
    hasGlobe?: boolean;
}

export const tabs: { id: TabId; title: string; icon?: React.ReactNode }[] = [
    { id: 'all', title: 'Tất cả' },
    { id: 'mine', title: 'Sổ ghi chú của tôi' },
    { id: 'explore', title: 'Khám phá', icon: <Globe width={16} height={16} /> },
    { id: 'shared', title: 'Được chia sẻ với tôi' },
    { id: 'collections', title: 'Tuyển tập' },
];

export const featuredNotebooks: FeaturedNotebook[] = [
    {
        id: 'pinker',
        title: 'Làm Cho Bài Viết Của Bạn Mạnh Mẽ Và...',
        author: 'Steven Pinker',
        coverImage: '/images/pinker.png',
        date: '15 thg 7, 2026',
        sourcesCount: 16,
    },
    {
        id: 'pollan',
        title: 'Ăn Thông Minh, Sống Khỏe Hơn',
        author: 'Michael Pollan',
        coverImage: '/images/pollan.png',
        date: '15 thg 7, 2026',
        sourcesCount: 7,
    },
    {
        id: 'scott',
        title: 'Trở thành Sếp Tốt hơn',
        author: 'Kim Scott',
        coverImage: '/images/scott.png',
        date: '31 thg 7, 2026',
        sourcesCount: 15,
    },
    {
        id: 'wallace',
        title: 'Nuôi Dạy Những Đứa Trẻ Thành Đạt',
        author: 'Jennifer Wallace',
        coverImage: '/images/wallace.png',
        date: '4 thg 8, 2026',
        sourcesCount: 10,
    },
];

export const recentNotebooks: RecentNotebook[] = [
    {
        id: 'ww2',
        title: 'WW2',
        date: '4 thg 8, 2026',
        sourcesCount: 20,
        iconType: 'book',
        bgColor: 'bg-[#f3effa]',
    },
    {
        id: 'vn-history',
        title: 'Lịch Sử Đảng Cộng Sản Việt Nam: Để...',
        date: '10 thg 12, 2025',
        sourcesCount: 31,
        badgeText: 'VN',
        bgColor: 'bg-[#e7f7f8]',
        hasGlobe: true,
    },
    {
        id: 'claude-cli',
        title: 'Optimizing Token Usage in Claude Code CLI',
        date: '2 thg 7, 2026',
        sourcesCount: 35,
        iconType: 'laptop',
        bgColor: 'bg-[#fcf7e8]',
    },
];