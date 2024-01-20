'use client';
import Button from '@/components/general/button/Button';
import ParamLink from '@/components/general/paramLink/ParamLink';
import { getChapterNumber } from '@/db/util';
import { MangaMeta } from '@/types/MangaTypes';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import {IoSwapVertical, IoSwapHorizontal, IoHammer, IoHammerOutline} from 'react-icons/io5';
import { BsBook, BsBookFill, BsBookHalf } from 'react-icons/bs';
import { MangaChapterPage } from '@/types/MangaTypes';
type Props = {
	children:React.ReactNode;
	title:string;
	mangaData:MangaMeta;
	activeChapter:number;
	targetManga:string;
	readOptions:any;
}

export default function MangaReadLayout({mangaData,title,targetManga,activeChapter,children, readOptions}: Props) {
	const [isCollapsed,setIsCollapsed] = useState(false);
	
	function collapse(){
		setIsCollapsed(true);
	}
	function show(){
		setIsCollapsed(false);
	}
	
	return (
		<div className={`manga-read-layout ${isCollapsed ? 'collapsed' :''}`} >

		{/* Sidebar / Action Navigation */}
		<section className='container_manga-action-detail'>

			{/* Show Button */}
			<div className="show-bar">
				<Button onClick={show}><FaArrowRight/></Button>
			</div>
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
						{readOptions.mode === 'advanced' ? (
							<>
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
										{readOptions.direction === 'hr' ? <>
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
										
										</>: <></>}
							</>
						): <></>}
				</div>

				{/* Sidebar Collapse */}
				<Button className='btn-collapse' onClick={collapse}> <FaArrowLeft/> Collapse</Button>
			</div>
			
		</section>
		
		{children}
		
	</div>
	);
}