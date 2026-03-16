import { emptyCart } from '@/images'
import Image from 'next/image'
import { motion } from "motion/react";
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';


const MotionImage = motion(Image);
const EmptyCart = () => {
  return (
    <motion.div initial={{ y:100,opacity:0}} animate={{y:0,opacity:1}}  transition={{
          duration: 0.5,
          ease: "easeInOut",
        }} className='text-center flex flex-col justify-center items-center gap-5 bg-white px-5 py-10 rounded-xl'>
         <motion.div
        className="relative"
        initial={{ rotate: 0, scale: 1 }}
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 0.9, 1],   
          y: [0, -10, 0, -10, 0], 
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MotionImage
          src={emptyCart}
          width={200}
          height={200}
          alt="empty cart image"
          className="shadow-xl"
        />
        <motion.div initial={{ y:0 }}
        animate={{  
          y: [0, -20, 0, -20, 0],    
        }}  transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
         className="absolute -top-5 -right-2 z-10 bg-blue-500 rounded-full p-2">
  <ShoppingCart color="white" size={25} />
</motion.div>
      </motion.div>
        <h1 className='text-4xl font-semibold'>Your Cart is feeling lonely</h1>
        <p className='text-lg font-medium'>It looks like you haven't added anything to your cart yet. Let's change that and find some amazing products for you!</p>
        <Link href="/" className="bg-white rounded-xl p-5 w-full border-2 border-brown-100 bg-white hover:bg-black hover:text-white hoverEffect text-lg">Discover Products</Link>
    </motion.div>
  )
}

export default EmptyCart