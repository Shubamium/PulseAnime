import { FaSearch } from "react-icons/fa";
import './searchBar.scss';
import Button from "../button/Button";
import Link from "next/link";

type searchBarProps = {
	altSearchColor?:boolean
	route?:string
	placeholder?:string
	rounded?:boolean
}

export default function SearchBar({altSearchColor,route,placeholder,rounded}:searchBarProps) {
	return (
		<form className={`search-bar ${rounded ? 'rounded' : '' }`} action={route} method="GET">
			<input type="search" className={"input-search"} name="query" placeholder={placeholder}  required/>
				<Button type="submit" className={'btn-search' + (altSearchColor ? ' alt-color' : '')}><FaSearch/></Button>
		</form>
	);
}