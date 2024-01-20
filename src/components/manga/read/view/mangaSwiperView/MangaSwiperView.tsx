import { MangaChapterPage } from '@/types/MangaTypes';
'use client';
import React, { useEffect,useState } from 'react';
import {useKeenSlider} from 'keen-slider/react';
import './mangaSwiperView.scss';
type MangaSwiperView = {
	pages: MangaChapterPage[]
	doublePage?: boolean;
	direction:'rtl'|'ltr';
	vertical?:boolean;
}

export default function MangaSwiperView({pages,direction,doublePage,vertical}: MangaSwiperView) {
	const [pageCount,setPageCount] = useState(1);
	const [currentPage,setCurrentPage] = useState(1);

	const [sliderRef,instanceRef] = useKeenSlider({
		slideChanged:()=>{
			console.log(instanceRef.current?.track.details.position,instanceRef.current?.track.details.maxIdx);
			setCurrentPage(Math.round((instanceRef.current?.track.details.position ?? 0) +1));
			setPageCount((instanceRef.current?.track.details.max ?? 1) + 1);
		},
		updated:()=>{
			setTimeout(() => {
				console.log('created',instanceRef.current?.track.details.maxIdx);	
				setPageCount((instanceRef.current?.track.details.maxIdx ?? 1) + 1);
			}, 250);
		},
		initial:0,
		mode:'snap',
		slides:{
			perView:doublePage ? 2 : 1,
		},
		rtl:!vertical && direction === 'rtl',
		vertical:vertical,

	});	
	
	const moveNext = ()=>{
		instanceRef.current?.next();
	};
	const movePrev = ()=>{
		instanceRef.current?.prev();
	};
	const setPage = (page:number)=>{
		if(doublePage){
			page = page * 2;
		}
		setCurrentPage(page);
		instanceRef.current?.moveToIdx(page);
	};
	useEffect(()=>{

		window.addEventListener('keydown',(e)=>{
			if(e.key === 'ArrowRight'){
				moveNext();
			}
			if(e.key === 'ArrowLeft'){
				movePrev();
			}
		});

	},[]);
	useEffect(()=>{
		instanceRef.current?.update();
		instanceRef.current?.track.to(0);
	},[pages]);
	return (
		<>
			<div className="manga-swiper-view keen-slider hidden manga-view" ref={sliderRef}   >
					<div className='manga-progress' style={{gridTemplateColumns:`repeat(${pageCount + 2},1fr)`}}>
						{new Array(doublePage ? Math.floor(pages.length / 2) : pages.length ).fill('progres').map((_,index)=>{
							return <div onClick={()=>setPage(index)} className={`progress-part ${index+1 <= currentPage ? 'filled' : ''}`} key={'progress-view-'+index}></div>;
						})}
					</div>
					{pages.map((page,index)=>{
						return <div className={`manga-slide keen-slider__slide`} key={`manga-page-${index}`}>
							<img src={page.img}  className='manga-image' />
						</div>;
					})}
			</div>
		</>
	);
}