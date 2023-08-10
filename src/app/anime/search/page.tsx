import AnimeList from "@/components/animeList/AnimeList"
import { backendUrl } from "@/db/util"
import Link from "next/link"

type AnimeSearchProps = {
  searchParams: {
	query:string
  }
}

async function searchAnime(query:string) {
	const result = await fetch(backendUrl + '/anime/gogoanime/' + encodeURIComponent(query));
	const res = await result.json();

	return res

}
export default async function AnimeSearch({searchParams}: AnimeSearchProps) {
	const query= searchParams.query
	const searchResults = await searchAnime(query)
	return (
		<div>
			<Link href={'/'}>Home</Link>
			Search Results
			<AnimeList animes={searchResults.results}/>
		</div>
	)
}

