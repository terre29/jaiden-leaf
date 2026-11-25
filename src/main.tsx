import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './app/layout'
import HomePage from './app/page'
import BlogPage from './app/blog/page'
import AboutPage from './app/about/page'
import PostPage from './app/blog/post/page'
import ProjectPage from './app/project/page'

// Which URL shows which page. Every page is shown inside Layout.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <PostPage /> }, // :slug = any post name
      { path: 'about', element: <AboutPage /> },
      { path: 'project', element: <ProjectPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
