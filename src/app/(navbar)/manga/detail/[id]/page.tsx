import Image from 'next/image';
import React from 'react';
import './mangaDetail.scss';
import DetailBanner from '@/components/general/detail/detailBanner/DetailBanner';
import DetailLayout from '@/components/general/detail/detailLayout/DetailLayout';
import DetailSidebar from '@/components/general/detail/detailSidebar/DetailSidebar';
import { redirect } from 'next/navigation';
import DetailGeneralInfo from '@/components/general/detail/detailGeneralInfo/DetailGeneralInfo';
import { getMangaMeta } from '@/db/MangaData';
import { getChapterNumber, getReleaseDate, getTitle } from '@/db/util';
import { rating } from '../../../../../../util/utility';
import { FaStar } from 'react-icons/fa';
import ChapterList from '@/components/general/readLayout/chapterList/ChapterList';
import ChapterListItem from '@/components/general/readLayout/chapterList/chapterListItem/ChapterListItem';

type MangaDetailProps = {
	params:{
		id:string;
	}
}

export default async function MangaDetail({ params }: MangaDetailProps) {
	
	
	if(!params.id){
		redirect('/');
	}
	
	// Get manga data with id from parameter 
	const mangaData = await getMangaMeta(params.id);
	console.log(mangaData?.totalChapters);
	// If no manga data return to home
	if(!mangaData || mangaData === null){
		redirect('/');
	}

	const mangaDetails = [
		{
			title:'Status',
			text:mangaData.status,
		},
		{
			title:'Chapters',
			text: mangaData.chapters ? mangaData.chapters.length : 'N/A',
		},{
			title:'Release Date',
			text: mangaData.releaseDate
		},
		{
			title:'Rating',
			text: <p>  {rating(mangaData.rating)} <FaStar/> - {mangaData.popularity && mangaData.popularity} </p>,
		}
		
	];
	const mangaTitle = getTitle(mangaData.title);
	return (
		<div id='container_manga-detail'>
			{/* Title */}
			<DetailBanner title={mangaTitle} altTitle={mangaData.title?.native ?? ''}  src={mangaData.cover ?? null} />		
			
			{/* Layout */}
			<DetailLayout className='manga-detail'>
				
				{/* Info */}
				<section id='info-section'>
					<DetailGeneralInfo
						details={mangaDetails}
						description={mangaData.description}
						videoId={mangaData.trailer && mangaData.trailer.id ? mangaData.trailer.id : null }
					/>
					<ChapterList length={mangaData.chapters && mangaData.chapters.length}>
						{
							mangaData.chapters && mangaData.chapters.length > 0 && mangaData.chapters.map((chapter, index) => {
								const chapterNumber = getChapterNumber(chapter.id);
								let releaseDate = getReleaseDate(chapter.releaseDate);
								return <ChapterListItem
													key={`chapter-${chapter.id}`}
													href={`/manga/read/${mangaData.id}?chapter=${index+1}`}
													chapterTitle={'Chapter ' +  (chapterNumber ? chapterNumber[0] : index)}  
													releaseDate={releaseDate}
												/>
								;
						})
						}
					</ChapterList>
				</section>


				{/* Sidebar */}
				<DetailSidebar cover={mangaData.image} title={mangaTitle}>
				<></>
				</DetailSidebar>

			</DetailLayout>
		</div>
	);
}
