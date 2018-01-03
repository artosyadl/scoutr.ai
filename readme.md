# Rules for writing classes
Component approach to web development. It is based on the principle of dividing the interface into independent blocks.

### 1. Element
A functionally independent page component that can be reused. `.el-[element-name] (UI elements)`
```html
<!-- Breadcrumb will be used throughout the site on many pages so it should be used as an element `el-breadcrumb`-->

<ul class="el-breadcrumb">
  <li><a>Home</a></li>
  <li><a>Registration</a></li>
  <li><span>Personal Information</span></li>
</ul>
```

### 2. State
The state for any object, for example: `.is-active`, `.is-open` etc. `.is-[state-name]`
```html
<!-- List items have one that is different state `is-active` -->

<ul>
    <li class="el-list-item is-active"><a href="#">...</a></li>
    <li><a href="#">...</a></li>
    <li><a href="#">...</a></li>
    <li><a href="#">...</a></li>
</ul>
```

### 3. Modifier
An entity that defines the appearance, state, or behavior of a block or element. `.mod-[modificator-name]`

```html
<!-- The `el-button` element has the `background` modifier with the value `secondary` -->

<button class="el-button mod-bg-secondary ">
  Okay
</button>

<!-- The `el-button` block has the `mod-default` modifier -->

<button class="el-button mod-default">
  Okay
</button>
```

### 4. Java Script selector
An entity that defines the initialization of scripts for a block or element. `.js-[class-name-for-script]`
```html
<!-- To the element `el-dropdown` by the identifier `js-dropdown` connects the plugin for its merging -->

<select class="js-dropdown el-dropdown">
  <option value="">Gender</option>
  <option value="1">Male</option>
  <option value="0">Female</option>
</select>
```

## Example for the correct spelling of block words with a bootsrap grid
Example: `.[service]-wrap`, `.[service]-row`, `.[service]-col`, `.[service]-item`
```html
<!-- The classes that belong to the structural grid .row .col-xs-12 etc. must be at the end. -->

<div class="service-wrap">
    <div class="service-row row">
        <div class="service-col col-xs-12">
            <p class="service-item">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, ea.
                <a href="#" class="serive-item-name el-link">...</a>
            </p>
        </div>
    </div>
</div>

```

## Example for the order and priority of spelling classes
1. Java Script selector `.js-dropdown`
2. Name `.header`
3. State `.is-active`
4. Modifier `.mod-black`
5. Bootstrap classes `.col-xs-12`


```html
<form>
  <button class="js-submit el-btn is-disabled mod-red">...</button>
</form>
```

# Structure Files

```
  ├ css/
  │ ├ fonts/                   - fonts imported this project
  │ ├ plugins/                 - plugin .css this project
  │ │
  │ ├ libs.css                 — collected from the plugins/
  │ └ style.css                — collected from the .sass - .css file of the this project file
  │
  ├ dev/
  │ ├ sass/                    — .sass - source style project
  │ └ js/
  │   ├ lib/                   — library's/ plugins
  │   ├ core/                  — library's/ work files
  │   │
  │   └ jquery-1.11.1.min.js   — jquery
  │
  ├ images/                    — images project
  │
  ├ js/
  │ ├ common.js                — main js - file project
  │ ├ modernizr.js             — It’s a collection of tests – or “detects” as we like to call them – which run as your web page loads.
  │ ├ ie-detector.js           — IE detector js
  │ ├ libs.js                  — collected in single file ['dev/js/jquery-1.11.3.min.js', 'dev/js/lib/*.js']
  │ └ core.js                  — collected in single file ['dev/js/core/*.js']
  │
  ├ gulpfile.js                - This file is used to configure or define tasks and load Gulp plugins.
  ├ package.json               - This file is used by npm to store metadata for projects published as npm modules.
  └ *.html(*)                  - generated html files this project
```



# Node and Gulp installation


Gulp is a command-line tool for managing task automation. There are already countless blog posts and tutorials explaining what it does and how to install it, so we’ll just briefly cover the installation process and then dive in to actually using it.


#### Install NodeJS

First of all, you’ll need [NodeJS](https://nodejs.org/en/) which is a one-click install via the link.


#### After NodeJS installed, run the command to install modules
```
npm i
```

##### 1. Install gulp globally:

__If you have previously installed a version of gulp globally, please run `npm rm --global gulp`
to make sure your old version doesn't collide with gulp-cli.__

```
npm install --global gulp-cli
```

##### 2. Install gulp in your project devDependencies:

```
npm install --save-dev gulp
```
##### 3. Gulp tasks:

```
gulp production
```

This task for building project

```
gulp
```

The default task will run for developing (building, create server, watchers).



# Sass installation

---

## On Windows
1. Install [Ruby](https://www.ruby-lang.org/en/installation/) 1.9.3 or 2.x.
This is a straight forward install and should pose no problems.
2. Restart computer.
3. Confirm that Ruby installed correctly. Open the Command Prompt window and type

```
ruby -v
```

at the command prompt. You should see the version number of your Ruby installation.
4. To install Sass on `Windows` open the Command Prompt and type:

```
gem install sass
```

You should see the following after Sass is successfully installed.

```
Fetching: sass-3.2.7.gem (100%)
Successfully installed sass-3.2.7
Parsing documentation for sass-3.2.7
Installing ri documentation for sass-3.2.7
Done installing documentation for sass (18 sec).
1 gem installed
```

---

## On Linux
1. Install [Ruby](https://www.ruby-lang.org/en/installation/) 1.9.3 or 2.x.
2. Confirm that Ruby installed correctly. Open the terminal and type

```
ruby -v
```

at the command prompt. You should see the version number of your Ruby installation.
3. To install Sass on `Linux` open the Terminal and type:

```
sudo gem install sass
```

---

## On OSX
1. [Ruby](https://www.ruby-lang.org/en/installation/) comes bundled in `OSX`

```
ruby -v
```

Your output should be similar to

```
ruby 2.0.0p645 (2015-04-13 revision 50299) [universal.x86_64-darwin15]
```

2. To install Sass on `OSX` open the Terminal and type:

```
sudo gem install sass
```

[downloads-image]: https://img.shields.io/npm/dm/gulp.svg
[npm-url]: https://www.npmjs.com/package/gulp
[npm-image]: https://img.shields.io/npm/v/gulp.svg