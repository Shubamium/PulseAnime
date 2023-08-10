import { animeData } from "@/types/AnimeTypes"
import Image from "next/image"


type Props = {
	anime:animeData
}

export default function BasicAnimeDisplayer({anime}: Props) {
  return (
	<div>
		<Image src={anime.image} alt="anime-poster" width={300} height={400}/>
		<h2>{anime.title}</h2>
	</div>
  )
}