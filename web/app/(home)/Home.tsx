"use client";

import { HTMLAttributes, useState } from 'react';
import "./home.scss";
import { featuredNotebooks, recentNotebooks, tabs } from './mock-data';
import LnButton from '@/components/ln-button/LnButton';
import { BarsDescendingAlignLeft, BookOpen, Check, ChevronDown, ChevronRight, Display, Ellipsis, Globe, Magnifier, Plus } from '@gravity-ui/icons';
import { GridIcon } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';

interface HomeProps extends HTMLAttributes<HTMLDivElement> {
}

export type TabId = 'all' | 'mine' | 'explore' | 'shared' | 'collections';

const HomePage = ({  }: HomeProps) => {
    const [activeTab, setActiveTab] = useState<TabId>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    return (
        <>
            {/* Filter Tabs & Toolbar Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Left Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
                    {tabs.map((tab) => (
                        <LnButton
                            key={tab.id}
                            btnTitle={tab.title}
                            variant="outline"
                            icon={tab.icon}
                            className={`rounded-full text-sm font-medium border-none h-9 px-4 cursor-pointer whitespace-nowrap transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-[#eef0f4] text-neutral-900 font-semibold'
                                    : 'bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        />
                    ))}
                </div>

                {/* Right Control Toolbar */}
                <div className="flex items-center gap-2.5">
                    {/* Search Circular Button */}
                    <LnButton
                        isIconOnly
                        variant="ghost"
                        className="w-9 h-9 min-w-0 rounded-full bg-[#f0f2f5] hover:bg-[#e4e7ec] text-neutral-700 p-0 flex items-center justify-center cursor-pointer transition-colors"
                        icon={<Magnifier width={16} height={16} />}
                        tooltip="Tìm kiếm"
                    />

                    {/* View Mode Toggle Group */}
                    <div className="flex items-center bg-[#f0f2f5] p-1 rounded-full border border-neutral-200/50">
                        <LnButton
                            isIconOnly
                            variant="ghost"
                            className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white/60 transition-colors cursor-pointer"
                            icon={<Check width={14} height={14} />}
                        />
                        <LnButton
                            isIconOnly
                            variant="ghost"
                            className={`w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center transition-colors cursor-pointer ${
                                viewMode === 'grid' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                            icon={<GridIcon width={14} height={14} />}
                            onClick={() => setViewMode('grid')}
                        />
                        <LnButton
                            isIconOnly
                            variant="ghost"
                            className={`w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center transition-colors cursor-pointer ${
                                viewMode === 'list' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                            icon={<BarsDescendingAlignLeft width={14} height={14} />}
                            onClick={() => setViewMode('list')}
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <LnButton
                        btnTitle="Gần đây nhất"
                        variant="outline"
                        className="bg-white border border-neutral-200/80 text-neutral-800 hover:bg-neutral-50 rounded-full font-medium text-xs px-3.5 py-1.5 h-9"
                        icon={<ChevronDown width={14} height={14} className="text-neutral-500 ml-1" />}
                        iconPosition="right"
                    />

                    {/* Primary Create Button */}
                    <LnButton
                        btnTitle="Tạo mới"
                        variant="outline"
                        className="bg-black text-white hover:bg-neutral-850 rounded-full font-medium text-xs px-4 py-1.5 h-9"
                        icon={<Plus width={16} height={16} />}
                    />
                </div>
            </div>

            {/* SECTION 1: Sổ ghi chú nổi bật */}
            <section className="flex flex-col gap-4 mt-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">Sổ ghi chú nổi bật</h2>
                    <LnButton
                        btnTitle="Xem tất cả"
                        variant="outline"
                        className="bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-full text-xs font-medium px-3.5 py-1 h-8"
                        icon={<ChevronRight width={14} height={14} className="text-neutral-400" />}
                        iconPosition="right"
                    />
                </div>

                {/* Featured Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredNotebooks.map((nb, idx) => (
                        <div
                            key={nb.id}
                            className="group relative rounded-2xl overflow-hidden aspect-[4/3.1] cursor-pointer bg-neutral-900 border border-neutral-200/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-4"
                        >
                            {/* Background Image */}
                            <Image
                                src={nb.coverImage}
                                alt={nb.title}
                                fill
                                priority={idx === 0}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                            {/* Top Badge */}
                            <div className="relative z-10 self-start">
                                <div className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-800 shadow-xs">
                                    <BookOpen width={15} height={15} />
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
                                {/* Author row */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-neutral-300 text-neutral-800 font-bold text-[10px] flex items-center justify-center border border-white/60">
                                        {nb.author.charAt(0)}
                                    </div>
                                    <span className="text-xs font-medium text-white/90">{nb.author}</span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-white text-lg leading-snug line-clamp-2 drop-shadow-xs">
                                    {nb.title}
                                </h3>

                                {/* Footer Meta */}
                                <div className="flex items-center justify-between text-xs text-white/70 pt-1">
                                    <span>{nb.date} • {nb.sourcesCount} nguồn</span>
                                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                                        <Globe width={13} height={13} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 2: Sổ ghi chú gần đây */}
            <section className="flex flex-col gap-4 mt-4 mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">Sổ ghi chú gần đây</h2>

                {/* Recent Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Create New Notebook Card */}
                    <div className="border border-neutral-200/80 rounded-2xl bg-white hover:bg-neutral-50/80 transition-all cursor-pointer p-6 flex flex-col items-center justify-center aspect-[4/3.1] min-h-[190px] gap-3 text-center group shadow-2xs">
                        <div className="w-12 h-12 rounded-full bg-[#eef3fe] text-[#2563eb] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <Plus width={22} height={22} />
                        </div>
                        <span className="font-medium text-neutral-800 text-sm">Tạo sổ ghi chú mới</span>
                    </div>

                    {/* Existing Recent Cards */}
                    {recentNotebooks.map((nb) => (
                        <Link
                            key={nb.id}
                            href="/notebook"
                            className={`rounded-2xl ${nb.bgColor} p-5 flex flex-col justify-between aspect-[4/3.1] min-h-[190px] hover:shadow-sm transition-all cursor-pointer border border-black/5 group relative`}
                        >
                            {/* Top Row */}
                            <div className="flex items-center justify-between">
                                {nb.badgeText ? (
                                    <span className="font-bold text-2xl tracking-tight text-neutral-800">
                                        {nb.badgeText}
                                    </span>
                                ) : nb.iconType === 'laptop' ? (
                                    <div className="p-2 rounded-xl bg-white/60 text-neutral-700 shadow-2xs">
                                        <Display width={18} height={18} />
                                    </div>
                                ) : (
                                    <div className="p-2 rounded-xl bg-white/60 text-neutral-700 shadow-2xs">
                                        <BookOpen width={18} height={18} />
                                    </div>
                                )}

                                <LnButton
                                    isIconOnly
                                    variant="ghost"
                                    className="w-8 h-8 min-w-0 rounded-full hover:bg-black/5 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors p-0"
                                    icon={<Ellipsis width={16} height={16} />}
                                    onClick={(e) => e.preventDefault()}
                                />
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-lg text-neutral-900 leading-snug line-clamp-2 my-auto pt-2">
                                {nb.title}
                            </h3>

                            {/* Bottom Meta */}
                            <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                                <span>{nb.date} • {nb.sourcesCount} nguồn</span>
                                {nb.hasGlobe && (
                                    <Globe width={14} height={14} className="text-neutral-600" />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HomePage;
