<<<<<<< HEAD
import { PrimaryWine } from '../components/PrimaryWine';
import demoData from '../temp/demo.json';
=======
import { PrimaryWine } from "../components/PrimaryWine";
import demoData from "../temp/demo.json";
>>>>>>> 266fc01d92bef39b5138321c7f40fd3f9867fb03
export const VivinoApp = () => {
  const { wines } = demoData;
  return (
    <section className="main-app">
      <PrimaryWine wines={wines} />
    </section>
  );
};
