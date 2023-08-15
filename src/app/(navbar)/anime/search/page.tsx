import AnimeList from "@/components/animeList/AnimeList";
import { getAnimeSearch } from "@/db/AnimeData";
import Link from "next/link";
import './animeSearch.scss';
import ResultDisplayer from "./resultDisplayer/ResultDisplayer";
import { AnimeData } from "@/types/AnimeTypes";
type AnimeSearchProps = {
  searchParams: {
	query:string
  }
}

export default async function AnimeSearch({searchParams}: AnimeSearchProps) {
	const query = searchParams.query;
	const {results} = await getAnimeSearch(query);
	return (
		<div className="container_search-page">
			<div className="search-results">
				<div className="confine">
					<div className="container_list">
						{results && results.map((result:any)=>{
							return (
								<ResultDisplayer cover={result.image} to={`/anime/detail/${result.id}`} title={result.title} key={result.id}/>
							);
						})}
					</div>
					<div className="sidebar">
						<h2>Category</h2>
					</div>
				</div>
			</div>
		</div>
	);
}

