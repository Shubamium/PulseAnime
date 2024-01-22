'use client';

import React, { useState } from 'react';
import './mangaChapterBar.scss';
import { FaSearch } from 'react-icons/fa';
import { MangaChapter } from '@/types/MangaTypes';
import { getChapterNumber } from '@/db/util';
import Link from 'next/link';
import ParamLink from '@/components/general/paramLink/ParamLink';
import Button from '@/components/general/button/Button';
import {TbArrowBarToLeft} from 'react-icons/tb';
type MangaChapterBarProps = {
	isOpen:boolean
	chapterlist: MangaChapter[]
	activeChapter:string,
	onClose: () => void
}

export default function MangaChapterBar({onClose,isOpen,chapterlist,activeChapter}: MangaChapterBarProps) {
	const [search,setSearch] = useState('');

	const list = chapterlist.filter((c)=>{
		return c.id.includes(search);
	});
	return (
		<div className={`chapter-bar ${isOpen ? 'open' : ''}`}>
				<div className="content">
					<form className="chapter-bar-header" onSubmit={(e)=>{
						e.preventDefault();
					}}>
						<Button type='reset' onClick={onClose}  className='btn-search'><TbArrowBarToLeft/></Button>
						<input type="text" value={search} onChange={(e)=>{setSearch(e.target.value);}} placeholder='Chapter Number. . .' className='chapter-search'  />
					</form>

					<div className="chapter-lists">
						{list && list.length > 0 && list.map((c,index)=>{
							const chapterNumber = getChapterNumber(c.id);
							return <ParamLink param='chapter' value={(chapterlist.findIndex((list) => list.id === c.id)+1).toString()} className={`chapter ${activeChapter && c.id === activeChapter ? 'active' : ''}`} key={c.id}>
								Chapter {chapterNumber ? chapterNumber[0] : index}
							</ParamLink>;
						})}
					</div>
				
				</div>
		</div>
	);
}