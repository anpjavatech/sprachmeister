import PageContent from "../components/PageContent";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <PageContent title="Welcome to the world of Deutsch !">
      <h2>Ready for a challenge?</h2>
      <Link id="cta-link" to="/challenges">
        Get Started
      </Link>
    </PageContent>
  );
}

export default HomePage;
