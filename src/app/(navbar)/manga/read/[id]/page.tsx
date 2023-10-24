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

export default async function MangaRead({params,searchParams}: MangaReadProps) {
	
	const targetManga = params.id;
	const activeChapter = parseFloat(searchParams.chapter) || 1;

	const mangaData = await getMangaMeta(targetManga);
	const mangaChapterData = await getMangaChapter(mangaData?.chapters[activeChapter-1].id || "");
	if(!mangaData || !mangaChapterData){
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
			<div className="manga-read-layout">

		
				{/* Sidebar / Action Navigation */}
				<section className='container_manga-action-detail'>

					{/* Top Sidebar */}
					<div className="top">
						
						{/* Site Navigation */}
						<div className="manga-navigation">
							<Link href={`/manga/detail/${targetManga}`} ><Button className='btn-readmanga active'><FaArrowLeft/></Button></Link>
							<Link href={'/'}><Button className='btn-readmanga active'><FaHome/></Button></Link>
						</div>

						{/* Logo */}
						<img src='/images/logo/logo.png' className='site-logo'></img>

						{/* Manga Navigation */}
						<div className="read-navigation">
							
							<p className='manga-title'>{title}</p>

							{ mangaData.chapters && mangaData.chapters[activeChapter-1] ? (
									<p className='active-chapter btn-readmanga-inactive'>{'Chapter ' + getChapterNumber(mangaData.chapters[activeChapter - 1].id, activeChapter.toString())}</p>
							) : <></>}

							<div className="chapter-navigation">
								<ParamLink param='chapter' value={Math.max(activeChapter - 1,1).toString()} ><Button className='btn-readmanga '> <ImArrowLeft/> </Button></ParamLink>
								<p className='chapter-total'> {activeChapter} / {mangaData.chapters.length} </p>
								<ParamLink param='chapter' value={Math.min(activeChapter + 1,mangaData.chapters.length).toString()}><Button className='btn-readmanga'> <ImArrowRight/> </Button></ParamLink>
							</div>
						</div>

					</div>

					{/* Bottom Sidebar */}
					<div className="bottom">

						{/* Options */}
						<div className="reading-options">

							{/* Reading Mode */}
							<div className="reading-option">
								<h3 className='reading-option-title'>Mode</h3>
								<div className="reading-option-buttons">
									<ParamLink param='mode' value='simple'>
										<Button className={`btn-readmanga ${readOptions.mode === 'simple' ? 'active' : 'inactive'}`}> <IoHammerOutline/> Simple </Button>
									</ParamLink>
									<ParamLink param='mode' value='advanced'>
										<Button className={`btn-readmanga ${readOptions.mode === 'advanced' ? 'active' : 'inactive'}`}> <IoHammer/> Advanced </Button>
									</ParamLink>
								</div>
							</div>
							{/* Direction */}
							<div className="reading-option">
								<h3 className='reading-option-title'>Direction</h3>
								<div className="reading-option-buttons">
									<ParamLink param='direction' value='vr'>
										<Button className={`btn-readmanga ${readOptions.direction === 'vr' ? 'active' : 'inactive'}`}> <IoSwapVertical/> Vertical </Button>
									</ParamLink>
									<ParamLink param='direction' value='hr'>
										<Button className={`btn-readmanga ${readOptions.direction === 'hr' ? 'active' : 'inactive'}`}> <IoSwapHorizontal/> Horizontal </Button>
									</ParamLink>
								</div>
							</div>
							{/*  Reading Direction */}
							<div className="reading-option">
								<h3 className='reading-option-title'>Reading Direction</h3>
								<div className="reading-option-buttons">
									<ParamLink param='read' value='ltr'>
										<Button className={`btn-readmanga ${readOptions.readingDirection === 'ltr' ? 'active' : 'inactive'}`}> Left <FaArrowRight/> Right </Button>
									</ParamLink>
									<ParamLink param='read' value='rtl'>
										<Button className={`btn-readmanga ${readOptions.readingDirection === 'rtl' ? 'active' : 'inactive'}`}> Right <FaArrowRight/> Left </Button>
									</ParamLink>
								</div>
							</div>
							{/* Page Mode */}
							<div className="reading-option">
								<h3 className='reading-option-title'>Page</h3>
								<div className="reading-option-buttons">
									<ParamLink param='pc' value='1'>
										<Button className={`btn-readmanga ${readOptions.pageCount === '1' ? 'active' : 'inactive'}`}> <BsBookHalf/> Single </Button>
									</ParamLink>
									<ParamLink param='pc' value='2'>
										<Button className={`btn-readmanga ${readOptions.pageCount === '2' ? 'active' : 'inactive'}`}> <BsBookFill/> Double </Button>
									</ParamLink>
								</div>
							</div>
						</div>

						{/* Sidebar Collapse */}
						<Button className='btn-collapse'> <FaArrowLeft/> Collapse</Button>
					</div>
					
				</section>

				{/* Manga View */}
				<section className='container_manga-view'>
					<Navbar resetPosition={true} hidden={false}/>
					{	
						readOptions.mode === 'simple' && 
						<div className='manga-basic-view'>
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
						<Suspense fallback={<div>Loading...</div>}>
							<MangaSwiperView direction={readOptions.readingDirection} doublePage={readOptions.pageCount === '2' && readOptions.direction !== 'vr'} vertical={readOptions.direction === 'vr'} pages={mangaChapterData}/>
						</Suspense>
					}
				</section>
				
			</div>
		</div>
	);
}