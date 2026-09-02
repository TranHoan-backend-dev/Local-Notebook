"use client";

import { HTMLAttributes } from 'react';
import { 
    ChevronRight,
    FileText,
    EllipsisVertical,
    Plus
} from '@gravity-ui/icons';
import "./ln-utilities-sidebar.scss";
import LnButton from '@/components/ln-button/LnButton';
import LnSidebarLayout from '@/app/(main)/notebook/components/ln-sidebar-layout/LnSidebarLayout';
import { useSidebarStore } from '@/hooks/use-sidebar-store';
import { notesList, studioTools } from './mock-data';

interface LnUtilitiesSidebarProps extends HTMLAttributes<HTMLDivElement> {
}

const LnUtilitiesSidebar = ({ }: LnUtilitiesSidebarProps) => {
    const { toggleUtilities, isUtilitiesOpen } = useSidebarStore();

    const collapsedContent = (
        <div className="flex flex-col gap-3.5 items-center grow overflow-y-auto overflow-x-hidden w-full p-4 pb-3">
            {/* Studio Tools Icons */}
            {studioTools.map((tool) => (
                <div 
                    key={tool.id} 
                    className="p-2 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer flex items-center justify-center border border-neutral-100/50 bg-neutral-50/50" 
                    title={tool.title}
                >
                    {tool.icon}
                </div>
            ))}
            
            {/* Divider between tools and notes */}
            <hr className="border-neutral-200 w-full my-1" />

            {/* Notes Icons */}
            {notesList.map((note) => (
                <div 
                    key={note.id} 
                    className="p-2 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer flex items-center justify-center text-neutral-600 border border-neutral-100 bg-white" 
                    title={note.title}
                >
                    <FileText width={16} height={16} />
                </div>
            ))}
        </div>
    );

    const collapsedFooter = (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 shrink-0">
            <LnButton
                isIconOnly
                btnSize="sm"
                className="bg-black text-white hover:bg-neutral-850 transition-all rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 duration-100"
                icon={<Plus width={16} height={16} />}
            />
        </div>
    );

    const footer = (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 shrink-0">
            <LnButton
                className="bg-black text-white hover:bg-neutral-800 transition-all rounded-full flex items-center gap-2 px-5 py-2.5 font-semibold text-sm cursor-pointer shadow-lg active:scale-95 duration-100 select-none"
                icon={<Plus width={16} height={16} />}
                iconPosition='right'
                btnTitle='Thêm ghi chú'
            />
        </div>
    );

    return (
        <LnSidebarLayout
            title="Studio"
            isOpen={isUtilitiesOpen}
            onToggle={toggleUtilities}
            cardClassName="utilities_sidebar_card"
            collapsedContent={collapsedContent}
            collapsedFooter={collapsedFooter}
            footer={footer}
        >
            <div className="grow overflow-y-auto pb-24">
                {/* Grid of Studio Cards */}
                <div className="grid grid-cols-2 gap-3 p-4">
                    {studioTools.map((tool) => (
                        <div 
                            key={tool.id} 
                            className={`flex flex-col justify-between p-3 h-24 border rounded-2xl transition-all cursor-pointer ${tool.bg}`}
                        >
                            <div className="flex items-center justify-between">
                                {tool.icon}
                                <ChevronRight width={14} height={14} className="text-neutral-400 shrink-0" />
                            </div>
                            <span className={`text-[13px] font-semibold tracking-tight leading-tight ${tool.textColor}`}>
                                {tool.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <hr className="border-neutral-300" />

                {/* Notes List */}
                <div className="flex flex-col gap-1 mt-2">
                    {notesList.map((note) => (
                        <div 
                            key={note.id} 
                            className="flex items-center justify-between p-3 py-2.5 hover:bg-neutral-50 rounded-2xl transition-colors cursor-pointer mx-4"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-600 shrink-0">
                                    <FileText width={18} height={18} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-neutral-800 truncate">
                                        {note.title}
                                    </span>
                                    <span className="text-xs text-neutral-400 mt-0.5">
                                        {note.time}
                                    </span>
                                </div>
                            </div>
                            <LnButton
                                isIconOnly 
                                variant="outline" 
                                btnSize="sm" 
                                className="text-neutral-500 hover:text-neutral-900 p-0 min-w-0 w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg"
                                icon={<EllipsisVertical width={18} height={18} />}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </LnSidebarLayout>
    );
};

export default LnUtilitiesSidebar;
