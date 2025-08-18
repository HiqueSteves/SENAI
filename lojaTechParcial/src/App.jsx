import "./styles/global.css";

import NavBar from "./components/NavBar/NavBar";
import Card from "./components/Card/Card"

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <h2 className="section-title">Destaques</h2>
        <section className="grid">
          <Card />

        </section>
      </main>
    </>
  );
}
