import { HTMLAttributes } from 'react';
import "./ln-notebook.scss";
import LnHeader from './components/ln-header/ln-header';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='notebook_layout'>
            {/* Header */}
            <header className='notebook_header flex items-center justify-between'>
                <LnHeader />
            </header>

            {/* Body */}
            <div className='notebook_content'>
                {children}
            </div>

            {/* Footer */}
            <footer className='notebook_footer flex items-center justify-center'>
                Gemini Notebook có thể đưa ra thông tin không chính xác nên hãy kiểm tra kỹ câu trả lời mà bạn nhận được.
            </footer>
        </div>
    );
};

export default Layout;
