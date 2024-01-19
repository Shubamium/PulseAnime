import React from 'react';
import { FaSpinner, FaTruckLoading } from 'react-icons/fa';
type Props = {
	children:React.ReactNode
}

export default function loading({children}: Props) {
	return (
		<div className='container-all'>
			<div className="loader"><FaSpinner/></div>
			{children}
		</div>
	);
}