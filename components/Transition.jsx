import { motion } from "framer-motion";

const Transition = () => {
  const transitionVariants = {
    initial: {
      scaleX: 1,
    },
    animate: {
      scaleX: 0,
    },
    exit: {
      scaleX: 1,
    },
  };

  return (
    <>
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 left-0 w-screen h-screen z-30 bg-[#131424] origin-left"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.05, duration: 0.3, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 left-0 w-screen h-screen z-20 bg-[#F13024] origin-left"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.1, duration: 0.3, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        role="status"
        className="fixed top-0 bottom-0 left-0 w-screen h-screen z-10 bg-[#CBA135] origin-left"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.15, duration: 0.3, ease: "easeInOut" }}
        aria-hidden
      />
    </>
  );
};

export default Transition;
