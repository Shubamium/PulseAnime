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

type MangaReadProps = {
	params:{
		id:string;
	}
	searchParams:{
		chapter:string;
	}
}

export default async function MangaRead({params,searchParams}: MangaReadProps) {
	
	const targetManga = params.id;
	const activeChapter = parseFloat(searchParams.chapter) || 1;

	const mangaData = await getMangaMeta(targetManga);
	const mangaChapterData = await getMangaChapter(mangaData?.chapters[activeChapter-1].id || "");
	if(!mangaData || !mangaChapterData){
		redirect('/');
	}

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
							<Link href={`/manga/detail/${targetManga}`} ><Button className='btn-readmanga'><FaArrowLeft/></Button></Link>
							<Link href={'/'}><Button className='btn-readmanga'><FaHome/></Button></Link>
						</div>

						{/* Logo */}
						<img src='/images/logo/logo.png' className='site-logo'></img>

						{/* Manga Navigation */}
						<div className="read-navigation">
							<p className='manga-title'>{title}</p>
							{ mangaData.chapters && mangaData.chapters[activeChapter-1] ? (
									<p className='active-chapter'>{'Chapter ' + getChapterNumber(mangaData.chapters[activeChapter - 1].id, activeChapter.toString())}</p>
							) : <></>}
							<div className="chapter-navigation">
								<Link href={`?chapter=${Math.max(activeChapter - 1,1)}`} scroll={false}><Button className='btn-readmanga'> <ImArrowLeft/> </Button></Link>
								<p className='chapter-total'> {activeChapter} / {mangaData.chapters.length} </p>
								<Link href={`?chapter=${Math.min(activeChapter + 1,mangaData.chapters.length)}`}><Button className='btn-readmanga'> <ImArrowRight/> </Button></Link>
							</div>
						</div>

					</div>

					{/* Bottom Sidebar */}
					<div className="bottom">
						<Button> <FaArrowLeft/> Collapse</Button>
					</div>
					
				</section>

				{/* Manga View */}
				<section className='container_manga-view'>
					<Navbar resetPosition={true} hidden={false}/>
					<div className='manga-basic-view'>
						{
							mangaChapterData.map((mangaChapter, index) => {
								return <div className='manga-page' key={`manga-page-${index}`} >
									<img src={mangaChapter.img}  className='manga-image' />
								</div>;
							})
						}
					</div>
					<Suspense fallback={<div>Loading...</div>}>
						{/* <MangaSwiperView direction='right' doublePage={false} vertical={true} pages={mangaChapterData}/> */}
					</Suspense>
				</section>
				
			</div>
		</div>
	);
}