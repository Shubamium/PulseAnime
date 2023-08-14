import Image from "next/image";
import SearchBar from "../searchBar/SearchBar";
import './navbar.scss';
import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
type Props = {}

export default function Navbar({ }: Props) {
	return (
		<header className="container_header">
			<div className="confine">
				<div className="left">
					<div className="logo">
						<div className="container_logo bleed">
							<Image src={"/images/logo/logo.png"} alt="" width={320} height={120}/>
						</div>
						<div className="container_logo">
							<Image src={"/images/logo/logo.png"} alt="" width={320} height={120}/>
						</div>
					</div>
					<div className="socials">
						<div className="btn-socials">
							<FaDiscord/>
						</div>
						<div className="btn-socials">
							<FaTwitter/>
						</div>
						<div className="btn-socials">
							<FaInstagram/>
						</div>
					</div>
				</div>
				<div className="right">
					<nav>
						<SearchBar altSearchColor={true}/>
					</nav>
				</div>
			</div>
		</header>
	  );
}