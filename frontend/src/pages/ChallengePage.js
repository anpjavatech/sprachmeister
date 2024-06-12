import Header from "../components/Header.js";
import ChallengesContextProvider from "../store/challenges-context.js";
import images from "../assets/images.js";
import PageContent from "../components/PageContent.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" } },
};

export default function ChallengePage() {
  const navigate = useNavigate();

  function handleSelectImage(id) {
    navigate(`/${id}`);
  }
  return (
    <ChallengesContextProvider>
      <Header />
      <PageContent>
        <div>
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            id="challenge-type-images"
          >
            {images.map((image) => (
              <motion.li
                variants={itemVariants}
                key={image.alt}
                onClick={() => handleSelectImage(image.id)}
              >
                <div className="image">
                  <img className="image_img" src={image.src} alt={image.alt} />
                  <div className="image_overlay">
                    <div className="image_title">{image.alt}</div>
                    <p className="image_description">{image.desc}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </PageContent>
    </ChallengesContextProvider>
  );
}
