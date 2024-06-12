import PageContent from "../components/PageContent";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <PageContent title="Welcome to the world of Deutsch !">
      <h2>Ready for a challenge?</h2>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <Link id="cta-link" to="/challenges">
          Get Started
        </Link>
      </motion.div>
    </PageContent>
  );
}

export default HomePage;
