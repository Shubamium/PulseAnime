import Navbar from '@/components/general/navbar/Navbar';
import React from 'react';

type Props = {
	children:React.ReactNode
}

export default function NavbarLayout({children}: Props) {
  return (
	<div>
		<Navbar/>
		<main>
			{children}
		</main>
	</div>
  );
}