import { FaSearch } from "react-icons/fa";
import './searchBar.scss';
import Button from "../button/Button";

type searchBarProps = {
	altSearchColor?:boolean
}
export default function SearchBar(props:searchBarProps) {
	return (
		<form className={"search-bar"} action={'/anime/search'} method="GET">
			<input type="search" className={"input-search"} name="query" placeholder="Search for the title here!"  required/>
			<Button type="submit" className={'btn-search' + (props.altSearchColor ? ' alt-color' : '')}><FaSearch/></Button>
		</form>
	);
}