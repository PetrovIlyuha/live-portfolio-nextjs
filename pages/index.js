import BaseLayout from '../layouts/BaseLayout';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { messages } from '../variables/messages';
import { useEffect } from 'react';
import { useGetHighlights } from '../apollo/actions';
import ProjectCard from '../components/projects/ProjectCard';
import { formatDate } from '../utils/functions';
import TopicLink from '../components/forum/TopicLink';

const useGetInitialData = () => {
  const { data } = useGetHighlights({ variables: { limit: 3 } });
  const projects = (data && data.highlight.projects) || [];
  const topics = (data && data.highlight.topics) || [];
  return { projects, topics };
};

const Home = () => {
  const router = useRouter();
  const { projects, topics } = useGetInitialData();
  console.log(topics);
  const { message } = router.query;
  useEffect(() => {
    if (message) {
      toast.success(messages[message], {
        autoClose: 4000,
        hideProgressBar: true,
      });
    }
  }, []);

  return (
    <BaseLayout page="Home">
      {/* HOME PAGE STARTS */}
      <div className="container highlights_section">
        <section className="section-title">
          <div className="px-2">
            <div className="pb-4 text-white">
              <h1>Projects</h1>
            </div>
          </div>
        </section>
        <div className="pb-5">
          <div className="row">
            {projects.map(project => (
              <div className="col-md-4" key={project._id}>
                <Link href="/projects/[id]" as={`/projects/${project._id}`}>
                  <a className="card-link">
                    <div className="project_highlight">
                      <ProjectCard project={project} neomorph />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <section className="section-title">
          <div className="px-2">
            <div className="pb-4">
              <h1 className="text-white">Trending Topics</h1>
            </div>
          </div>
        </section>
        <section>
          <div className="list-group mb-5">
            {topics.map(topic => (
              <TopicLink topic={topic} key={topic._id} />
            ))}
          </div>
        </section>
        <Link href="/forum/categories/">
          <a className="stylish_btn">More Posts</a>
        </Link>
      </div>
      <ToastContainer />
    </BaseLayout>
  );
};

export default withApollo(Home, { getDataFromTree });
