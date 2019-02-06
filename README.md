### Features / Benefits

Development

* React
* Redux
* ES6 / ES7
* ImmutableJS
* PostCSS ( it support CSS modules, and we recommended B.E.M style )
* Webpack 3
* Reselect
* Type Checking with Babel Type Check ( Flow syntax )
* ESLint for syntax check
* Jest and Enzyme for Unit testing
* Storybook for UI testing / documentation

Workflow

* Hot Module Reload during development
* CSS / HTML / JS minification / Image optimization when built
* JS code duplication removal during built ( tree shaking capability )
* Built-in fancy cli dashboard for reporting run time compile status
* Built-in lightweight config system
* Highly configurable build and workflow system ( webpack )
* Minimal setup time and allow you to invest into things that matters
* Everything automatic, you just care about development, nothing else \o/ Yeah ?!

If you are interested, please read the `package.json` for all installed modules and plugins.

## Table of Contents

Basic
1. [Installation](#installation)
1. [Initialize your project](#initialize-your-project)
1. [Suggested Workflow](#suggested-workflow)
1. [Production Readiness](#production-readiness)
1. [Configuration](#configuration)

Advanced
1. [Writing Unit Test](#writing-unit-test)
1. [Multiple Device Concurrent Debugging](#multiple-device-concurrent-debugging)
1. [Developing Template](#developing-template)
1. [Production Optimization and Bundle Analysis](#production-optimization-and-bundle-analysis)
1. [Integration Note](#integration-note)
1. [QA](#qa)

Other
1. [Knowledge Base Reading](#knowledge-base-reading)
1. [How to Contribute](#how-to-contribute)
1. [Updates](#updates)

# Basic

## Installation


### Prerequisite

You need to have Node.js installed.

### Post Installation

If you would like to have Redux debug capabilities, you can download this Chrome extension [Redux DevTool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

![Redux DevTool](https://www.dropbox.com/s/wni425e3d4xiy85/redux-devtool.png?raw=1)


## Initialize your project

Now run the following commands in your terminal

**NOTE: You only need to run this once!**

```sh
$ npm install # This will install the necessary packages to use the app
```

**That's it!**


### To run the app in Development Mode

```sh
$ npm run dev
```

Wait about 5 - 10 seconds for your development environment to initialize.

When it finishes, open your browser and go to `http://localhost:3000/`

If you see the landing page, it means you have set up everything successfully.


### List of NPM Commands


```sh
$ npm run dev       # build and watch, but javascript not minified
$ npm run build     # build a minified production version
$ npm run lint      # linting
$ npm run clean     # it runs before each build, so you don't need to
```


## Suggested Workflow


After you check out the repo, I will usually do the following :

0. Go to your project root in your host machine  ( e.g. your Mac )
1. Run `npm run dev`
2. Go to your browser and go to `localhost:3000`
3. Make code changes
4. Watch your code changes reflect on browser without refreshing
5. Repeat your development steps

That's very easy, isn't it?

## Production Readiness

React Redux Boilerplate supports production preview, which means that you can run the production build job and see how it looks like in production.

1. Run `npm run build` and wait until it is done
2. Go to the project `dist`, you will see a `index.html`  (template is customizable, please read `Developing Template` section)
3. Open that `index.html` in your browser, and that is the build version that just got generated

That's very easy, isn't it?

### Difference between `npm run dev` v.s. `npm run build`

`npn run dev` is best to do JS / CSS only changes, and it comes with live reload functionality

`npm run build` is for testing what happen if your frontend assets are optimized ( production level code )

Please let me know if you have better work flow suggestion!!

## Configuration
React Redux Boilerplate has two configuration strategies, one is for normal configuration, the other one is for sensitive information that you don't want others to know.

### Configuring application

If you look at folder `config`, there are four files

`default.json` - all default configuration
`development.json` - when you run `npm run dev`, it will pull configuration from that file
`release.json` - when you run `npm run build:release`, it will use this configuration
`production.json` - when you run `npm run build`, it will use this configuration

We are using [node-config](https://github.com/lorenwest/node-config), they have a pretty easy to understand documentation.


And in your config file ( json config file ), whatever you put inside the `app`, it will be injected into the client application and you can access to your `app` config data by using `__CONFIG__` variables.

Let's say you have a config like the following

```
{
  "app": {
    "apiUrl": "http://localhost:8000"
  }
}

```

In your React application, you can access this variables

```
__CONFIG__.apiUrl

```
