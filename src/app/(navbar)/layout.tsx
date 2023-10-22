import NavbarContextProvider from '@/components/context/navbarContext';
import Navbar from '@/components/general/navbar/Navbar';
import React from 'react';

type Props = {
	children:React.ReactNode
}

export default function NavbarLayout({children}: Props) {
  return (
	<div>
		<NavbarContextProvider>
			<Navbar/>
			<main>
				{children}
			</main>
		</NavbarContextProvider>
	</div>
  );
}