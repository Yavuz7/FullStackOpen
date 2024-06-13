import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addLike(state, action) {
      const changedBlog = action.payload;
      const updatedState = state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog
      );
      return updatedState;
    },
    deleteBlog(state, action) {
      return state.filter((blog) => {
        return blog.id !== action.payload;
      });
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setAllBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { addLike, appendBlog, setAllBlogs, deleteBlog } =
  blogsReducer.actions;

const compareLikes = (blogA, blogB) => {
  if (blogA.likes < blogB.likes) {
    return 1;
  } else if (blogA.likes > blogB.likes) {
    return -1;
  } else {
    return 0;
  }
};

export const getAllBlogsSorted = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setAllBlogs(blogs.sort(compareLikes)));
  };
};

export const addNewBlog = (content, user) => {
  return async (dispatch) => {
    let blog = await blogService.create(content);
    blog.user = user;
    dispatch(appendBlog(blog));
  };
};

export const likeBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.sendLike(content);
    dispatch(addLike(blog));
    dispatch(getAllBlogsSorted());
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogId);
    dispatch(deleteBlog(blogId));
    dispatch(getAllBlogsSorted());
  };
};

export const addNewComment = (blogId, content) => {
  return async (dispatch) => {
    await blogService.createComment(blogId, content);
    dispatch(getAllBlogsSorted());
  };
};

export default blogsReducer.reducer;
