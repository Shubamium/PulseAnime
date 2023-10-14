import Image from 'next/image';
import React from 'react';
import { FaInbox, FaInfoCircle } from 'react-icons/fa';
import './detailSidebar.scss';

type DetailSidebarProps = {
	title:string;
	cover:string;
	children:React.ReactNode;
}

export default function DetailSidebar({title,children,cover}: DetailSidebarProps) {
	return (
		
		<aside className="detail-sidebar">
			
			<Image className='poster' src={cover} alt='media-poster' width={300} height={400}/>
			<div className="sidebar-part">

				<div className="sidebar-header">
					<h2><FaInfoCircle/> Info</h2>
				</div>
				
				<p className='media-title'>{title}</p>
				
				<div className="sidebar-content">
					{children}
				</div>

			</div>
		</aside>
		
		
	);
}