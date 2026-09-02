"use client";

import { HTMLAttributes, ReactNode } from 'react';
import { Card } from '@heroui/react';
import { LayoutSplitSideContentLeft } from '@gravity-ui/icons';
import LnButton from '@/components/ln-button/LnButton';

export interface LnSidebarLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Tiêu đề hiển thị ở Header khi sidebar mở rộng */
    title: ReactNode;
    /** Trạng thái mở/đóng của sidebar */
    isOpen: boolean;
    /** Hàm toggle đóng/mở sidebar */
    onToggle: () => void;
    /** Cho biết icon thu gọn có xoay 180 độ khi đóng hay không (mặc định: false) */
    rotateCollapsedToggle?: boolean;
    /** Class name tùy chỉnh cho Card container */
    cardClassName?: string;
    /** Nội dung hiển thị trong thanh thu gọn (w-16) */
    collapsedContent?: ReactNode;
    /** Component nút/footer ở đáy khi thu gọn */
    collapsedFooter?: ReactNode;
    /** Component nút/footer ở đáy khi mở rộng */
    footer?: ReactNode;
    /** Nội dung chính của sidebar khi mở rộng */
    children?: ReactNode;
}

/**
 * Layout chung dành cho các thanh Sidebar có tính năng thu gọn/mở rộng trong ứng dụng.
 * Quản lý khung giao diện Card, Header, nút bấm toggle và 2 chế độ hiển thị (Collapsed vs Expanded).
 */
const LnSidebarLayout = ({
    title,
    isOpen,
    onToggle,
    rotateCollapsedToggle = false,
    cardClassName = '',
    collapsedContent,
    collapsedFooter,
    footer,
    children,
    ...props
}: LnSidebarLayoutProps) => {
    if (!isOpen) {
        return (
            <Card 
                className={`flex flex-col h-full bg-white border border-neutral-100 rounded-3xl shadow-sm items-center p-3 gap-4 w-16! min-w-16! max-w-16! flex-none transition-all duration-300 relative overflow-hidden ${cardClassName}`}
                {...props}
            >
                {/* Header Toggle Button */}
                <div className="flex justify-center w-full shrink-0 p-4 pb-3">
                    <LnButton
                        isIconOnly 
                        variant="outline" 
                        btnSize="sm"
                        className="rounded-lg text-neutral-500 hover:text-neutral-900 cursor-pointer min-w-0 w-8 h-8 flex items-center justify-center border border-neutral-100"
                        icon={
                            <LayoutSplitSideContentLeft 
                                width={18} 
                                height={18} 
                                className={rotateCollapsedToggle ? "rotate-180" : undefined} 
                            />
                        }
                        onPress={onToggle}
                    />
                </div>

                {/* Divider */}
                <hr className="border-neutral-200 w-full my-0" />

                {/* Collapsed Content */}
                {collapsedContent}

                {/* Collapsed Footer */}
                {collapsedFooter}
            </Card>
        );
    }

    return (
        <Card 
            className={`child flex flex-col h-full bg-white border border-neutral-100 rounded-3xl shadow-sm transition-all duration-300 ${cardClassName}`}
            {...props}
        >
            {/* Header */}
            <div className="sidebar_header flex items-center justify-between p-4 pb-3 shrink-0">
                <span className="font-semibold text-lg text-neutral-900">{title}</span>
                <LnButton
                    isIconOnly 
                    variant="outline" 
                    btnSize="sm"
                    className="rounded-lg text-neutral-500 hover:text-neutral-900 cursor-pointer min-w-0 w-8 h-8 flex items-center justify-center"
                    icon={<LayoutSplitSideContentLeft width={18} height={18} />}
                    onPress={onToggle}
                />
            </div>
            
            {/* Divider */}
            <hr className="border-neutral-300 my-0" />

            {/* Main Content */}
            {children}

            {/* Expanded Footer */}
            {footer}
        </Card>
    );
};

export default LnSidebarLayout;
