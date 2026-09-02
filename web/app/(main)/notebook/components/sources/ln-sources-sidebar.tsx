"use client";

import { HTMLAttributes, useState } from 'react';
import "./ln-sources-sidebar.scss";
import { TextArea } from '@heroui/react';
import { 
    Plus, 
    Globe, 
    ChevronDown, 
    ChevronRight, 
    Magnifier, 
    ArrowRotateLeft, 
    BarsDescendingAlignLeft,
    Sparkles,
} from "@gravity-ui/icons";
import LnButton from '@/components/ln-button/LnButton';
import LnCheckbox from '@/components/ln-checkbox/LnCheckbox';
import { YoutubeIcon } from '@/components/icons';
import LnSidebarLayout from '@/app/(main)/notebook/components/ln-sidebar-layout/LnSidebarLayout';
import { useSidebarStore } from '@/hooks/use-sidebar-store';
import { actionBtns, content, pills, sourceGroupsData } from "./mock-data";

interface LnSourcesSidebarProps extends HTMLAttributes<HTMLDivElement> {
}

const LnSourcesSidebar = ({ }: LnSourcesSidebarProps) => {
    const { toggleSources, isSourcesOpen } = useSidebarStore();

    // 1. Group expanded state map (groupId -> boolean)
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
        'study-tools': true,
        'war-history': true,
    });

    // 2. Item selection state Set (selected item IDs)
    const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(
        new Set(['ww2-notes', 'war-ep3', 'war-ep1', 'war-ep2', 'versailles'])
    );

    // Expand/Collapse handler
    const toggleGroupExpand = (groupId: string) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupId]: !(prev[groupId] ?? true),
        }));
    };

    // Item selection handler
    const toggleItemSelect = (itemId: string) => {
        setSelectedItemIds((prev) => {
            const next = new Set(prev);
            if (next.has(itemId)) {
                next.delete(itemId);
            } else {
                next.add(itemId);
            }
            return next;
        });
    };

    // Derived states
    const isGroupSelected = (groupItems: { id: string }[]) => {
        return groupItems.length > 0 && groupItems.every((item) => selectedItemIds.has(item.id));
    };

    const handleGroupParentChange = (groupItems: { id: string }[], checked: boolean) => {
        setSelectedItemIds((prev) => {
            const next = new Set(prev);
            groupItems.forEach((item) => {
                if (checked) {
                    next.add(item.id);
                } else {
                    next.delete(item.id);
                }
            });
            return next;
        });
    };

    const allItems = sourceGroupsData.flatMap((g) => g.items);
    const selectAll = allItems.length > 0 && allItems.every((item) => selectedItemIds.has(item.id));

    const handleSelectAllChange = (checked: boolean) => {
        if (checked) {
            setSelectedItemIds(new Set(allItems.map((item) => item.id)));
        } else {
            setSelectedItemIds(new Set());
        }
    };

    const renderItemIcon = (type: string) => {
        switch (type) {
            case 'youtube':
                return <YoutubeIcon className="shrink-0" />;
            case 'sparkles':
            default:
                return <Sparkles width={14} height={14} className="text-neutral-500 shrink-0" />;
        }
    };

    const collapsedContent = (
        <div className="flex flex-col gap-4 items-center grow overflow-y-auto w-full p-4 pb-3">
            {content && content.map((c, _index) => {
                return (
                    <div 
                        key={_index}
                        className="p-1.5 hover:bg-neutral-50 rounded-lg text-neutral-600 transition-colors cursor-pointer" 
                        title={c.title}
                    >
                        {c.icon}
                    </div>
                );
            })}
        </div>
    );

    return (
        <LnSidebarLayout
            title="Nguồn"
            isOpen={isSourcesOpen}
            onToggle={toggleSources}
            rotateCollapsedToggle={true}
            cardClassName="sources_sidebar_card"
            collapsedContent={collapsedContent}
        >
            <div className="flex flex-col gap-4 p-5 grow overflow-y-auto">
                {/* Add source button */}
                <LnButton
                    variant="outline"
                    className="w-full border border-neutral-200 text-neutral-800 hover:bg-neutral-50 rounded-full font-medium text-sm py-2 flex items-center justify-center gap-1.5 bg-white cursor-pointer h-10 transition-colors"
                    icon={<Plus width={16} height={16} />}
                    btnTitle='Thêm nguồn'
                />

                {/* Search / AI Study container */}
                <div className="search_box_container border border-neutral-100 rounded-2xl p-3 flex flex-col gap-3">
                    <TextArea 
                        id="add_sources"
                        name='add_sources'
                        className="w-full bg-transparent border-none outline-none resize-none text-sm text-neutral-700 placeholder-neutral-400 p-0 leading-relaxed shadow-none border-0 ring-0 focus:ring-0 focus:outline-none"
                        placeholder="Tìm nguồn mới trên web"
                        rows={2}
                    />
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex gap-2">
                            {
                                pills && pills.map((p, _index) => {
                                    return (
                                        <LnButton 
                                            key={_index}
                                            btnSize="sm" 
                                            variant="outline" 
                                            className="bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 cursor-pointer h-7 transition-colors"
                                            btnTitle={p.title}
                                            icon={p.icon}
                                        />
                                    );
                                })
                            }
                        </div>

                        <LnButton 
                            isIconOnly 
                            btnSize="sm"
                            className="bg-neutral-200 text-neutral-600 hover:bg-neutral-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer min-w-0 p-0 transition-colors"
                            icon={<Magnifier width={14} height={14} />}
                        />
                    </div>
                </div>

                {/* Actions: Refresh, Sort, Select all */}
                <div className="flex items-center justify-between text-neutral-600 text-sm mt-1">
                    <div className="flex items-center gap-4">
                        {
                            actionBtns && actionBtns.map((a, _index) => {
                                return (
                                    <LnButton 
                                        key={_index}
                                        isIconOnly 
                                        variant="ghost" 
                                        btnSize="sm" 
                                        className="text-neutral-500 hover:text-neutral-800 p-0 min-w-0 w-6 h-6 flex items-center justify-center cursor-pointer"
                                        icon={a.icon}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-700">Chọn tất cả</span>
                        <LnCheckbox 
                            isSelected={selectAll} 
                            onChange={handleSelectAllChange}
                        />
                    </div>
                </div>

                {/* Source list Accordion */}
                <div className="flex flex-col gap-1 mt-2">
                    {sourceGroupsData.map((group) => {
                        const isExpanded = expandedGroups[group.id] ?? true;
                        const isParentSelected = isGroupSelected(group.items);

                        return (
                            <div key={group.id} className="flex flex-col">
                                <div className="flex items-center justify-between py-2 hover:bg-neutral-50 rounded-xl pl-2 transition-colors cursor-pointer group-header">
                                    <div 
                                        className="flex items-center gap-2 text-neutral-800 grow select-none"
                                        onClick={() => toggleGroupExpand(group.id)}
                                    >
                                        {isExpanded ? (
                                            <ChevronDown width={16} height={16} className="text-neutral-600" />
                                        ) : (
                                            <ChevronRight width={16} height={16} className="text-neutral-600" />
                                        )}
                                        <span className="text-sm font-semibold text-neutral-800">{group.title}</span>
                                    </div>
                                    <LnCheckbox 
                                        isSelected={isParentSelected}
                                        onChange={(checked) => handleGroupParentChange(group.items, checked)}
                                    />
                                </div>

                                {/* Group Children */}
                                {isExpanded && (
                                    <div className="flex flex-col pl-6 gap-1 mt-0.5">
                                        {group.items.map((item) => (
                                            <div 
                                                key={item.id}
                                                className="flex items-center justify-between py-2 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2.5 text-neutral-700 min-w-0 grow">
                                                    {renderItemIcon(item.type)}
                                                    <span className="text-sm font-normal truncate">{item.title}</span>
                                                </div>
                                                <LnCheckbox 
                                                    isSelected={selectedItemIds.has(item.id)}
                                                    onChange={() => toggleItemSelect(item.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </LnSidebarLayout>
    );
};

export default LnSourcesSidebar;
