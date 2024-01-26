import { Link } from "react-router-dom";

export default function SinglePost(props) {
    return(
        <Link className="hover:shadow-2xl duration-500 hover:-rotate-3" to={"/" + props.slug} key={props.slug}>
            <span
                className=" pointer-events-none overflow-hidden  block h-64 relative rounded shadow leading-snug bg-white"
                key={props.index}
            >
                <img
                className="pointer-events-none rounded-lg object-cover object-top absolute h-full w-full"
                src={props.imgUrl}
                alt=""
                />
                <span
                className="pointer-events-none block relative h-full flex justify-start items-end pr
                    -4 pb-4"
                >
                <h2
                    className="text-gray-800 text-lg font-bold px-3 py-4 bg-red-700
                    text-red-100 bg-opacity-75 rounded"
                >
                    {props.title}
                </h2>
                </span>
            </span>
        </Link>
    );
}