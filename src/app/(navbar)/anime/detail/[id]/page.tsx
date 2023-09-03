import { getAnimeMeta } from '@/db/AnimeData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './animeDetail.scss';
import Button from '@/components/general/button/Button';
import { FaArrowLeft, FaArrowRight, FaDownload, FaList } from 'react-icons/fa';
import { getTitle, splitIntoParagraphs } from '@/db/util';
import MediaDetail from '@/components/mediaDetail/MediaDetail';
import { redirect } from 'next/navigation';

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
							{/* { splitIntoParagraphs(animeDetail.description).map((sentence,index)=>{
								return index % 4 === 0 ? 
								(
									<React.Fragment key={'paragraph-sentences' + index}>
										<p>{sentence}</p>
									</React.Fragment>
								)
								: (
									<p key={'paragraph-sentences' + index}>{sentence}</p>
								);
							})} */}
						</div>
						{animeDetail.trailer && animeDetail.trailer.site === 'youtube' && (
							<div className="trailer">
								<iframe width="650" height="350" src={`https://www.youtube.com/embed/${animeDetail.trailer.id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
							</div>
						)}
					
					</div>
					<div className="episodes">
						<div className="header">
							<div className="left">
								<FaList className="icon"/>
								<h2>  Episodes</h2>
							</div>
							<div className="right">
								<select>
									<option>Server 1 </option>
									<option>Server 2 </option>
									<option>Server 3</option>
								</select>
							</div>
						</div>
						<div className="list">
							{animeDetail && animeDetail.episodes && animeDetail.episodes.map((episode)=>{
								return (
									<div className="episode panel" key={'episode-list-'+ episode.id}>
										<div className="episode-header">
											<h2 className=''>Episode {episode.number}</h2>
										</div>
										<div className="episode-body">
											<Button className='btn-download'>Download <FaDownload/></Button>
											<Button className='btn-watch'><Link href={'/anime/watch/'+animeDetail.id+`?episode=${episode.number}`}>Watch <FaArrowRight/></Link></Button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
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