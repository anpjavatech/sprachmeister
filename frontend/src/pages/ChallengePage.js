import Header from "../components/Header.js";
import ChallengesContextProvider from "../store/challenges-context.js";
import images from "../assets/images.js";
import PageContent from "../components/PageContent.js";
import { useState } from "react";
import { motion } from "framer-motion";

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
  const [selectedImage, setSelectedImage] = useState(null);
  function handleSelectImage(image) {
    setSelectedImage(image);
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
                onClick={() => handleSelectImage(image)}
                className={selectedImage === image ? "selected" : undefined}
              >
                <div className="image">
                  <img className="image_img" {...image} alt={image.alt} />
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

/* <PageContent title="Deutsch Sprachen Challenge!">
  <img src={quizLogo} alt="Quiz Logo" />
  <p>Ready for your challenges !</p>
  <div>
    <SelectFormSubmission />
  </div>
</PageContent>; */
