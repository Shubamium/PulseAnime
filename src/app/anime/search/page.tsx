import AnimeList from "@/components/animeList/AnimeList";
import { getAnimeSearch } from "@/db/AnimeData";
import Link from "next/link";

type AnimeSearchProps = {
  searchParams: {
	query:string
  }
}

export default async function AnimeSearch({searchParams}: AnimeSearchProps) {
	const query = searchParams.query;
	const searchResults = await getAnimeSearch(query);
	return (
		<div>
			<Link href={'/'}>Home</Link>
			Search Results
			<AnimeList animes={searchResults.results}/>
		</div>
	);
}

