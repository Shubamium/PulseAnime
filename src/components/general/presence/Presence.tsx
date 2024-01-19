'use client';
import { AnimatePresence } from "framer-motion";

type Props = {
	children:React.ReactNode
}

export default function Presence({children}: Props) {
	return (
		<AnimatePresence mode="wait" >
			{children}
		</AnimatePresence>
	);
}