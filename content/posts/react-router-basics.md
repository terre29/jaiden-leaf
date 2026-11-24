---
title: "React Router Basics: Pages, Layouts and Links"
date: 2026-11-08
tags: [react, routing]
summary: How a single-page app can still have multiple pages.
---

A React app is one HTML page, yet it can feel like a whole website. That's what a router does.

## Routes

A route connects a URL to a component:

```tsx
{ path: 'blog', element: <BlogPage /> }
```

## Layouts

A layout wraps every page with shared parts like the header. The current page appears where you put `<Outlet />`.

## Links

Use `<Link to="/blog">` instead of `<a href>`. It switches pages without reloading the browser, so everything feels instant.
