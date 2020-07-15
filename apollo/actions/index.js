import {
  GET_PROJECTS,
  UPDATE_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_USER_PROJECTS,
  SIGN_IN,
  GET_USER,
  SIGN_OUT,
  GET_PROJECT_BY_ID,
  FORUM_CATEGORIES,
  TOPICS_BY_CATEGORY,
  CREATE_TOPIC,
  TOPIC_BY_SLUG,
  POSTS_BY_TOPIC,
  CREATE_POST,
} from '../queries';

import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';

export const useGetProjects = () => useQuery(GET_PROJECTS);
export const useGetProject = options => useQuery(GET_PROJECT_BY_ID, options);
export const useGetUserProjects = () => useQuery(GET_USER_PROJECTS);
export const useUpdateProject = () => useMutation(UPDATE_PROJECT);

export const useCreateProject = () =>
  useMutation(CREATE_PROJECT, {
    update(cache, { data: { createProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, createProject] },
      });
    },
  });

export const useDeleteProject = () =>
  useMutation(DELETE_PROJECT, {
    update(cache, { data: { deleteProject } }) {
      const { userProjects } = cache.readQuery({ query: GET_USER_PROJECTS });
      const newProjects = userProjects.filter(p => p._id !== deleteProject);
      cache.writeQuery({
        query: GET_USER_PROJECTS,
        data: { userProjects: newProjects },
      });
    },
  });

// Auth actions start ------***-------
export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn: signedInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signedInUser },
      });
    },
  });
export const useSignOut = () => useMutation(SIGN_OUT);
export const useLazyGetUser = () => useLazyQuery(GET_USER);
export const useGetUser = () => useQuery(GET_USER);
// Auth actions end ------***-------

// Forum Actions start  ----
export const useGetForumCategories = () => useQuery(FORUM_CATEGORIES);
export const useGetTopicsByCategory = options =>
  useQuery(TOPICS_BY_CATEGORY, options);

export const useGetTopicBySlug = options => useQuery(TOPIC_BY_SLUG, options);

export const useCreateTopic = () =>
  useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic } }) {
      try {
        const { topicsByCategory } = cache.readQuery({
          query: TOPICS_BY_CATEGORY,
          variables: { category: createTopic.forumCategory.slug },
        });
        cache.writeQuery({
          query: TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [...topicsByCategory, createTopic] },
          variables: { category: createTopic.forumCategory.slug },
        });
      } catch (e) {
        throw new Error(e);
      }
    },
  });

export const useGetPostsByTopic = options => useQuery(POSTS_BY_TOPIC, options);
export const useCreatePost = () => useMutation(CREATE_POST);
// Forum Actions end  ----
