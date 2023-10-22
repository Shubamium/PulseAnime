'use client';
import {useContext} from 'react';
import Image from "next/image";
import SearchBar from "../searchBar/SearchBar";
import './navbar.scss';
import { FaDice, FaDiceFour, FaDiceTwo, FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import Button from "../button/Button";
import Link from "next/link";
import ContentSwitch from "../contentSwitch/ContentSwitch";

import {BsDice3} from 'react-icons/bs';
import MediaSearch from "../mediaSearch/MediaSearch";
import { NavbarContext } from '@/components/context/navbarContext';
type Props = {
	resetPosition?:boolean
	hidden?:boolean
}

export default function Navbar({resetPosition,hidden}: Props) {
	const navbarContext = useContext(NavbarContext);

	return (
		<header className={`container_header ${resetPosition ? 'reset' : ''} ${(hidden !== undefined && hidden === false) || navbarContext.navbarOpen   ? 'open' : 'hidden'}`}>
			<div className="confine">
				<div className="left">
					<Link href={'/'} className="logo">
						{navbarContext.isBleeding && (
							<div className="container_logo bleed">
								<Image src={"/images/logo/logo.png"} alt="" width={320} height={120}/>
							</div>
						)} 
						<div className="container_logo">
							<Image src={"/images/logo/logo.png"} alt="" width={320} height={120}/>
						</div>
					</Link>
					<div className="socials">
						<Button className="btn-socials">
							<FaDiscord/>
						</Button>
						<Button className="btn-socials">
							<FaTwitter/>
						</Button>
						<Button className="btn-socials">
							<FaInstagram/>
						</Button>
					</div>
				</div>
				<nav className="right">
					<MediaSearch reverseOrder={true} useAltColor={true}/>
					<Button className="btn-random">
						<BsDice3/> Random
					</Button>
				</nav>
			</div>
		</header>		
	  );
}