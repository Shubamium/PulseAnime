import { getAnimeDetail } from '@/db/AnimeData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
	params:{
		id:string;
	}
}


export default async function AnimeDetail({params}: Props) {
	const animeDetail = await getAnimeDetail(params.id);
	return (
		<div>
			<Link href={'/'}>Home</Link>
			<div className='anime-detail'>
			<Image src={animeDetail.image} alt='anime-poster' width={300} height={400}/>
				<h2>{animeDetail.title}</h2>
				<p>{animeDetail.description}</p>
				<p><b>Type:</b>{animeDetail.subOrDub}</p>
				<p><b>Episodes:</b>{animeDetail.totalEpisodes}</p>
				<p><b>Release Date:</b>{animeDetail.releaseDate}</p>
				<p><b>Status:</b>{animeDetail.status}</p>
			</div>
			<div>
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
		</div>
	);
}