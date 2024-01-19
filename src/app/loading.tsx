'use client';
import React from 'react';
import { FaSpinner } from 'react-icons/fa';
// import './loading.scss';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion';;

type Props = {}
export default function RootLoading({}: Props) {
  return (
		<motion.div className='loading-bar' initial={{opacity:0}} animate={{opacity:0.5}} transition={{duration:5}} exit={{opacity:0}} key={'loading-screen'}>
				{/* <FaSpinner/> */}
		</motion.div>
  );
}