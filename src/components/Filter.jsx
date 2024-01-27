import { useEffect, useRef, useState } from "react";
import {sanityClient} from "../client";
import './Filter.css';

export default function Filter(props) {
    const [categories, setCategories] = useState(null);
    const [activeCat, setActiveCat] = useState("All");
    const catRef = useRef(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "category"]| order(title){
                _id,
                title
            }`
        ).then(data => {
            setCategories(data);
        }).catch(console.error);
    }, []);


    const changeCat = (e) => {
        if(e.target.id == activeCat) return;
        setActiveCat(e.target.id);
        props.setDisplayPosts([]);

        if(e.target.id == "All") {
            return (
                setTimeout(() => {
                    props.setDisplayPosts(props.allPostsData);
                }, 300)
            );
        }

        const filteredData = props.allPostsData.filter(
            post => post.categories.includes(e.target.id)
        );
        setTimeout(()=> {
            props.setDisplayPosts(filteredData);
        }, 300);
    }
    return(
        <>
            <h3 className="cursive text-4xl cursor-default select-none w-40 text-center rounded">
                Categories
            </h3>
            <ul role="list" className={`px-2 py-3 font-medium text-gray-900 select-none flex`}>
                {categories && categories.map((category) => (
                    <span key={category._id}  ref={catRef} onClick={changeCat} className={`${category.title == activeCat ? 'active': ''} hover:bg-red-700 hover:text-white w-40 text-center duration-500 rounded cursor-pointer`}>
                        <a id={category.title} className="cursive block px-2 py-3 text-2xl">
                            {category.title}
                        </a>
                    </span>
                ))}
            </ul>
        </>
    );
}