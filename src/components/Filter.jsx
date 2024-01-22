import { useEffect, useState } from "react";
import sanityClient from "../client";
import './Filter.css';

export default function Filter(props) {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "category"]{
                _id,
                title
            }`
        ).then(data => setCategories(data)).catch(console.error);
    }, []);


    const changeCat = (e) => {
        props.setCat(e.target.id);
    }
    return(
        <>
            <h3 className="cursive text-4xl cursor-default select-none w-40 text-center duration-200 rounded">
                Categories
            </h3>
            <ul role="list" className={`px-2 py-3 font-medium text-gray-900 select-none`}>
                <button onClick={changeCat} className="focus:bg-red-700 focus:text-white hover:bg-red-700 hover:text-white w-40 text-center duration-200 rounded cursor-pointer">
                    <a id="all" className="block px-2 py-3 cursive text-2xl">
                        All
                    </a>
                </button>
                {categories && categories.map((category) => (
                    <button key={category._id}  onClick={changeCat} className="focus:bg-red-700 focus:text-white hover:bg-red-700 hover:text-white w-40 text-center duration-200 rounded cursor-pointer">
                        <a id={category._id} className="cursive block px-2 py-3 text-2xl">
                            {category.title}
                        </a>
                    </button>
                ))}
            </ul>
        </>
    );
}