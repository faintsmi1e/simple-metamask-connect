import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'git@github.com:pinosol/simple-metamask-connect.git', // Update to point to your repository
  user: {
   name: 'pinosol', // update to use your name
   email: 'pinosol64@gmail.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);