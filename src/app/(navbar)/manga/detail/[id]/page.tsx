import Image from 'next/image';
import React from 'react';
import './mangaDetail.scss';
import DetailBanner from '@/components/general/detail/detailBanner/DetailBanner';
import DetailLayout from '@/components/general/detail/detailLayout/DetailLayout';
import DetailSidebar from '@/components/general/detail/detailSidebar/DetailSidebar';
import { redirect } from 'next/navigation';
import DetailGeneralInfo from '@/components/general/detail/detailGeneralInfo/DetailGeneralInfo';
type MangaDetailProps = {
	params:{
		id:string;
	}
}

export default function MangaDetail({ params }: MangaDetailProps) {
	
	if(!params.id){
		redirect('/');
	}
	
	const mangaDetails = [
		{
			title:'Manga Info 1',
			text:'Manga Value',
		},
		{
			title:'Manga Info 1',
			text:'Manga Value',
		},
		{
			title:'Manga Info 1',
			text:'Manga Value',
		},
		
	];
	
	return (
		<div id='container_manga-detail'>
			{/* Title */}
			<DetailBanner title={params.id} />		
			
			{/* Layout */}
			<DetailLayout className='manga-detail'>
				
				{/* Info */}
				<section id='info-section'>
					<DetailGeneralInfo
						details={mangaDetails}
						description={"Manga description"}
					/>
				</section>

				{/* Sidebar */}
				<DetailSidebar cover='src/images/awd.png' title={params.id} >

				</DetailSidebar>

			</DetailLayout>
		</div>
	);
}
