import Image from 'next/image';
import React from 'react';
import './mangaDetail.scss';
type MangaDetailProps = {
	params:{
		id:string;
	}
}

export default function MangaDetail({ params }: MangaDetailProps) {
  return (
    <div id='container_manga-detail'>
		{/* <p> Manga Detail of {params.id}</p> */}
		<div className="banner">
			<Image src={'/images/placeholder/banner.png'}  alt='banner' width={1200} height={400} ></Image>
		<div className="overlay"></div>
		</div>
    </div>
  );
}
