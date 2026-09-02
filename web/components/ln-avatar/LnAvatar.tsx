import { HTMLAttributes } from 'react';
import "./ln-avatar.scss";
import { Avatar } from '@heroui/react';

interface LnAvatarProps extends HTMLAttributes<HTMLDivElement> {
    className: string;
}

const LnAvatar = ({ className }: LnAvatarProps) => {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <Avatar>
                <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
                <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
        </div>
    );
};

export default LnAvatar;
