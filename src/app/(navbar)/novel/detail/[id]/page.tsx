import MediaDetailRow from '@/app/(navbar)/anime/detail/[id]/mediaDetailRow/MediaDetailRow';
import DetailBanner from '@/components/general/detail/detailBanner/DetailBanner';
import DetailGeneralInfo from '@/components/general/detail/detailGeneralInfo/DetailGeneralInfo';
import DetailLayout from '@/components/general/detail/detailLayout/DetailLayout';
import DetailSidebar from '@/components/general/detail/detailSidebar/DetailSidebar';
import { getNovelMeta } from '@/db/NovelData';
import { redirect } from 'next/navigation';
import React from 'react';
import './novelDetail.scss';
import StarRating from '@/components/general/starRating/StarRating';
import { FaEye } from 'react-icons/fa';
type NovelDetailProps = {
	params:{
		id:string;
	}
}
export default async function NovelDetail({params}: NovelDetailProps) {

	const novelData = await getNovelMeta(params.id);
	if(!novelData) redirect('/');
	const formatAuthorName = (name:string)=>{
		let switchIndex = -1;

		for (let i = 0; i < name.length; i++) {
				// Check if the character is Kanji
				if (name.charCodeAt(i) >= 0x4e00 && name.charCodeAt(i) <= 0x9fa5) {
						switchIndex = i;
						break;
				}
		}

		if(switchIndex === -1) return name;
		const nameArr = name.split(''); 
		const romaji = nameArr.slice(0, switchIndex).join('');
		const kanji = nameArr.slice(switchIndex,nameArr.length).join('');
		return romaji + ' (' + kanji + ') ';
	};

	const formattedAuthor = formatAuthorName(novelData.author);
	const novelDetails = [
		{
			title:'Status',
			text:novelData.status,
		},{
			title:'Page',
			text:novelData.pages,
		},{
			title:'Author',
			text:formattedAuthor.length > 30 ? formattedAuthor.slice(0,30) + '...' : formattedAuthor
		},{
			title:'Rating',
			text: <>
			 <StarRating rating={novelData.rating / 2 + 1}/> - {novelData.rating / 2} 
			</>
		}
	];


	return (
		<div id='container_novel-detail'>

			<DetailBanner title={novelData.title} altTitle={formattedAuthor} src={novelData.image}/>
			<DetailLayout  >
				<div className='novel-detail'>
					<DetailGeneralInfo description={novelData.description}  details={novelDetails}/>
				</div>
				<DetailSidebar cover={novelData.image} title={novelData.title}>
				<div className="group">
						<MediaDetailRow title="Rating">
								<div className="data">
										<p><StarRating rating={novelData.rating / 2}/> {novelData.rating /2} / 5 </p> 
								</div>
							</MediaDetailRow>
							<MediaDetailRow title={<><FaEye/> Views</>}>
									<p>{novelData.views}</p>
							</MediaDetailRow>
					</div>
					<MediaDetailRow title='Author'>
						 <p>{formattedAuthor}</p>
					</MediaDetailRow>
					<MediaDetailRow title='Genre'>
							<div className="genre-list">
								{novelData.genres.map((genre)=>{
									return (
										<p className='genre' key={genre}>{genre}</p>
									);
								})}
							</div>
						</MediaDetailRow>
			
				</DetailSidebar>
			</DetailLayout>
		</div>
	);
}