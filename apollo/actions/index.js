import {
  GET_PROJECTS,
  UPDATE_PORTFOLIO,
  CREATE_PROJECT,
  DELETE_PROJECT,
  SIGN_IN,
  GET_USER,
  SIGN_OUT,
} from "../queries";

import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";

export const useGetProjects = () => useQuery(GET_PROJECTS);

export const useUpdateProject = () => useMutation(UPDATE_PORTFOLIO);

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
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      const newProjects = projects.filter((p) => p._id !== deleteProject);
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: newProjects },
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
