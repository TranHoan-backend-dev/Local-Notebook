"use client";

import { HTMLAttributes } from 'react';
import { Card, Button } from '@heroui/react';
import { Sliders, EllipsisVertical, ArrowRight } from '@gravity-ui/icons';
import "./ln-chat-window.scss";

interface LnChatWindowProps extends HTMLAttributes<HTMLDivElement> {
}

const LnChatWindow = ({ }: LnChatWindowProps) => {
    return (
        <Card className='child chat_window_card flex flex-col h-full bg-white border border-neutral-100 rounded-3xl shadow-sm overflow-hidden'>
            {/* Header */}
            <div className="chat_header flex items-center justify-between p-4 pb-3 shrink-0">
                <span className="font-semibold text-lg text-neutral-900">Cuộc trò chuyện</span>
                <div className="flex items-center gap-1">
                    <Button 
                        isIconOnly 
                        variant="outline" 
                        size="sm"
                        className="rounded-lg text-neutral-500 hover:text-neutral-900 cursor-pointer min-w-0 w-8 h-8 flex items-center justify-center"
                    >
                        <Sliders width={18} height={18} />
                    </Button>
                    <Button 
                        isIconOnly 
                        variant="outline" 
                        size="sm"
                        className="rounded-lg text-neutral-500 hover:text-neutral-900 cursor-pointer min-w-0 w-8 h-8 flex items-center justify-center"
                    >
                        <EllipsisVertical width={18} height={18} />
                    </Button>
                </div>
            </div>
            
            {/* Divider */}
            <hr className="border-neutral-300" />

            {/* Chat Content Body (Empty for now) */}
            <div className="grow overflow-y-auto p-4 flex flex-col justify-end">
                {/* Time Indicator */}
                <div className="text-center text-xs text-neutral-400 my-4 select-none">
                    Hôm nay • 14:07
                </div>
            </div>

            {/* Chat Input Footer */}
            <div className="p-4 pt-0 shrink-0">
                <div className="chat_input_container border border-neutral-200 rounded-3xl bg-white p-3 flex items-center justify-between gap-3 shadow-sm hover:border-neutral-300 transition-colors">
                    <input 
                        type="text" 
                        placeholder="Đặt câu hỏi hoặc tạo nội dung" 
                        className="grow bg-transparent border-none outline-none text-sm text-neutral-800 placeholder-neutral-400 px-2"
                    />
                    
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-neutral-400 font-medium select-none">5 nguồn</span>
                        <Button 
                            isIconOnly
                            className="bg-neutral-200 text-neutral-600 hover:bg-neutral-300 w-8 h-8 rounded-full min-w-0 p-0 flex items-center justify-center cursor-pointer transition-colors"
                        >
                            <ArrowRight width={16} height={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LnChatWindow;
