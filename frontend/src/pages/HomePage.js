import PageContent from "../components/PageContent";
import sprachmeisterPic from "../assets/sprachmeister.png";

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>Browse all our amazing events!</p>
      <img src={sprachmeisterPic} alt="Sprachmeister Home Page Pic" />
    </PageContent>
  );
}

export default HomePage;
