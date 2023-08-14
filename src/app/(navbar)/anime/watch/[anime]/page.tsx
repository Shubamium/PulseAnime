import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import { getAnimeDetail, getAnimeEpisode } from "@/db/AnimeData";
import Link from "next/link";

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
		<div>
			<Link href={'/'}>Home</Link>
			<h2>{animeDetail.title}</h2>
			<p>{searchParams.episode}</p>
			{episodeData && episodeData.sources[1] && episodeData.sources[3].isM3U8 &&
				(
					<div>
						<h2>Playing Video</h2>
						<VideoPlayer url={episodeData.sources[3].url}/>
					</div>
				)
			}
		</div>
	);
}