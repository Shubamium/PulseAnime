import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import { getAnimeDetail, getAnimeEpisode } from "@/db/AnimeData";
import Link from "next/link";
import './watchAnime.scss';
type Props = {
	searchParams:{
		episode:number;
		anime:string;
	},
	params:{
		anime:string;
	}
	
}

export default async function AnimeWatch({searchParams,params}: Props) {
	const animeId = params.anime;
	const episodeNumber = searchParams.episode;
	
	const animeDetail = await getAnimeDetail(animeId);
	// const episode = animeDetail.episodes.find((episode) => episode.number === episodeNumber);

	const episodeData =  animeDetail.episodes[episodeNumber] ? await getAnimeEpisode(animeDetail.episodes[episodeNumber-1].id) : null;
	console.log(episodeData);
	return (
		<div className="container_watch-anime">
			{/* <h2>{animeDetail.title}</h2>
			<p>{searchParams.episode}</p> */}
			<div className="confine">
				<section className="media-player layout">
					<div className="left">
						{episodeData && episodeData.sources[1] && episodeData.sources[3].isM3U8 &&
							(
								<div className="video">
									<VideoPlayer url={episodeData.sources[3].url}/>
								</div>
							)
						}
					</div>
					<div className="right">
						<div className="episodes">
							<div className="episode-header">
								Episodes
							</div>
							<div className="episode-list">
								<div className="episode">
									<h2>Episode 1</h2>
								</div>
								<h2>Episode 1</h2>
								<h2>Episode 1</h2>
								<h2>Episode 1</h2>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}