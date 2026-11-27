// Site-wide settings. Change the values here and they update everywhere.
export const site = {
  name: 'Terretino', // TODO: replace with your blog name
  emoji: '🌿',
  // Short line shown under the name in the sidebar.
  tagline: "I'm Terretino, I'm a professional iOS Developer" +
    "and has been developing iOS App since 2020. This is my digital playground where I can share my thoughts", // TODO: finish this sentence
  // icon: which picture to show next to the label (see src/components/NavIcons.tsx)
  nav: [
    { label: 'Blog', to: '/blog', icon: 'blog' },
    { label: 'About Me', to: '/about', icon: 'person' },
    { label: 'Project', to: '/project', icon: 'soil' },
    { label: 'Book', to: '/book', icon: 'book' },
  ],
  author: {
    name: 'Terretino', // TODO: your name
    avatar: '🌱', // TODO: later you can swap this for a photo
    bio: "I'm a developer writing about the things I learn along the way: code, tools, and the occasional detour. This blog is my notebook in public.",
  },
  // Social links shown at the bottom of the sidebar.
  // icon:  which logo to draw (see src/components/SocialLinks.tsx)
  // color: the icon's colour. Soft tones so they stay calm on the dark background.
  social: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/your-username', // TODO: your LinkedIn URL
      icon: 'linkedin',
      color: '#6aa8e8', // soft blue
    },
    {
      label: 'GitHub',
      href: 'https://github.com/your-username', // TODO: your GitHub URL
      icon: 'github',
      color: '#b49cf0', // soft lavender
    },
    {
      label: 'Threads',
      href: 'https://www.threads.net/@your-username', // TODO: your Threads URL
      icon: 'threads',
      color: '#f2a0c4', // soft pink
    },
  ],
} as const
