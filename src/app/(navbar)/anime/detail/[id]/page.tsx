import { getAnimeDetail } from '@/db/AnimeData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './animeDetail.scss';
import Button from '@/components/general/button/Button';
import { FaArrowLeft, FaArrowRight, FaDownload, FaList } from 'react-icons/fa';
import { splitIntoParagraphs } from '@/db/util';

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
							{splitIntoParagraphs(animeDetail.description).map((sentence,index)=>{
								return index % 4 === 0 ? 
								(
									<React.Fragment key={'paragraph-sentences' + index}>
										<p>{sentence}</p>
										<br/>
									</React.Fragment>
								)
								: (
									<p key={'paragraph-sentences' + index}>{sentence}</p>
								);
							})}
						</div>
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
							{animeDetail.episodes && animeDetail.episodes.map((episode)=>{
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
						{/* <h2>Detail Part here</h2> */}
					</div>
				</aside>		
			</div>
		</div>
	);
}