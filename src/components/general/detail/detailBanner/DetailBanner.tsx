import Image from 'next/image';
import React from 'react';
import './detailBanner.scss';
type DetailBannerProps = {
	src?:string;
	title:string;
	altTitle?:string;
}

export default function DetailBanner({src,title,altTitle}: DetailBannerProps) {
	const bannerImg =  src || '/images/placeholder/banner.png';
  return (
		<div className="detail-banner">
			<div className="banner-container">
				<Image src={bannerImg} alt='banner' width={1200} height={400}></Image>
			</div>
			{/* <div className="banner-img" style={{backgroundImage:`url(${src ?? '/images/placeholder/banner.png'});`}}></div> */}
			<div className="overlay"></div>
			 
			<div className="title-container">
				<div className="confine">
					<div className="title">
						<h2>{title}</h2>
						<span className='jp'>{altTitle || ''}</span>
					</div>
					<div className="block"></div>
				</div>
			</div>
					
		</div>
  );
}