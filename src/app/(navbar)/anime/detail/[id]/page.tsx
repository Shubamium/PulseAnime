import { getAnimeMeta } from '@/db/AnimeData';
import Image from 'next/image';
import React from 'react';
import './animeDetail.scss';
import { FaArrowLeft, FaArrowRight, FaDownload, FaFastBackward, FaFastForward, FaInfoCircle, FaList, FaStar } from 'react-icons/fa';
import { getTitle } from '@/db/util';
import MediaDetail from '@/components/mediaDetail/MediaDetail';
import { redirect } from 'next/navigation';
import EpisodeDisplayer from './episodeDisplayer/EpisodeDisplayer';
import MediaDetailRow from './mediaDetailRow/MediaDetailRow';
import Link from 'next/link';
import DetailBanner from '@/components/general/detail/detailBanner/DetailBanner';
import DetailLayout from '@/components/general/detail/detailLayout/DetailLayout';
import DetailSidebar from '@/components/general/detail/detailSidebar/DetailSidebar';
import DetailGeneralInfo from '@/components/general/detail/detailGeneralInfo/DetailGeneralInfo';
import { month, rating } from '../../../../../../util/utility';

type AnimeDetailProps = {
	params:{
		id:string;
	}
}


export default async function AnimeDetail({params}: AnimeDetailProps) {

	const animeDetail = await getAnimeMeta(params.id);

	if(!animeDetail.id){
		redirect('/');
	}

	const title = getTitle(animeDetail.title);
	const sequel = animeDetail.relations.filter((relation)=> relation.relationType === 'SEQUEL');
	const prequel = animeDetail.relations.filter((relation)=> relation.relationType === 'PREQUEL');

	const animeGeneralDetails = [
		{
			title: 'Studios',
			text: animeDetail.studios.join(', ')
		},{
			title: 'Episodes',
			text: animeDetail.totalEpisodes?.toString() || 'TBA'
		},{
			title: 'Release Date',
			text: animeDetail.releaseDate || 'TBA'
		},{
			title: 'Status',
			text: animeDetail.status
		}
	];

	return (
		<div className='container_anime-detail'>

			<DetailBanner src={animeDetail.cover} title={title} altTitle={animeDetail.title.native}/>

			<DetailLayout className="watch-section">

				{/* Info */}
				<section className={"detail-part"}>
					<DetailGeneralInfo
						details={animeGeneralDetails}
						description={animeDetail.description}
						videoId={animeDetail.trailer && animeDetail.trailer.site === 'youtube' ? animeDetail.trailer.id :  null}
					/>
					<EpisodeDisplayer episodes={animeDetail.episodes} animeId={animeDetail.id}/>
				</section>

				{/* Sidebar */}
				<DetailSidebar cover={animeDetail.image} title={title}>
					<div className="anime-detail">
						<div className="detail-grid">
							<MediaDetailRow title='Format'>
								<p>{animeDetail.type}</p>
							</MediaDetailRow>
							<MediaDetailRow title='Season'>
								<p>{animeDetail.season + ' ' +  animeDetail.startDate.year}</p>
							</MediaDetailRow>
						
							<MediaDetailRow title='Start'>
								<p>{month[animeDetail.startDate.month] + ' ' + (animeDetail.startDate.day ?  animeDetail.startDate.day +' ,' :'')  + ' ' + animeDetail.startDate.year}</p>
							</MediaDetailRow>
							<MediaDetailRow title='End'>
								{animeDetail.endDate.day && month[animeDetail.endDate.month] ? <p>{month[animeDetail.endDate.month] + ' ' + animeDetail.endDate.day + ', ' + animeDetail.endDate.year}</p> : animeDetail.endDate.year ? <p>{animeDetail.endDate.year}</p> : <p>N/A</p>}
							</MediaDetailRow>
							<MediaDetailRow title='Total Episodes'>
								<p>{animeDetail.currentEpisodes ? animeDetail.currentEpisodes + '/' : ''}{animeDetail.totalEpisodes}</p>
							</MediaDetailRow>
							{animeDetail.duration && (
								<MediaDetailRow title='Duration'>
									<p>{animeDetail.duration + ' mins'}</p>
								</MediaDetailRow>
							)}
						</div>

						<MediaDetailRow title='Genre'>
							<div className="genre-list">
								{animeDetail.genres.map((genre)=>{
									return (
										<p className='genre' key={genre}>{genre}</p>
									);
								})}
							</div>
						</MediaDetailRow>
					
						{/* Popularity */}
						<MediaDetailRow title={<>Ratings & Popularity </>}>
								<p>{rating(animeDetail.rating)} <FaStar/> - {animeDetail.popularity} </p> 
						</MediaDetailRow>

						{/* Sequel */}
						{
							prequel.length !== 0 && (
								<MediaDetailRow title={<><FaFastBackward/> Prequel  </>}>
									{prequel.map((anime)=>{
										return (
											<Link href={'/anime/detail/'+anime.id} key={anime.id} className='show-link'>
												{getTitle(anime.title)}
											</Link>
										);
									})}
							</MediaDetailRow> 
							)
						}
						{/* Prequel */}
						{
							sequel.length !== 0 && (
								<MediaDetailRow title={<><FaFastForward/> Sequel</>}>
									{sequel.map((anime)=>{
										return (
											<Link href={'/anime/detail/'+anime.id} key={anime.id} className='show-link'>
												{getTitle(anime.title)}
											</Link>
										);
									})}
							</MediaDetailRow> 
							)
						}
						{/* Other Names */}
						{animeDetail.synonyms?.length !== 0 && (
							<MediaDetailRow title='Other Names'>
								<div className="genre-list">
									{animeDetail.synonyms.map((genre)=>{
										return (
											<p className='genre' key={genre}>{genre}</p>
										);
									})}
								</div>
							</MediaDetailRow>
						)}
					</div>
				</DetailSidebar>
			
			</DetailLayout>
			
		</div>
	);
}