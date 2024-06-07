import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogForm from "./BlogForm";
import Blog from "./Blog";
import Togglable from "./Togglable";
import {
  getAllBlogsSorted,
  addNewBlog,
  likeBlog,
  removeBlog,
} from "../reducers/blogsReducer";
import { displayNotif } from "../reducers/notificationReducer";

const BlogsLayout = ({ user }) => {
  useEffect(() => {
    dispatch(getAllBlogsSorted());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const blogFormRef = useRef();
  useEffect(() => {
    dispatch(getAllBlogsSorted());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addBlog = (blogObject, user) => {
    dispatch(addNewBlog(blogObject, user));
    blogFormRef.current.toggleVisibility();
  };

  const addLike = (blogObject) => {
    dispatch(likeBlog(blogObject));
  };

  const deleteBlog = (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete ${blogTitle}?`)) {
      dispatch(removeBlog(blogId));
      dispatch(displayNotif(`Blog ${blogTitle} has been deleted!`));
    }
  };
  return (
    <>
      <Togglable buttonLabel="Create A Blog" ref={blogFormRef}>
        <BlogForm blogs={blogs} createBlog={addBlog} />
      </Togglable>
      <div data-testid="blogsToShow">
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </>
  );
};

export default BlogsLayout;
