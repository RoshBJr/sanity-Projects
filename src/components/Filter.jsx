import { useEffect, useRef, useState } from "react";
import {sanityClient} from "../client";
import './Filter.css';

export default function Filter(props) {
    const [categories, setCategories] = useState(null);
    const [activeCat, setActiveCat] = useState("all");
    const catRef = useRef(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "category"]| order(title){
                _id,
                title
            }`
        ).then(data => {
            setCategories(data);
            setActiveCat(data[0]._id);
        }).catch(console.error);
    }, []);


    const changeCat = (e) => {
        setActiveCat(e.target.id);
        setTimeout(()=> {
            props.setCat(e.target.id);
        }, 400);
    }
    return(
        <>
            <h3 className="cursive text-4xl cursor-default select-none w-40 text-center rounded">
                Categories
            </h3>
            <ul role="list" className={`px-2 py-3 font-medium text-gray-900 select-none flex`}>
                {categories && categories.map((category) => (
                    <span key={category._id}  ref={catRef} onClick={changeCat} className={`${category._id == activeCat ? 'active': ''} hover:bg-red-700 hover:text-white w-40 text-center duration-500 rounded cursor-pointer`}>
                        <a id={category._id} className="cursive block px-2 py-3 text-2xl">
                            {category.title}
                        </a>
                    </span>
                ))}
            </ul>
        </>
    );
}