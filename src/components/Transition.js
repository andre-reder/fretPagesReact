import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const animationConfiguration = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
function Transitions({ children }) {
  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

Transitions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Transitions;
