export interface Post {
  id: string
  createdAt: string
  title: string
  preview: string
  description: string
  image: string
}

export interface PostsResponse {
  data: Post[]
  total: number
  page: number
  limit: number
  totalPages: number
}