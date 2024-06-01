import Header from "../components/Header.js";
import ChallengesContextProvider from "../store/challenges-context.js";
import SelectFormSubmission from "../components/Select.js";
import images from "../assets/images.js";
import PageContent from "../components/PageContent.js";
import { useState } from "react";

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
          <SelectFormSubmission />
          <ul id="challenge-type-images">
            {images.map((image) => (
              <li
                key={image.alt}
                onClick={() => handleSelectImage(image)}
                className={selectedImage === image ? "selected" : undefined}
              >
                <img {...image} alt={image.alt} />
              </li>
            ))}
          </ul>
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
