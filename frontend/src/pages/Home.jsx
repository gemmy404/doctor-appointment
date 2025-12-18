import React from "react";
import HeroSlider from "../components/HeroSlider";
import CallToAction from "../components/CallToAction";
import About from "../components/About";

function Home() {
    return (
        <div>
            <HeroSlider/>
            <CallToAction/>
            <About/>
        </div>
    )
}

export default Home;