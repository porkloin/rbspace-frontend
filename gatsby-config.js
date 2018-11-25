module.exports = {
  siteMetadata: {
    title: 'Ryan Bateman',
    tagline: 'Full Stack Web Developer',
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Blog',
        link: '/blog',
      },
      {
        name: 'Guestbook',
        link: '/guestbook',
      }
    ]
  },
  plugins: [
    `gatsby-plugin-favicon`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://live-rbspace-backend.pantheonsite.io/`,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Ryan Bateman',
        short_name: 'Ryan Bateman',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
