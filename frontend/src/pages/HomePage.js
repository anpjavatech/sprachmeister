import PageContent from "../components/PageContent";
import SelectFormSubmission from "../components/Select";

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>Ready for your challenges !</p>
      <div>
        <SelectFormSubmission />
      </div>
    </PageContent>
  );
}

export default HomePage;
