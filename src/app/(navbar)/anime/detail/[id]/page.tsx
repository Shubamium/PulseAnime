import { getAnimeDetail } from '@/db/AnimeData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './animeDetail.scss';

type Props = {
	params:{
		id:string;
	}
}


export default async function AnimeDetail({params}: Props) {
	const animeDetail = await getAnimeDetail(params.id);
	return (
		<div className='container_anime-detail'>
			<div className="banner">
				<Image src={'/images/placeholder/banner.png'}  alt='banner' width={1200} height={400} ></Image>
				<div className="overlay"></div>
			</div>
			<div className="confine">
				<section className="detail-part">
					<div className='info-part'>
						<div className="title-container">
							<h2>{animeDetail.title}</h2>
						</div>
						<div className="details-list">
							<div className="detail">
								<div className="detail-name">
									<p>Type</p>
								</div>
								<div className="detail-text panel">
									<p>{animeDetail.subOrDub}</p>
								</div>
							</div>
							<div className="detail">
								<div className="detail-name">
									<p>Episodes</p>
								</div>
								<div className="detail-text panel">
									<p>{animeDetail.episodes.length}</p>
								</div>
							</div>
							<div className="detail">
								<div className="detail-name">
									<p>Release Date</p>
								</div>
								<div className="detail-text panel">
									<p>{animeDetail.releaseDate}</p>
								</div>
							</div>
							<div className="detail">
								<div className="detail-name">
									<p>Status</p>
								</div>
								<div className="detail-text panel">
									<p>{animeDetail.status}</p>
								</div>
							</div>
						</div>
						<div className="description panel">
							<p>{animeDetail.description}</p>
						</div>
					
					</div>
					<div className="episodes-list">
						{animeDetail.episodes && animeDetail.episodes.map((episode)=>{
							return (
								<div className="episode" key={'episode-list-'+ episode.id}>
									<h2>Episode: {episode.number}</h2>
									<button>Download</button>
									<Link href={'/anime/watch/'+animeDetail.id+`?episode=${episode.number}`}><button>Watch</button></Link>
								</div>
							);
						})}
					</div>
				</section>
				<aside className="detail-sidebar">
					<Image className='poster' src={animeDetail.image} alt='anime-poster' width={300} height={400}/>
					<div className="sidebar-detail">
						<h2>Detail Part here</h2>
					</div>
				</aside>		
			</div>
		</div>
	);
}