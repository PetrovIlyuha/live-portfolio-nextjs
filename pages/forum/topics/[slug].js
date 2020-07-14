import { useState } from 'react';
import BaseLayout from '../../../layouts/BaseLayout';
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
} from '../../../apollo/actions';
import withApollo from '@/hoc/withApollo';
import { useRouter } from 'next/router';
import { getDataFromTree } from '@apollo/react-ssr';
import PostItem from '../../../components/forum/PostItem';
import Replier from '../../../components/shared/Replier';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useGetTopicBySlug({ variables: { slug } });
  const { data: userData } = useGetUser();
  const { data: postsByTopicData } = useGetPostsByTopic({
    variables: { slug },
  });
  const topic = (data && data.topicBySlug) || {};
  const posts = (postsByTopicData && postsByTopicData.postsByTopic) || [];
  const user = (userData && userData.user) || null;
  return { topic, posts, user };
};

const PostPage = () => {
  const { topic, posts, user } = useInitialData();
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
        <Posts topic={topic} posts={posts} user={user} />
      </div>
    </BaseLayout>
  );
};

const Posts = ({ topic, posts, user }) => {
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  return (
    <section style={{ marginBottom: '100px' }}>
      <div className="fj-post-list">
        {topic._id && <PostItem post={topic} className="topic-post-lead" />}
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
          </div>
        </div>
      </div>
      <Replier
        onSubmit={() => {}}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        isOpen={isReplierOpen}
        onClose={() => setReplierOpen(false)}
      />
    </section>
  );
};

export default withApollo(PostPage, { getDataFromTree });