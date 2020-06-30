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
