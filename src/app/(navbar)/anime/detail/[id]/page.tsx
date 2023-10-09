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

type Props = {
	params:{
		id:string;
	}
}

const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export default async function AnimeDetail({params}: Props) {
	const animeDetail = await getAnimeMeta(params.id);

	if(!animeDetail.id){
		redirect('/');
	}

	const title = getTitle(animeDetail.title);
	const sequel = animeDetail.relations.filter((relation)=> relation.relationType === 'SEQUEL');
	const prequel = animeDetail.relations.filter((relation)=> relation.relationType === 'PREQUEL');
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
							<MediaDetail title='Studios' text={animeDetail.studios.join(', ')} />
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
						
						<div className="sidebar-header">
							<h2><FaInfoCircle/> Info</h2>
						</div>

						<p className='media-title'>{title}</p>

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
							<MediaDetailRow title='Episodes'>
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
								<p>{animeDetail.rating / 100 * 5} <FaStar/> - {animeDetail.popularity} </p> 
						</MediaDetailRow>

					    {/* Sequel */}
						{
							sequel.length !== 0 && (
								<MediaDetailRow title={<><FaFastBackward/> Sequel  </>}>
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
						{/* Prequel */}
						{
							prequel.length !== 0 && (
								<MediaDetailRow title={<><FaFastForward/> Prequel</>}>
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
				</aside>		
			</div>
			
		</div>
	);
}