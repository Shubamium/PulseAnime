import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

type ChapterListItem = {
	chapterTitle:string;
	releaseDate?:string;
	href:string;
}

export default function ChapterListItem({chapterTitle,href,releaseDate}: ChapterListItem) {
	return (
		<Link className='chapter-row' href={href}>
			<span className='chapter'>{chapterTitle}</span>
			<div className="action">
				<span className='date'>{releaseDate ?? 'Read Now' } </span>
				<span className='read'>Read Now <FaArrowRight/> </span>
			</div>
	 </Link>
	);
	
}
