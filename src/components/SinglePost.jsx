import { Link } from "react-router-dom";

export default function SinglePost(props) {
    return(
        <Link className="" to={"/" + props.slug} key={props.slug}>
            <span
                className="block h-64 relative rounded shadow leading-snug bg-white"
                key={props.index}
            >
                <img
                className="rounded-lg w-full h-full object-top absolute object-cover"
                src={props.imgUrl}
                alt=""
                />
                <span
                className="block relative h-full flex justify-start items-end pr
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