import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

const Loader = ({ title }: { title: string }) => {
  return (
    <motion.div
      className=" w-full flex flex-col gap-5 justify-center items-center h-[calc(100vh-75px)]"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
    >
      <Loader2 size={40} className="animate-spin" />
      <h2 className="text-lg">{title}</h2>
    </motion.div>
  );
};

export default Loader;
