import React from "react";
import HeroSlider from "../components/HeroSlider";
import CallToAction from "../components/CallToAction";
import About from "../components/About";
import Stats from "../components/Stats";
import Departments from "../components/Departments";

function Home() {
    return (
        <div>
            <HeroSlider />
            <CallToAction />
            <About />
            <Stats />
            <Departments/>
        </div>
    )
}

export default Home;