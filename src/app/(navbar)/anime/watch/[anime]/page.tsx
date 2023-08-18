import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import { getAnimeDetail, getAnimeEpisode } from "@/db/AnimeData";
import Link from "next/link";
import './watchAnime.scss';
import Button from "@/components/general/button/Button";
import { FaDownload, FaExpand, FaStar } from "react-icons/fa";
import {MdSkipPrevious, MdSkipNext} from 'react-icons/md';
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
				<section className="media-detail layout">
					<div className="container_media-detail">
						<div className="media-header">
							<h2 className="title">{animeDetail.title}</h2>
							<p className="episode-number">Episode {episodeNumber}</p>
						</div>
						<div className="media-action">
							<select className="dropdown">
								<option value="gogoanime">Gogoanime</option>
								<option value="gogoanime">Zoro</option>
								<option value="gogoanime">Enime</option>
								<option value="gogoanime">9Anime</option>
								<option value="gogoanime">AnimeFox</option>
							</select>
							<div className="episode-control">
								<Button><MdSkipPrevious/>Prev</Button>
								<Button>Next<MdSkipNext/></Button>
							</div>
							<Button className="btn-download"><FaDownload/>Download</Button>
							<Button className="btn-star"><FaStar/></Button>
							<Button className="btn-fullscreen"><FaExpand/></Button>
						</div>
					</div>
					<div className="container_media-recommmendation">
						<div className="ads-section">
							<h2>Ads here</h2>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}