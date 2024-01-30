import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SinglePost(props) {

    const scrollTop = () => {
        let scrlIterator = 0;
        let intId = setInterval(() => {
          if(window.scrollY == 0) return window.clearInterval(intId)
          scrlIterator++;
          window.scrollBy(0, -scrlIterator)
        }, 5)
      }

    return(
        <motion.div onClick={scrollTop} className="hover:shadow-2xl duration-100" whileHover={{rotate: -3}}>
        <Link className="" to={"/" + props.slug} key={props.slug}>
            <span
                className="rounded-xl overflow-hidden  block h-64 relative shadow leading-snug bg-white"
                key={props.index}
            >
            <motion.img
            whileHover={{scale: 1.1}}
                className=" duration-300 object-cover object-top absolute h-full w-full"
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
        </motion.div>
    );
}