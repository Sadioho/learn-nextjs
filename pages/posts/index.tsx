import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
export interface PostListPageProps {
  posts: any[];
}
const PostListPage = (props: PostListPageProps) => {
  const { posts } = props;
  console.log('🚀 ~ PostListPage ~ posts', posts);
  const query = useRouter();
  return (
    <div>
      <h1>POST LIST </h1>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

// func này được call ở server
export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server side
  // build time

  console.log('static props');
  const response = await fetch(
    'https://js-post-api.herokuapp.com/api/posts?_page=1'
  );
  const data = await response.json();
  console.log('Data', data);

  return {
    props: {
      posts: data.data.map((item: any) => ({ id: item.id, title: item.title })),
    },
  };
};
export default PostListPage;
