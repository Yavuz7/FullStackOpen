const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumLikes = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length == 1 ? blogs[0].likes : blogs.reduce(sumLikes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = (previous, next) => {
    return previous.likes >= next.likes ? previous : next;
  };

  return blogs.reduce(mostLikes, { likes: 0 });
};

const mostBlogs = (blogs) => {
  let highest = { author: "none", blogs: 0 };
  const authors = [];
  blogs.map((blog) => {
    const currentAuthor = authors.find((author) => author.name === blog.author);
    if (currentAuthor) {
      currentAuthor.blogs += 1;
      if (currentAuthor.blogs > highest.blogs) {
        highest = currentAuthor;
      }
    } else {
      authors.push({ author: blog.author, blogs: 1 });
      if (highest.blogs == 0) {
        highest = { author: blog.author, blogs: 1 };
      }
    }
  });
  return blogs.length == 1 ? { author: blogs[0].author, blogs: 1 } : authors;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
