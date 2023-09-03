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
import Dropdown from "@/components/general/dropdown/Dropdown";
import AnimeWatchProvider from "./AnimeWatchProvider";
import MediaAction from "./mediaAction/MediaAction";
import AnimeVideo from "./animeVideo/AnimeVideo";
import { AnimeProvider } from "@/types/AnimeEnums";
type Props = {
	searchParams:{
		episode:string;
		anime:string;
		provider:string;
	},
	params:{
		anime:string;
	}
	
}

export default async function AnimeWatch({searchParams,params}: Props) {
	const animeId = params.anime;
	const episodeNumber = parseInt(searchParams.episode ?? 1);
	const provider:AnimeProvider = AnimeProvider[searchParams.provider] ?? AnimeProvider.GOGOANIME;
	const animeDetail = await getAnimeMeta(animeId,provider);

	if(!animeDetail){
		redirect('/');
	}

	// If the anime doesn't have any episodes go back
	// if(!animeDetail.episodes){
	// 	redirect('/anime/detail/'+animeDetail.id);
	// };
	
	// const episodeData = animeDetail.episodes.find((episode)=>episode.number == episodeNumber) ?? animeDetail.episodes[0];
	const mediaTitle = getTitle(animeDetail.title);
	// console.log(episodeData);
	// const episodeData =  animeDetail.episodes[episodeNumber] ? await getAnimeEpisode(animeDetail.episodes[episodeNumber-1].id) : null;
	// const episodeVideo = await getAnimeEpisode(episodeData.id);
	// console.log(episodeVideo);
	return (
		<AnimeWatchProvider>
			<div className="container_watch-anime">
			<div className="confine">
				<section className="media-player layout">
					<div className="left">
						<AnimeVideo episode={episodeNumber} provider={provider} episodeList={animeDetail.episodes}/>
						<div className="container_media-detail">
							<div className="media-header">
								<Link href={'/anime/info/'+animeDetail.id} className="title"><h2>{mediaTitle}</h2></Link>
								<p className="episode-number">Episode {episodeNumber}</p>
							</div>
							<MediaAction episodeList={animeDetail.episodes} provider={provider} animeId={animeDetail.id} currentEpisode={episodeNumber}></MediaAction>
						</div>
					</div>
					<div className="right">
						<EpisodeList episodes={animeDetail.episodes} currentEpisode={episodeNumber} animeId={animeDetail.id} provider={provider}/>
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
		</AnimeWatchProvider>
	);
}