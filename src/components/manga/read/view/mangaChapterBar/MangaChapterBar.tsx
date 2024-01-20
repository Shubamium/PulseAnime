import React from 'react';
import './mangaChapterBar.scss';
import { FaSearch } from 'react-icons/fa';

type MangaChapterBarProps = {
	isOpen:boolean
}

export default function MangaChapterBar({isOpen}: MangaChapterBarProps) {
	return (
		<div className={`chapter-bar ${isOpen ? 'open' : ''}`}>
				<div className="content">
					<form className="chapter-bar-header">
						<input type="text" placeholder='Chapter Number. . .' className='chapter-search'  />
						<button type="submit"><FaSearch/></button>
					</form>

					<div className="chapter-lists">
						<div className="chapter">chapter 1</div>
						<div className="chapter">chapter 1</div>
						<div className="chapter">chapter 1</div>
					</div>
				</div>
		</div>
	);
}