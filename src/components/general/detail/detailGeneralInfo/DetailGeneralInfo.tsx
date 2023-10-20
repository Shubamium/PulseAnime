import MediaDetail from '@/components/mediaDetail/MediaDetail';
import React, { ReactNode } from 'react';
import './detailGeneralInfo.scss';

type detailGeneralInfoProps = {
	details:{
		title:string
		text:string | ReactNode | null
	}[]
	description?:any
	videoId?:string | null
}

export default function DetailGeneralInfo({details,description,videoId}: detailGeneralInfoProps) {
  return (
	<div className='detail-general-info'>
		{/* Detail List */}
		<div className="details-list">
			{details.map((detail,index)=>{
				if(detail.text === null )return <></>;
				return <MediaDetail title={detail.title} text={detail.text} key={`media-general-detail-${detail.title}-${index}`}/>;
			})}
		</div>

		{/* Description */}
		{
			description && description !== '' &&  
			<div className="description panel">
					<div dangerouslySetInnerHTML={{__html:description ?? ''} }></div>
			</div>
		}

		{/* Trailer / Video */}
		{videoId && (
			<div className="trailer">
				<iframe width="650" height="350" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
			</div>
		)}

	</div>
  );
}