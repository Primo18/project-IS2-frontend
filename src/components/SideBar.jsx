import { useState } from 'react';
import DataSlider from './DataSlider.jsx'

export const SideBar = () => {
    const [toggle, setToggle] = useState(true);

    return (
        <div
            className={`${toggle ? "w-[4rem]" : ""} 
            sidebar-container`}
            onMouseEnter={() => setToggle(false)}
            onMouseLeave={() => setToggle(true)}
        >
            <DataSlider toggle={toggle} />

        </div>
    );
}


