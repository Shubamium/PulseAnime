import './mangaChapterList.scss';
import { MangaChapter } from '@/types/MangaTypes';
import Link from 'next/link';
import React from 'react';
import { month } from '../../../../../../../util/utility';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';

type MangaChapterList = {
	chapters?:MangaChapter[]
}

export default function MangaChapterList({chapters}: MangaChapterList) {
  return (
	<div className='manga-chapter-list'>
		<div className="manga-chapter-header panel">
			<h2> <FaBookOpen/> Chapters</h2>
		</div>
		<div className="chapters">
			<div className="chapter-info">
				<p className='chapter-amount'>{chapters?.length}  Chapters</p>
			</div>
			{chapters ? chapters.map((chapter, index) => {
					const chapterNumber = chapter.id.match(/\d+$/);
					let releaseDate = new Date(chapter.releaseDate);
					const releaseDateString = releaseDate.getDate() + ' ' + month[releaseDate.getMonth()] + ', ' + releaseDate.getFullYear(); 
					return <Link className='manga-chapter-row' key={`chapter-${chapter.id}`} href={'/manga/read/'}>
								<span className='chapter'>Chapter { chapterNumber ? chapterNumber[0] : index} </span>
								<div className="action">
									<span className='date'>{releaseDateString} </span>
									<span className='read'>Read Now <FaArrowRight/> </span>
								</div>
						 </Link>
					;
			}):(
				<p>No chapters found, please check back another time!</p>
			)}
		</div>
	</div>
  );
}