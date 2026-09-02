import { HTMLAttributes } from 'react';
import LnSourcesSidebar from './components/sources/ln-sources-sidebar';
import LnChatWindow from './components/chat-window/ln-chat-window';
import LnUtilitiesSidebar from './components/utilities/ln-utilities-sidebar';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
}

const Page = ({  }: PageProps) => {
    return (
        <>
            <div className="hidden lg:flex h-full child max-w-[340px]">
                <LnSourcesSidebar />
            </div>
            <LnChatWindow />
            <div className="hidden lg:flex h-full child max-w-[340px]">
                <LnUtilitiesSidebar />  
            </div>
        </>
    );
};

export default Page;
