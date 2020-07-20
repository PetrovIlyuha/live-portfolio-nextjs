import { useState, useRef } from 'react';
import BaseLayout from '../../../layouts/BaseLayout';
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
  useCreatePost,
} from '../../../apollo/actions';
import withApollo from '@/hoc/withApollo';
import { useRouter } from 'next/router';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '../../../components/forum/PostItem';
import Replier from '../../../components/shared/Replier';
import { toast } from 'react-toastify';
import AppPagination from '../../../components/shared/Pagination';

const useInitialData = (slug, pagination) => {
  const { data } = useGetTopicBySlug({ variables: { slug } });
  const { data: userData } = useGetUser();
  const { data: postsByTopicData, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination },
    pollInterval: 10000,
  });
  const topic = (data && data.topicBySlug) || {};
  const postsData = (postsByTopicData && postsByTopicData.postsByTopic) || {
    posts: [],
    count: 0,
  };
  const user = (userData && userData.user) || null;
  return { topic, ...postsData, user, fetchMore };
};

const PostPage = () => {
  const router = useRouter();
  const { slug, pageNum = 1, pageSize = 5 } = router.query;
  const [pagination, setPagination] = useState({
    pageNum: parseInt(pageNum, 10),
    pageSize: parseInt(pageSize, 10),
  });
  const { topic, posts, ...rest } = useInitialData(slug, pagination);
  return (
    <BaseLayout>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1 className="ml-5">{topic.title}</h1>
            </div>
          </div>
        </section>
        <Posts
          {...pagination}
          topic={topic}
          posts={posts}
          {...rest}
          onPageChange={(pageNum, pageSize) => {
            router.replace(
              '/forum/topics/[slug]',
              `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
              { shallow: true }
            );
            setPagination({ pageNum, pageSize });
          }}
        />
      </div>
    </BaseLayout>
  );
};

const Posts = ({
  topic,
  posts,
  user,
  fetchMore,
  onPageChange,
  ...pagination
}) => {
  const pageEnd = useRef();
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [createPost, { error }] = useCreatePost();
  const { pageSize, count, pageNum } = pagination;

  const handleCreatePost = async reply => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }
    reply.topic = topic._id;
    await createPost({ variables: reply });
    let lastPage = Math.ceil(count / pageSize);
    if (count === 0) {
      lastPage = 1;
    }
    lastPage === pageNum &&
      fetchMore({
        variables: { pageSize, pageNum: lastPage },
        updateQuery: (prevResults, { fetchMoreResult }) => {
          return {
            ...prevResults,
            postsByTopic: { ...fetchMoreResult.postsByTopic },
          };
        },
      });
    cleanAfterCreation();
    scrollToBottom();
  };

  const cleanAfterCreation = () => {
    setReplierOpen(false);
    toast.success('Post has been created! 🎉');
  };

  const scrollToBottom = () => {
    pageEnd.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section style={{ marginBottom: '100px' }}>
      <div className="fj-post-list">
        {topic._id && pageNum === 1 && (
          <PostItem post={topic} className="topic-post-lead" />
        )}
        <div className="row" style={{ marginLeft: '100px' }}>
          <div className="col-md-9">
            {posts.map(post => (
              <PostItem
                post={post}
                canCreate={user !== null}
                key={post._id}
                onReply={reply => {
                  setReplyTo(reply);
                  setReplierOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="py-2">
                <button
                  className="btn btn-lg btn-outline-primary"
                  onClick={() => {
                    setReplyTo(null);
                    setReplierOpen(true);
                  }}
                >
                  Create New Post
                </button>
              </div>
            )}
            <div className="pagination-container ml-auto">
              <AppPagination {...pagination} onPageChange={onPageChange} />
            </div>
          </div>
        </div>
      </div>
      <div ref={pageEnd}></div>
      <Replier
        onSubmit={handleCreatePost}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        isOpen={isReplierOpen}
        onClose={() => setReplierOpen(false)}
      />
    </section>
  );
};

export default withApollo(PostPage, { getDataFromTree });
