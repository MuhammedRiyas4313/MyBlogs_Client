import React, { useState } from "react";
import Navbar from "./Navbar";
import styles from "../assets/style";
import Editor from "./Editor";
import { message } from "antd";
import { BlogCreate } from "../Api/Services/blog";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const token = useSelector((state) => state.userLogin.token);

    const handlePost = async (e) => {
        e.preventDefault();
        if (title === "" || summary === "" || content === "") {
            message.success("All fields are required.");
            return;
        }
        const response = await BlogCreate({ title: title, summary: summary, content: content }, token);
        if (response.status === 201) {
            message.success("blog posted");
            navigate("/");
        } else {
            message.warning("something went wrong");
            setContent("");
            setFiles("");
            setSummary("");
            setTitle("");
        }
    };

    return (
        <div className="w-full overflow-hidden">
            <div className={`bg-cyan-800 ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center sm:px-16 px-6 py-10 my-auto h-fit">
                <h1 className="text-center font-poppins text-black font-semibold xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full">
                    Create Post
                </h1>
                <form onSubmit={handlePost} className="max-w-[900px] mx-auto">
                    <input
                        type="title"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                    />
                    <input
                        type="text"
                        value={summary}
                        placeholder="Summary"
                        onChange={(e) => setSummary(e.target.value)}
                        className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                    />

                    <Editor value={content} onChange={setContent} />

                    <Button title={"Submit"} />
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
