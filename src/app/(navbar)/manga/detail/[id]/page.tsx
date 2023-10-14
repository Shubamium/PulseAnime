import Image from 'next/image';
import React from 'react';
import './mangaDetail.scss';
import DetailBanner from '@/components/general/detail/detailBanner/DetailBanner';
import DetailLayout from '@/components/general/detail/detailLayout/DetailLayout';
import DetailSidebar from '@/components/general/detail/detailSidebar/DetailSidebar';
import { redirect } from 'next/navigation';
type MangaDetailProps = {
	params:{
		id:string;
	}
}

export default function MangaDetail({ params }: MangaDetailProps) {
	
	if(!params.id){
		redirect('/');
	}
	
	return (
		<div id='container_manga-detail'>
			<DetailBanner title={params.id} />		
			<DetailLayout className='manga-detail'>
				<div className="detail">
					Heloo
				</div>
				<DetailSidebar cover='src/images/awd.png' title={params.id} >

				</DetailSidebar>
			</DetailLayout>
		</div>
	);
}
