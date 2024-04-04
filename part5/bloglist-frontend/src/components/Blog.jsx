import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const details = (
    <div>
      {blog.url}
      <div>
        {blog.likes}
        <button>Like this post!</button>
      </div>{" "}
      {blog.author}
    </div>
  );
  return (
    <div>
      {blog.title}
      <button onClick={() => setVisible(!visible)}>
        {!visible ? <div>View</div> : <div>close</div>}
      </button>
      {visible && details}{" "}
    </div>
  );
};

export default Blog;
