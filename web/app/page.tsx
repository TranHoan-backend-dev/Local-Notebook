import LnButton from '@/components/ln-button/LnButton';
import LnAvatar from '@/components/ln-avatar/LnAvatar';
import {
    Gear,
    Dots9
} from "@gravity-ui/icons";
import { GeminiNotebookLogo } from '@/components/icons';
import AccountLevelChip from '@/components/account-level-chip/AccountLevelChip';
import HomePage from './(home)/Home';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col font-sans">
            {/* Header */}
            <header className="w-full px-6 py-3.5 bg-white border-b border-neutral-100 shrink-0">
                <div className="w-full flex items-center justify-between">
                    {/* Header Left */}
                    <GeminiNotebookLogo />

                    {/* Header Right */}
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-3">
                            <LnButton
                                btnTitle="Cài đặt"
                                variant="outline"
                                className="text-neutral-800 hover:bg-neutral-100 rounded-full font-medium text-sm border border-neutral-200"
                                icon={<Gear width={16} height={16} />}
                            />
                        </div>

                        <AccountLevelChip level="PRO"/>

                        <div className="hidden lg:flex items-center gap-3">
                            <LnButton
                                isIconOnly
                                variant="ghost"
                                className="text-neutral-800 font-medium text-sm"
                                icon={<Dots9 width={16} height={16} />}
                            />
                        </div>

                        <LnAvatar className="p-0.5 border-2 border-b-blue-600 border-l-red-600 border-r-amber-600 border-t-cyan-300 rounded-full" />
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="grow max-w-[1440px] w-full mx-auto px-6 py-6 flex flex-col gap-8">
                <HomePage />
            </main>
        </div>
    );
}
