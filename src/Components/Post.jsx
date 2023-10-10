import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const truncate = (string, n) => {
  return string?.length > n ? string.substr(0, n - 1) + "..." : string;
};

const Post = ({ createdAt, title, summary, author, _id }) => (
  <>
    <div className="post m-3 w-auto">
      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2 className="mx-3 font-[500] text-[2rem]">{truncate(title, 25)}</h2>
        </Link>
        <p className="mx-3 leading-7">{summary}</p>
        <p className="mx-3 mt-4 info text-gray-400 font-medium flex gap-3">
          <time>{formatISO9075(new Date(createdAt))}</time>
          <a className="mx-3 text-neutral-600" href="">
            {author?.name}
          </a>
        </p>
      </div>
      <br />
    </div>
  </>
);

export default Post;
