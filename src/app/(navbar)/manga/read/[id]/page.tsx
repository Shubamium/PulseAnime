import NavbarSetter from '@/components/general/navbarSetter/NavbarSetter';
import { getMangaMeta } from '@/db/MangaData';
import Link from 'next/link';
import React from 'react';
import './mangaRead.scss';
import Button from '@/components/general/button/Button';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { getTitle } from '@/db/util';
import { redirect } from 'next/navigation';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import Navbar from '@/components/general/navbar/Navbar';
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
	const activeChapter = searchParams.chapter;

	const mangaData = await getMangaMeta(targetManga);
	if(!mangaData){
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
							<Link href={`/manga/detail/${targetManga}`}><Button><FaArrowLeft/></Button></Link>
							<Link href={'/'}><Button><FaHome/></Button></Link>
						</div>

						{/* Logo */}
						<img src='/images/logo/logo.png' className='site-logo'></img>
						

						{/* Manga Navigation */}
						<div className="read-navigation">
							<p className='manga-title'>{title}</p>
							<p className='active-chapter'>{activeChapter}</p>
							<div className="chapter-navigation">
								<Button className='btn-readmanga'> <ImArrowLeft/> </Button>
								<p className='chapter-total'></p>
								<Button className='btn-readmanga'> <ImArrowRight/> </Button>
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
					<img src="https://i.ibb.co/y0hqsNG/p-1.png" className='manga-image' />
				</section>
				
			</div>
		</div>
	);
}