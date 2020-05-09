import React, { Fragment } from 'react';

import BlogCardSkeleton from '../BlogCardSkeleton';

const BlogPageSkeleton = () => {
  return (
    <Fragment>
      {Array(7)
        .fill()
        .map((b, i) => (
          <BlogCardSkeleton key={i} />
        ))}
    </Fragment>
  );
};

export default BlogPageSkeleton;
