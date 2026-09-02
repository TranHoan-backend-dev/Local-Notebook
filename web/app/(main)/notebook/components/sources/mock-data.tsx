import { YoutubeIcon } from "@/components/icons";
import { ArrowRotateLeft, BarsDescendingAlignLeft, ChevronDown, Globe, Sparkles } from "@gravity-ui/icons";
import { IconSlots } from "@/components/ln-button/LnButton";

export const content = [
  {
    title: "Thiết Lập Sổ Ghi Chú WW2",
    icon: <Sparkles width={18} height={18} />
  },
  {
    title: "Cuộc chiến tranh vĩ đại - Tập 3",
    icon: <YoutubeIcon className="w-4.5 h-4.5" />
  },
  {
    title: "Cuộc chiến tranh vĩ đại - Tập 1",
    icon: <YoutubeIcon className="w-4.5 h-4.5" />
  },
  {
    title: "Cuộc chiến tranh vĩ đại - Tập 2",
    icon: <YoutubeIcon className="w-4.5 h-4.5" />
  },
  {
    title: "Hiệp ước Versailles",
    icon: <Sparkles width={18} height={18} />
  }
];

export const pills: { title: string; icon: IconSlots[] }[] = [
    {
        title: "Web",
        icon: [
            { icon: <Globe width={14} height={14} />, iconPosition: "left" },
            { icon: <ChevronDown width={12} height={12} className="text-neutral-400 ml-0.5" />, iconPosition: "right" }
        ]
    },
    {
        title: "Nghiên cứu nhanh",
        icon: [
            { icon: <Sparkles width={14} height={14} className="text-amber-500" />, iconPosition: "left" },
            { icon: <ChevronDown width={12} height={12} className="text-neutral-400 ml-0.5" />, iconPosition: "right" }
        ]
    }
];

export const actionBtns = [
    {
        icon: <ArrowRotateLeft width={16} height={16} />
    },
    {
        icon: <BarsDescendingAlignLeft width={16} height={16} />
    }
];

export interface SourceItemData {
    id: string;
    title: string;
    type: 'sparkles' | 'youtube' | string;
}

export interface SourceGroupData {
    id: string;
    title: string;
    items: SourceItemData[];
}

export const sourceGroupsData: SourceGroupData[] = [
    {
        id: 'study-tools',
        title: 'Công cụ học tập',
        items: [
            {
                id: 'ww2-notes',
                title: 'Thiết Lập Sổ Ghi Chú WW2',
                type: 'sparkles',
            },
        ],
    },
    {
        id: 'war-history',
        title: 'Lịch sử Thế chiến',
        items: [
            {
                id: 'war-ep3',
                title: 'Cuộc chiến tranh vĩ đại - Tập 3...',
                type: 'youtube',
            },
            {
                id: 'war-ep1',
                title: 'Cuộc chiến tranh vĩ đại - Tập 1...',
                type: 'youtube',
            },
            {
                id: 'war-ep2',
                title: 'Cuộc chiến tranh vĩ đại - Tập 2...',
                type: 'youtube',
            },
            {
                id: 'versailles',
                title: 'Hiệp ước Versailles và sự bất ổ...',
                type: 'sparkles',
            },
        ],
    },
];