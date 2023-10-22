import './mangaChapterList.scss';
import { MangaChapter } from '@/types/MangaTypes';
import Link from 'next/link';
import React from 'react';
import { month } from '../../../../../../../util/utility';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';
import { getChapterNumber, getReleaseDate } from '@/db/util';

type MangaChapterList = {
	chapters?:MangaChapter[]
	mangaId:string
}

export default function MangaChapterList({chapters,mangaId}: MangaChapterList) {
  return (
	<div className='manga-chapter-list'>
		<div className="manga-chapter-header panel">
			<h2> <FaBookOpen/> Chapters</h2>
		</div>
			<div className="chapter-info">
				<p className='chapter-amount'>{chapters?.length}  Chapters</p>
			</div>
		<div className="chapters">
			{chapters ? chapters.map((chapter, index) => {
					const chapterNumber = getChapterNumber(chapter.id);
					let releaseDate = getReleaseDate(chapter.releaseDate);

					return <Link className='manga-chapter-row' key={`chapter-${chapter.id}`} href={`/manga/read/${mangaId}?chapter=${index+1}`}>
								<span className='chapter'>Chapter { chapterNumber ? chapterNumber[0] : index} </span>
								<div className="action">
									<span className='date'>{releaseDate} </span>
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