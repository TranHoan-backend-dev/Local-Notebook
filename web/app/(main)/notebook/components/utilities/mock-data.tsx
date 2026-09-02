import { 
    Volume,
    Display,
    Play,
    BranchesRight,
    FileText,
    Layers,
    FileQuestion,
    ChartColumn,
    LayoutCells
} from '@gravity-ui/icons';

export const studioTools = [
    {
        id: 'audio',
        title: 'Tổng quan bằng â...',
        icon: <Volume width={16} height={16} className="text-blue-600 shrink-0" />,
        bg: 'bg-blue-50/70 hover:bg-blue-50 border-blue-100/50',
        textColor: 'text-blue-900',
    },
    {
        id: 'presentation',
        title: 'Bản trình bày',
        icon: <Display width={16} height={16} className="text-amber-600 shrink-0" />,
        bg: 'bg-amber-50/70 hover:bg-amber-50 border-amber-100/50',
        textColor: 'text-amber-900',
    },
    {
        id: 'video',
        title: 'Tổng quan bằng...',
        icon: <Play width={16} height={16} className="text-emerald-600 shrink-0" />,
        bg: 'bg-emerald-50/70 hover:bg-emerald-50 border-emerald-100/50',
        textColor: 'text-emerald-900',
    },
    {
        id: 'mindmap',
        title: 'Bản đồ tư duy',
        icon: <BranchesRight width={16} height={16} className="text-purple-600 shrink-0" />,
        bg: 'bg-purple-50/70 hover:bg-purple-50 border-purple-100/50',
        textColor: 'text-purple-900',
    },
    {
        id: 'report',
        title: 'Báo cáo',
        icon: <FileText width={16} height={16} className="text-yellow-600 shrink-0" />,
        bg: 'bg-yellow-50/70 hover:bg-yellow-50 border-yellow-100/50',
        textColor: 'text-yellow-900',
    },
    {
        id: 'flashcards',
        title: 'Thẻ ghi nhớ',
        icon: <Layers width={16} height={16} className="text-rose-600 shrink-0" />,
        bg: 'bg-rose-50/70 hover:bg-rose-50 border-rose-100/50',
        textColor: 'text-rose-900',
    },
    {
        id: 'quiz',
        title: 'Bài kiểm tra',
        icon: <FileQuestion width={16} height={16} className="text-cyan-600 shrink-0" />,
        bg: 'bg-cyan-50/70 hover:bg-cyan-50 border-cyan-100/50',
        textColor: 'text-cyan-900',
    },
    {
        id: 'infographic',
        title: 'Bản đồ họa thông tin',
        icon: <ChartColumn width={16} height={16} className="text-violet-600 shrink-0" />,
        bg: 'bg-violet-50/70 hover:bg-violet-50 border-violet-100/50',
        textColor: 'text-violet-900',
    },
    {
        id: 'data-table',
        title: 'Bảng dữ liệu',
        icon: <LayoutCells width={16} height={16} className="text-indigo-600 shrink-0" />,
        bg: 'bg-indigo-50/70 hover:bg-indigo-50 border-indigo-100/50',
        textColor: 'text-indigo-900',
    }
];

export const notesList = [
    { id: 1, title: 'Ghi chú mới', time: '22 ngày trước' },
    { id: 2, title: 'Ghi chú mới', time: '22 ngày trước' },
    { id: 3, title: 'Ghi chú mới', time: '22 ngày trước' }
];
