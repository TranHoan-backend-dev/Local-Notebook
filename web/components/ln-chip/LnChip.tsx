import { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import "./ln-chip.scss";
import { Chip } from '@heroui/react';

interface LnChipProps extends HTMLAttributes<HTMLSpanElement> {
    title?: string;
    /** Màu chip: 'accent' | 'success' | 'warning' | 'danger' */
    color?: ComponentProps<typeof Chip>["color"];
    /** Kích thước nút: 'sm' | 'md' | 'lg' */
    size?: ComponentProps<typeof Chip>["size"];
    /** Biến thể giao diện của nút: 'primary' | 'secondary' | 'tertiary' | 'soft' */
    variant?: ComponentProps<typeof Chip>["variant"];
    key?: string;
    childPosition?: 'first' | 'last';
    child?: ReactNode
}

const LnChip = ({ 
    key,
    title,
    size,
    variant,
    color,
    childPosition = 'first',
    child,
    ...restProps
}: LnChipProps) => {
    return (
        <Chip
            size={size}
            key={key}
            color={color}
            variant={variant}        
            {...restProps}
        >
            {childPosition === 'first' && child}
            <Chip.Label>{title}</Chip.Label>
            {childPosition === 'last' && child}
        </Chip>
    );
};

export default LnChip;
