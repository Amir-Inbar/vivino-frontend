import { PrimaryWine } from '../components/PrimaryWine';
import demoData from '../temp/wines.json';
export const VivinoApp = () => {
  const { wines } = demoData;
  return (
    <section className="main-app">
      <PrimaryWine wines={wines} />
    </section>
  );
};
