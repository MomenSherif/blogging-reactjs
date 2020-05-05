const blogsReducerDefaultState = {
  pages: null,
  blogs: [],
};

const blogsReducer = (state = blogsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return {
        pages: action.pages,
        blogs: action.blogs,
      };

    default:
      return state;
  }
};

export default blogsReducer;
