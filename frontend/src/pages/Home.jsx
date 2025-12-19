import React from "react";
import HeroSlider from "../components/HeroSlider";
import CallToAction from "../components/CallToAction";
import About from "../components/About";
import Stats from "../components/Stats";

function Home() {
    return (
        <div>
            <HeroSlider />
            <CallToAction />
            <About />
            <Stats />
        </div>
    )
}

export default Home;