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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
