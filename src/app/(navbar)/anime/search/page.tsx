import AnimeList from "@/components/anime/animeList/AnimeList";
import { getAnimeSearch } from "@/db/AnimeData";
import Link from "next/link";
import './animeSearch.scss';
import ResultDisplayer from "./resultDisplayer/ResultDisplayer";
import { AnimeSearchResult } from "@/types/AnimeTypes";
import { getTitle } from "@/db/util";
import { redirect } from "next/navigation";
type AnimeSearchProps = {
  searchParams: {
	query:string
  }
}

export default async function AnimeSearch({searchParams}: AnimeSearchProps) {
	const query = searchParams.query;
	if(!query){
		redirect('/');
	}
	const {results} = await getAnimeSearch(query);
	return (
		<div className="container_search-page">
			<div className="search-results">
				<div className="confine">
					<div className="container_list">
						{results && results.map((result:AnimeSearchResult)=>{
							const title = getTitle(result.title);
							return (
								<ResultDisplayer cover={result.image} to={`/anime/detail/${result.id}`} title={title} key={result.id}/>
							);
						})}
					</div>
					<div className="container_sidebar">
						<aside className="sidebar">
							<div className="sidebar-header">
								<h2 className="header-title">Category</h2>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</div>
	);
}

