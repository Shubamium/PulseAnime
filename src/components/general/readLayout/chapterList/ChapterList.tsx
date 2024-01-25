import { FaBookOpen } from 'react-icons/fa';
import './chapterList.scss';
import React from 'react';

type ChapterListProps = {
	length?:number;
	children: React.ReactNode;
}

export default function ChapterList({length,children}: ChapterListProps) {
  return (
	<div className='chapter-list'>
		<div className="chapter-header panel">
			<h2> <FaBookOpen/> Chapters</h2>
		</div>
			<div className="chapter-info">
				<p className='chapter-amount'>{length ?? 'No'}  Chapters</p>
			</div>
		<div className="chapters">
			{children ?? (
				<p>No chapters found, please check back another time!</p>
			)}
		</div>
	</div>
  );
}