import { useEffect, useState } from "react";
import styles from "../assets/style";
import Navbar from "./Navbar";
import Post from "./Post";
import { GetAllBlog } from "../Api/Services/blog";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const [blog, setBlog] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.userLogin.token);
  const navigate = useNavigate();

  const getAllBlogAPICall = async () => {
    // setLoader(true);
    const response = await GetAllBlog();
    if (response.status === 202) {
      const data = response.data;
      console.log(data.result, "blogs []");
      if (token) {
        setBlog(data.result);
      } else {
        const firstPart = data.result.slice(0, 3);
        setBlog(firstPart);
      }
      setLoader(false);
    } else {
      console.log("No blog");
    }
  };
  useEffect(() => {
    getAllBlogAPICall();
  }, []);
  return (
    <div className="w-full overflow-hidden">
      <div className={`bg-cyan-800 ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`mt-5 ${styles.flexStart}  ${styles.paddingX}`}>
        {loader && <Loader />}
        <div className={`${styles.boxWidth}`}>
          <div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blog?.length > 0 &&
              blog?.map((post) => {
                return <Post key={post._id} {...post} />;
              })}
          </div>
          {/* {token ? (
            ""
          ) : (
            <div className="my-5 flex w-full justify-center " onClick={() => navigate("/login")}>
              <Button title={"For more blogs Login"} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
