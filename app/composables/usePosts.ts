import type { Post, PostsResponse } from '~/types/post'

const API_BASE = 'https://6082e3545dbd2c001757abf5.mockapi.io/qtim-test-work/posts'

let cachedPosts: Post[] | null = null
let pendingPromise: Promise<Post[]> | null = null

// Функция для замены домена изображения
const fixImageUrl = (url: string | undefined): string | undefined => {
  if (!url) return url

  if (!url.includes('http')) {
    return 'https://loremflickr.com/640/480/nature'
  }
  // Заменяем любой домен на loremflickr.com
  return url.replace(/^https?:\/\/[^\/]+/, 'https://loremflickr.com')
}

export const usePosts = () => {
  const loadAllPosts = async (): Promise<Post[]> => {
    if (cachedPosts) {
      return cachedPosts
    }
    
    if (pendingPromise) {
      return pendingPromise
    }
    
    pendingPromise = (async () => {
      const response = await fetch(API_BASE)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Заменяем домен для всех изображений
      const dataWithFixedImages = data.map((post: Post) => ({
        ...post,
        image: fixImageUrl(post.image)
      }))
      
      cachedPosts = dataWithFixedImages
      return dataWithFixedImages
    })()
    
    try {
      return await pendingPromise
    } finally {
      pendingPromise = null
    }
  }
  
  const fetchPosts = async (page: number = 1, limit: number = 8): Promise<PostsResponse> => {
    const allPosts = await loadAllPosts()

    const sortedPosts = [...allPosts].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    
    const total = sortedPosts.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedPosts = sortedPosts.slice(start, end)
    
    return {
      data: paginatedPosts,
      total,
      page,
      limit,
      totalPages,
    }
  }
  
  const fetchPostById = async (id: string): Promise<Post> => {
    if (cachedPosts) {
      const cached = cachedPosts.find(p => p.id === id)
      if (cached) return cached
    }
    
    const response = await fetch(`${API_BASE}/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const post = await response.json()
    
    return {
      ...post,
      image: fixImageUrl(post.image)
    }
  }
  
  return {
    fetchPosts,
    fetchPostById,
  }
}