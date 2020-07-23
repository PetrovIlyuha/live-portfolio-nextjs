import React, { useState } from 'react';
import BaseLayout from '../../../layouts/BaseLayout';
import {
  useGetTopicsByCategory,
  useGetUser,
  useCreateTopic,
} from '@/apollo/actions/index';
import { useRouter } from 'next/router';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import Replier from '../../../components/shared/Replier';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: topicsData } = useGetTopicsByCategory({
    variables: { category: slug },
  });
  const { data: userData } = useGetUser();
  const topicsByCategory = (topicsData && topicsData.topicsByCategory) || [];
  const user = (userData && userData.user) || null;
  return {
    topicsByCategory,
    user,
    slug,
    router,
  };
};

const Topics = () => {
  const [isReplierOpen, setReplierOpen] = useState(false);
  const { topicsByCategory, user, slug, router } = useInitialData();
  const [createTopic] = useCreateTopic();
  const handleTopicCreationForm = topicData => {
    topicData.forumCategory = slug;
    createTopic({ variables: topicData }).then(() => {
      setReplierOpen(false);
    });
  };

  const viewTopic = slug =>
    router.push('/forum/topics/[slug]', `/forum/topics/${slug}`);

  const rowColor = index => index % 2 !== 0;

  return (
    <BaseLayout>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Choose topic of discussion</h1>
              {user && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setReplierOpen(true)}
                >
                  Create Topic
                </button>
              )}
            </div>
          </div>
        </section>
        <section className="fj-topic-list">
          <table className="table table-hover ">
            <thead>
              <tr
                style={{
                  background: '#0A2472',
                  color: 'white',
                  fontSize: '2rem',
                }}
              >
                <th scope="col" style={{ fontSize: '1.3rem' }}>
                  Topic
                </th>
                <th scope="col" style={{ fontSize: '1.3rem' }}>
                  Category
                </th>
                <th scope="col" style={{ fontSize: '1.3rem' }}>
                  Author
                </th>
              </tr>
            </thead>
            <tbody>
              {topicsByCategory.map((topic, index) => (
                <tr
                  key={topic._id}
                  onClick={() => viewTopic(topic.slug)}
                  style={{
                    background: `${rowColor(index) ? '#45e5e1' : 'white'}`,
                  }}
                >
                  <th>{topic.title}</th>
                  <td className="category">{topic.forumCategory.title}</td>
                  <td>
                    <img
                      src={topic.user.avatar}
                      style={{
                        borderRadius: '50%',
                        width: '28px',
                        marginRight: '10px',
                      }}
                      alt="user avatar"
                    />
                    {topic.user.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Replier
          onSubmit={handleTopicCreationForm}
          isOpen={isReplierOpen}
          onClose={() => setReplierOpen(false)}
        />
      </div>
    </BaseLayout>
  );
};

export default withApollo(Topics, { getDataFromTree });
