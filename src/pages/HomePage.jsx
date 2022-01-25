import { PrimaryWine } from "../components/PrimaryWine";
import demoData from "../temp/demo.json";
export const HomePage = () => {
  const { wines } = demoData;
  return (
    <section className="main-app">
      <PrimaryWine wines={wines} />
    </section>
  );
};
