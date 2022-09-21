import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/font-awesome-4.7.0/css/font-awesome.css";
import "../css/blog.css";
import { setBlogModal } from "../../utilities/setBlogModal";
import BlogModal from "./BlogModal";
import Reaction from "./Reaction";
// import { Routes, Route, Link } from "react-router-dom";

const Blog = ({
  blog,
  index,
  deleteBlog,
  editBlog,
  blogToEditID,
  setUserData,
}) => {
  const { id, author, description, title, date } = blog;
  const { likes, comments, shares } = blog.reactions;
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);
  return (
    <>
      <article
        className="container bg-light py-2 col mb-3"
        onClick={(e) =>
          !e.target.classList.contains("btn" || "fa")
            ? setBlogModal(
                id,
                setSelectedBlog,
                blogToEditID,
                editBlog,
                setError
              )
            : null
        }
      >
        <button
          className="delete btn btn-outline-danger"
          onClick={() => deleteBlog(id, setError)}
        >
          <i className="fa fa-trash"></i>
        </button>
        <button
          className="edit btn btn-outline-primary"
          onClick={() => {
            editBlog(id);
            setBlogModal(id, setSelectedBlog, blogToEditID, editBlog, setError);
            console.log(blogToEditID);
          }}
        >
          <i className="fa fa-edit"></i>
        </button>
        <div className="container-fluid border-bottom pb-2">
          <h3>
            {index + 1}: {title}...
          </h3>
        </div>
        <div className="w-sm-50 w-75 ml-3 font-italic mt-2">
          <p>
            {description.slice(0, Math.round(description.length / 3))}...{" "}
            <span className="text-info">Read More</span>
          </p>
        </div>
        <div className="container-fluid">
          <h6 className="font-weight-lighter">
            Published by {author} on {date}
          </h6>
        </div>
        <div className="reactions container-fluid d-flex justify-content-center  mt-4">
          <div className="w-75 row justify-content-center w-sm-100">
            <Reaction
              reaction="likes"
              reactionData={likes}
              blog={blog}
              setUserData={setUserData}
            />
            <Reaction
              reaction="comments"
              reactionData={comments}
              blog={blog}
              setUserData={setUserData}
            />
            <Reaction
              reaction="shares"
              reactionData={shares}
              blog={blog}
              setUserData={setUserData}
            />
          </div>
        </div>
      </article>
      {(selectedBlog || error) && (
        <BlogModal
          className="modal pb-2 d-flex flex-column"
          blog={selectedBlog}
          setSelectedBlog={setSelectedBlog}
          error={error}
          editBlog={editBlog}
          setError={setError}
          blogToEditID={blogToEditID}
        />
      )}
    </>
  );
};

export default Blog;
