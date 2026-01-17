import Hero from "./components/Hero";
import Slider from "./components/slider";

function App() {
  return (
    // scroll-smooth class-ta smooth scrolling-er jonno help korbe
    <div className="bg-black min-h-screen scroll-smooth">
      <Hero />
      <Slider />
    </div>
  );
}

export default App;
