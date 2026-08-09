import LnButton from "../ln-button/LnButton";
import "./navbar.scss";

const flexStyle = "flex flex-row justify-between items-center";

export const Navbar = () => {
    return (
        <div className={`px-16 py-12 border-b bg-white items-center ${flexStyle}`}>
            {/* Left */}
            <div>
                Gemini Notebook
            </div>

            {/* Right */}
            <div className={`${flexStyle} gap-8`}>
                <span>Tổng quan</span>
                <span>Gói</span>
                <span>Tải ứng dụng</span>
                <LnButton
                    btnTitle="Cài đặt"
                    btnSize="md"
                    iconPosition="left"
                />
            </div>
        </div>
    );
}