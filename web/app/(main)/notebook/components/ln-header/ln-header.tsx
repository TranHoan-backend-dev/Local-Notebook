"use client";

import { HTMLAttributes } from 'react';
import LnButton from "@/components/ln-button/LnButton";
import { Plus, Copy, ChartLineArrowUp, NodesRight, Gear, Dots9 } from "@gravity-ui/icons";
import "./ln-header.scss";
import LnAvatar from '@/components/ln-avatar/LnAvatar';
import { Dropdown } from '@heroui/react';
import AccountLevelChip from '@/components/account-level-chip/AccountLevelChip';

interface LnHeaderProps extends HTMLAttributes<HTMLDivElement> {
}

const LnHeader = (_props: LnHeaderProps) => {
    return (
        <div className="w-full flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-2">
                <span className="font-semibold text-lg text-neutral-900">Optimizing Token Usage in Claude Code CLI</span>
            </div>

            {/* Right side */}
            <div className="flex items-center header_right_side gap-3">
                {/* Desktop view buttons (hidden on mobile/tablet) */}
                <div className="hidden lg:flex items-center gap-3">
                    <LnButton
                        btnTitle="Tạo sổ ghi chú mới"
                        variant="outline"
                        className="bg-black text-white hover:bg-neutral-850 rounded-full font-medium text-sm"
                        icon={<Plus width={16} height={16} />}
                    />
                    {
                        btns && btns.map(b => {
                            return (
                                <LnButton
                                    key={b.btnTitle}
                                    btnTitle={b.btnTitle}
                                    variant="outline"
                                    className="text-neutral-800 hover:bg-white rounded-full font-medium text-sm"
                                    icon={b.icon}
                                />
                            );
                        })
                    }
                </div>

                <AccountLevelChip level='PRO'/>

                {/* Mobile view dropdown (hidden on desktop) */}
                <div className="lg:hidden">
                    <Dropdown>
                        <Dropdown.Trigger 
                            aria-label="Menu tác vụ"
                            className="rounded-full min-w-0 w-10 h-10 p-0 flex items-center justify-center cursor-pointer hover:bg-neutral-100 transition-colors outline-none border-none bg-transparent"
                        >
                            <Dots9 width={16} height={16} />
                        </Dropdown.Trigger>
                        <Dropdown.Popover>
                            <Dropdown.Menu aria-label="Menu tác vụ">
                                <Dropdown.Item id="new" textValue="Tạo sổ ghi chú mới">
                                    <span className="flex items-center gap-2">
                                        <Plus width={16} height={16} />
                                        Tạo sổ ghi chú mới
                                    </span>
                                </Dropdown.Item>
                                {btns && btns.map((b, _index) => {
                                    return (
                                        <Dropdown.Item 
                                            key={_index}
                                            id={b.id}
                                            textValue={b.btnTitle}
                                        >
                                            <span className="flex items-center gap-2">
                                                {b.icon}
                                                {b.btnTitle}
                                            </span>
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>

                <LnAvatar className='p-0.5 border-2 border-b-blue-600 border-l-red-600 border-r-amber-600 border-t-cyan-300 rounded-full' />
            </div>
        </div>
    );
};

export default LnHeader;

const btns = [
    {
        btnTitle: "Sao chép",
        icon: <Copy width={16} height={16} />,
        id: 'copy'
    },
    {
        btnTitle: "Số liệu phân tích",
        icon: <ChartLineArrowUp width={16} height={16} />,
        id: 'analytic'
    },
    {
        btnTitle: "Chia sẻ",
        icon: <NodesRight width={16} height={16} />,
        id: 'share'
    },
    {
        btnTitle: "Cài đặt",
        icon: <Gear width={16} height={16} />,
        id: 'setting'
    }
];
