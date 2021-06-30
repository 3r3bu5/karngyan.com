// Upload files in static/ So any file static/file.pdf -> /file.pdf is accessible at root

export default {
  name: 'Ashraf Gehad Yehia',
  domain: 'a4rafgehad.ninja', // add without https:// , used in meta tags and share urls
  image: '/images/portfolio.png',
  email: 'deva4rf@gmail.com',
  googleAnalyticsV4: {
    enabled: true,
    id: '277541528'
  },
  plausibleAnalytics: {
    enabled: true,
    domain: 'a4rafgehad.ninja',
    trackLocalhost: false,
    // leave it empty if plausible is not self hosted
    apiHost: 'https://analytics.lookatx.dev' // default: https://plausible.io
  },
  // enable if you want comments and likes on posts
  // see how it looks on karngyan.com
  firebase: {
    enabled: false
  },
  social: {
    github: '3r3bu5',
    linkedin: 'ashraf-gehad-742399196',
    facebook: 'ashraf.gehad.140',
    twitter: 'Er3bu5_',
    codestats: 'a4hgehad' // https://codestats.net make a profile if you dont already have one.
  },
  buyMeACoffee: {
    enabled: false,
    url: ''
  },
  projects: {
    enabled: true,
  },
  blog: {
    enabled: true,
  },
  resume: {
    enabled: true,
    pdfUrl: '/Ashraf-Gehad-Software-Developer.pdf' // add files in static folder
  },
  uses: {
    enabled: false,
    meta: [
      { title: 'OS', value: 'macOS Catalina' },
      { title: 'Memory', value: '16 GB 2667 MHz DDR4' },
      { title: 'Keyboard', value: 'Keychron K2 - Gateron Brown Keys' },
      { title: 'Mouse', value: 'Logitech Silent Pebble' },
      { title: 'Monitor', value: 'LG QHD (2560 x 1440) 27 Inch IPS Display' },
      { title: 'Laptop • Processor • Graphics', value: 'MacBook Pro (16-inch, 2019) • 2.6 GHz 6-Core Intel Core i7 • AMD Radeon Pro 5300M 4 GB + Intel UHD Graphics 630 1536 MB' }
    ]
  },
  workedAt: {
    // add logos in static and at max add 3/4
    enabled: false,
    meta: [
      { name: 'SendPost', src: '/images/sendpost.png', url: 'https://sendpost.io' },
      { name: 'Amazon', src: '/images/amazon.png', url: 'https://amazon.in' },
      { name: 'InterviewReady', src: '/images/interviewready-io.png', url: 'https://get.interviewready.io' },
      { name: 'CrioDo', src: '/images/crio.png', url: 'https://crio.do' },
    ]
  },
  loadingIndicator: {
    name: 'pulse'
    // https://tobiasahlin.com/spinkit/
    // circle
    // cube-grid
    // fading-circle
    // folding-cube
    // chasing-dots
    // nuxt
    // pulse
    // rectangle-bounce
    // rotating-plane
    // three-bounce
    // wandering-cubes
  },
  strings: {
    en_US: {
      download: 'download',
      nav: {
        home: 'Home',
        blog: 'Blog',
        projects: 'Projects',
        uses: 'uses',
        resume: 'Résumé',
        buyMeACoffee: 'buy me a coffee',
        signIn: 'sign in',
        signOut: 'sign out'
      },
      hero: {
        iBlogTech: 'I learn things and explain them',
        haveALook: 'Have a look',
        friendlyNeighborhood: 'Your curious',
        description: 'I am a Software Engineer and a Cyber Security Enthusiast. I blog tech, and tinker with side projects every now n then.',
        words: ['Developer', 'Designer', 'Engineer', 'Programmer', 'Architect'],
      },
      githubCalendar: {
        header: 'Contributions',
        subtext: 'Github calendar heatmap'
      },
      blog: {
        header: 'Blog',
        subtext: 'I try to write once in a while. let me know your thoughts deva4rf@gmail.com'
      },
      recentBlog: {
        header: 'Recent blogs',
        subtext: 'It takes a lot of time to write man'
      },
      uses: {
        header: 'uses',
        subtext: 'a quick summary of what I use on a daily basis to code and some codestats.net flex'
      },
      projects: {
        header: 'Projects',
        subtext: 'This page lists some of my personal and work projects. every project has some story, click on the title to read'
      }
    }
  }
}
