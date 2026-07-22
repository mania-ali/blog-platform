import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPublishedPosts, getPostById, getPostsByUser, createPostForUser,updatePost,deletePost } from "../api/postApi";

export function usePublishedPosts(page, limit) {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPublishedPosts(page, limit),
    keepPreviousData: true,
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });
}

export function useUserPosts(userId) {
  return useQuery({
    queryKey: ["myPosts", userId],
    queryFn: () => getPostsByUser(userId),
    enabled: !!userId,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData) => createPostForUser(postData),
    onSuccess: () => {
      // refetch dashboard's post list so the new post shows up immediately
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
  });
}
export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, postData }) => updatePost(id, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
  });
}