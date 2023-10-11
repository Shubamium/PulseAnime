import { getTitle } from "@/db/util";
import { AnimeSearchResult } from "@/types/AnimeTypes";
import Image from "next/image";
import Link from "next/link";


type Props = {
	anime:AnimeSearchResult
}

export default function BasicAnimeDisplayer({anime}: Props) {
	return (
		<Link href={`/anime/detail/${encodeURI(anime.id)}`}>
			<Image src={anime.image} alt="anime-poster" width={300} height={400}/>
			<h2>{getTitle(anime.title)}</h2>
		</Link>
	);
}