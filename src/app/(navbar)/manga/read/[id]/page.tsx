import NavbarSetter from '@/components/general/navbarSetter/NavbarSetter';
import { getMangaChapter, getMangaMeta } from '@/db/MangaData';
import Link from 'next/link';
import React, { Suspense } from 'react';
import './mangaRead.scss';
import Button from '@/components/general/button/Button';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { getChapterNumber, getTitle } from '@/db/util';
import { redirect } from 'next/navigation';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import Navbar from '@/components/general/navbar/Navbar';
import MangaSwiperView from '@/components/manga/read/view/mangaSwiperView/MangaSwiperView';
import 'keen-slider/keen-slider.min.css';
import {IoSwapVertical, IoSwapHorizontal, IoHammer, IoHammerOutline} from 'react-icons/io5';
import ParamLink from '@/components/general/paramLink/ParamLink';
import { BsBook, BsBookFill, BsBookHalf } from 'react-icons/bs';
import { MangaChapterPage } from '@/types/MangaTypes';
import RootLoading from '../loading';
import MangaReadLayout from './mangaReadLayout';
type MangaReadProps = {
	params:{
		id:string;
	}
	searchParams:{
		chapter:string;
		mode:'advanced' | 'simple';
		direction: 'hr' | 'vr';
		read : 'rtl' |'ltr';
		pc: '1' | '2';
	}
}

type MangaReadOptions = {
	mode: 'advanced' | 'simple'
	direction:'hr' | 'vr'
	readingDirection : 'rtl' |'ltr'
	pageCount: '1' | '2'
}


async function MangaView({chapterId,readOptions}:{chapterId:string,readOptions:MangaReadOptions}) {
	const mangaChapterData = await getMangaChapter(chapterId || "");
	if(!mangaChapterData) {
		return <h1>Chapter not found</h1>;
	}
	return <>
		{/* Manga View */}
		<section className='container_manga-view'>
					<Navbar resetPosition={true} hidden={false}/>
					{	
						readOptions.mode === 'simple' && 
						<div className='manga-basic-view manga-view'>
							{
								mangaChapterData.map((mangaChapter, index) => {
									return <div className='manga-page' key={`manga-page-${index}`} >
										<img src={mangaChapter.img}  className='manga-image' />
									</div>;
								})
							}
						</div>
					}
					{
						readOptions.mode === 'advanced' && 
						<MangaSwiperView direction={readOptions.readingDirection} doublePage={readOptions.pageCount === '2' && readOptions.direction !== 'vr'} vertical={readOptions.direction === 'vr'} pages={mangaChapterData}/>
					}
		</section>
	</>;
}
export default async function MangaRead({params,searchParams}: MangaReadProps) {
	
	const targetManga = params.id;
	const activeChapter = parseFloat(searchParams.chapter) || 1;

	const mangaData = await getMangaMeta(targetManga);
	if(!mangaData ){
		redirect('/');
	}

	const readOptions:MangaReadOptions = {
		mode: searchParams.mode ?? 'advanced',
		direction: searchParams.direction ?? 'vr',
		readingDirection : searchParams.read ??'ltr',
		pageCount : searchParams.pc ?? '1'
	};

	const title = getTitle(mangaData.title);

	return (
		
		<div className='container_manga-read'>
			<NavbarSetter/>
			<MangaReadLayout activeChapter={activeChapter} mangaData={mangaData} targetManga={targetManga} title={title} readOptions={readOptions}>
				<Suspense fallback={<RootLoading/>}>
					<MangaView chapterId={mangaData?.chapters[activeChapter-1].id} readOptions={readOptions}/>
				</Suspense>
			</MangaReadLayout>
				
		</div>

	);
}

