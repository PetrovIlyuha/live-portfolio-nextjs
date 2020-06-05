import {
  GET_PROJECTS,
  UPDATE_PORTFOLIO,
  CREATE_PROJECT,
  DELETE_PROJECT,
} from "../queries";

import { useQuery, useMutation } from "@apollo/react-hooks";

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
