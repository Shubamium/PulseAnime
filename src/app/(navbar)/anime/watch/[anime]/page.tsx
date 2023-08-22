import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import { getAnimeEpisode, getAnimeMeta } from "@/db/AnimeData";
import './watchAnime.scss';
import Button from "@/components/general/button/Button";
import { FaDownload, FaExpand , FaStar } from "react-icons/fa";
import Image from "next/image";
import MediaDetail from "@/components/mediaDetail/MediaDetail";
import EpisodeList from "./episodeList/EpisodeList";
import { getTitle } from "@/db/util";
import Link from "next/link";
import EpisodeControls from "./episodeControls/EpisodeControls";
import { redirect } from "next/navigation";
import { MdStarOutline } from "react-icons/md";
import RecommendationDisplayer from "./recommendationDisplayer/RecommendationDisplayer";
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
	
	const animeDetail = await getAnimeMeta(animeId);
	if(!animeDetail.episodes){
		redirect('/anime/detail/'+animeDetail.id);
	};
	// const episodeData =  animeDetail.episodes[episodeNumber] ? await getAnimeEpisode(animeDetail.episodes[episodeNumber-1].id) : null;
	const episodeData = animeDetail.episodes.find((episode)=>episode.number == episodeNumber) ?? animeDetail.episodes[0];
	const episodeVideo = await getAnimeEpisode(episodeData.id);
	const mediaTitle = getTitle(animeDetail.title);
	return (
		<div className="container_watch-anime">
			<div className="confine">
				<section className="media-player layout">
					<div className="left">
						<div className="video">
							{episodeData && episodeVideo.sources[1] && episodeVideo.sources[3].isM3U8 &&
								(
									<VideoPlayer url={episodeVideo.sources[3].url}/>
								)
							}
						</div>
						<div className="container_media-detail">
							<div className="media-header">
								<Link href={'/anime/info/'+animeDetail.id} className="title"><h2>{mediaTitle}</h2></Link>
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
								<EpisodeControls
									route={"/anime/watch/"+animeDetail.id} 
									currentEpisode={episodeNumber} 
									episodesData={animeDetail.episodes}
									/>
								<Button className="btn-download">Download<FaDownload/></Button>
								<Button className="btn-star"><FaStar/></Button>
								<Button className="btn-fullscreen"><FaExpand/></Button>
							</div>
						</div>
					</div>
					<div className="right">
						<EpisodeList episodes={animeDetail.episodes} currentEpisode={episodeNumber} animeId={animeDetail.id}/>
					</div>
				</section>
				<section className="media-info layout">
					<div className="container_media-info">
						<div className="media-info-detailed">
							<div className="info-section">
								<Link href={'/anime/info/'+animeDetail.id} className="title">
									<h2>{mediaTitle}</h2>
								</Link>
								<div className="genre-list">
									<div className="genre">Comedy</div>
									<div className="genre">Slice Of Life</div>
									{animeDetail.genres && animeDetail.genres.map((genre:string,index:number)=>{
										return (
											<div className="genre" key={'genre-list'+index}>{genre}</div>
										);
									})}
								</div>
								<div className="info-section-media-detail">
									<MediaDetail title='Status' text={animeDetail.status} />
									<MediaDetail title='Type' text={animeDetail.type} />
									<MediaDetail title='Release Date' text={animeDetail.season + ' ' + animeDetail.releaseDate} />
								</div>
								<div className="media-detailed-section">
									<div className="description" dangerouslySetInnerHTML={{__html:animeDetail.description}}></div>
								</div>	
							</div>
							<div className="img-section">
								<Image src={animeDetail.image} alt="media-cover" width={300} height={400}/>
							</div>
						</div>
						<div className="comment-section"></div>
					</div>
					<div className="container_media-recommendation">
						<div className="ads-section">
							<h2>Ads Spaces</h2>
						</div>
						<RecommendationDisplayer recommendations={animeDetail.recommendations}/>
					</div>
				</section>
			</div>
		</div>
	);
}