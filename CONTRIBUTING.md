
[//]: # (CONTRIBUTING.md)

# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by TODO Group and GitHub's [code of conduct].

[code of conduct]: http://todogroup.org/opencodeofconduct/

We follow Vincent Driessen's [branching model](http://nvie.com/posts/a-successful-git-branching-model/).

Fork, then clone the repo:

    git clone git@github.com:your-username/graph-dijkstra.git

Set up your machine:

   1. Install Packages
      * `npm install`
   2. Installing Gulp
      * This doc assumes gulp is installed globally
      * `npm install -g gulp`
   3. Testing and Building with Gulp
      * Run `gulp` to start the development build process
         * Compiling, browserifying required `*.js` files
         * Linting `*.js` files
         * Running tests
         * Start watchers to automatically rebuild on source file changes
      * Run `gulp test` to perform the above but not watch for changes
      * Run `gulp build` to start the production build process
         * Follows the same path as the develop process, but does not watch for changes
         * Compiles production ready `graph-dijkstra.js`, minifies, and copies to `dist/`

Make your change. Test your change. Make sure everything is working as intended.

Push to your fork and [submit a pull request][pr].

[pr]: https://github.com/LincolnTechOpenSource/graph-dijkstra/compare

Now you are waiting on us to review your changes. After looking through and testing
your updates, we may suggest some changes, improvements, or alternatives.

Some things that will increase the chance that your pull request is accepted:

* Write tests.
* Follow our code formatting and styling.
* Write a [good commit message][commit].

[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html