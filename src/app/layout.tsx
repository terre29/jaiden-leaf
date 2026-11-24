import { Outlet } from 'react-router'
import Header from '../components/Header'

// The frame shared by every page.
//   Phones & tablets (below 1024px): top bar on top, page content below.
//   Laptops & desktops (1024px+):    menu sidebar on the left, page content on the right.
export default function Layout() {
  return (
    // min-h-screen  -> fill at least the full window height
    // flex flex-col -> phones/tablets: stack the children vertically (top bar, then content)
    // lg:flex-row   -> from 1024px: put them side by side (sidebar, then content)
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Header />

      {/*
        flex-1   -> main takes up all the remaining space next to / below the header
        min-w-0  -> lets main shrink beside the sidebar, so wide content
                    (like a long code block) can't push the page wider than the screen
        Each page sets its own max width: 3xl for lists, 5xl for posts (room for the bookmarks)
      */}
      <main className="w-full min-w-0 flex-1 px-4 py-12">
        {/* <Outlet /> is where React Router puts the current page */}
        <Outlet />
      </main>
    </div>
  )
}
