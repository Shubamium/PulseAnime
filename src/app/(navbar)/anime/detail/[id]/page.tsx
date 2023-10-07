import { getAnimeMeta } from '@/db/AnimeData';
import Image from 'next/image';
import React from 'react';
import './animeDetail.scss';
import { FaArrowLeft, FaArrowRight, FaDownload, FaList } from 'react-icons/fa';
import { getTitle } from '@/db/util';
import MediaDetail from '@/components/mediaDetail/MediaDetail';
import { redirect } from 'next/navigation';
import EpisodeDisplayer from './episodeDisplayer/EpisodeDisplayer';

type Props = {
	params:{
		id:string;
	}
}


export default async function AnimeDetail({params}: Props) {
	const animeDetail = await getAnimeMeta(params.id);

	if(animeDetail === null){
		redirect('/');
	}

	const title = getTitle(animeDetail.title);
	return (
		<div className='container_anime-detail'>
			<div className="banner">
				<Image src={ animeDetail.cover || '/images/placeholder/banner.png'}  alt='banner' width={1200} height={400} ></Image>
				<div className="overlay"></div>
			</div>
			<div className="confine watch-section">
				<section className={"detail-part"+ ` ${ title.length >= 35 ? 'longer-header':''}`}>
					<div className='info-part'>
						<div className="title-container">
							<h2>{title} </h2>
							<span className='jp'>{animeDetail.title.native || ''}</span>
						</div>
					
						<div className="details-list">
							<MediaDetail title='Type' text={animeDetail.subOrDub} />
							<MediaDetail title='Episodes' text={animeDetail.totalEpisodes?.toString() || 'TBA'} />
							<MediaDetail title='Release Date' text={animeDetail.releaseDate || 'TBA'} />
							<MediaDetail title='Status' text={animeDetail.status} />
						</div>
						<div className="description panel">
							<div dangerouslySetInnerHTML={{__html:animeDetail.description} }></div>
						</div>
						{animeDetail.trailer && animeDetail.trailer.site === 'youtube' && (
							<div className="trailer">
								<iframe width="650" height="350" src={`https://www.youtube.com/embed/${animeDetail.trailer.id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
							</div>
						)}
					
					</div>
					<EpisodeDisplayer episodes={animeDetail.episodes} animeId={animeDetail.id}/>
				</section>
				<aside className="detail-sidebar">
					<Image className='poster' src={animeDetail.image} alt='anime-poster' width={300} height={400}/>
					<div className="sidebar-part">
						<h2>Detail Part here</h2>
					</div>
				</aside>		
			</div>
			
		</div>
	);
}