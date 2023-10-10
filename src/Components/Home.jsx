import { useEffect, useState } from "react";
import styles from "../assets/style";
import Navbar from "./Navbar";
import Post from "./Post";
import { GetAllBlog, convertCsvToJSON } from "../Api/Services/blog";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const [blog, setBlog] = useState([]);
  const [loader, setLoader] = useState(false);
  const [csvUploader, setCsvUploader] = useState(false);
  const [file, setFile] = useState(null);
  const token = useSelector((state) => state.userLogin.token);
  const navigate = useNavigate();

  function handleCsvDownload() {
    setCsvUploader(true);
  }

  async function uploadCSV(){
    try {
        const formData = new FormData();
        formData.append("csvFile", file);
        const response = await convertCsvToJSON(formData,token);
        const jsonDataString = JSON.stringify(response.data);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([jsonDataString], { type: 'application/json' }));
        link.setAttribute("download", "data.json");
        document.body.appendChild(link);
        link.click(); 
        setCsvUploader(false);
    } catch (error) {
        console.log(error.message)
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getAllBlogAPICall = async () => {
    setLoader(true);
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
      <div className="m-5 flex w-full items-end" onClick={() => navigate("/")}>
        <Button onClick={csvUploader? uploadCSV:handleCsvDownload} title={csvUploader?"Download as JSON":"Convert CSV to JSON"} />
      </div>
      {csvUploader && (
        <div >
          <input
            className="block p-2 md:w-80 m-5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={handleFileChange}
          ></input>
        </div>
      )}
      <div className={`mt-5 ${styles.flexStart}  ${styles.paddingX}`}>
        {loader && <Loader />}
        <div className={`${styles.boxWidth}`}>
          <div className="mx-auto mt-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {blog?.length > 0 &&
              blog?.map((post) => {
                return <Post key={post._id} {...post} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
