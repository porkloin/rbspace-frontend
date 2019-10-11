---
title: "Debugging Drupal Applications in (Neo)Vim with VDebug"
date: "2018-08-30T23:00:20.000Z"
description: "Debugging Drupal Applications in (Neo)Vim with VDebug"
featuredImage: ../../../images/code.png
---

PHPStorm is great, but I don't think I'm alone in the belief that it's a little bit of a memory hog. For the longest time, I've split my development time between Vim (well, NeoVim, but that's a whole different story) and PHPStorm. Whenever I needed to do heavy debugging work I'd drudge up PHPStorm and fire up the debugger.

Recently, however, I finally decided that it was time to set up a proper debugger in my NeoVim configuration. Frankly, I started out thinking it would be a difficult task, but in the end it didn't take me more than 15 minutes to get up and running.

One quick note: this article won't cover initially setting up Xdebug in your Drupal project. However, I will say that easy Xdebug setups are one of the many reasons why I'd recommend a Docker-based local development solution like [Lando](https://github.com/lando/lando/) or [DDEV](https://ddev.readthedocs.io/en/latest/).

##Vdebug
[Vdebug](https://github.com/vim-vdebug/vdebug/) is a debugger client for Vim and NeoVim. Although we'll be setting it up to interface with Xdebug in a Drupal application, Vdebug can actually be used as a step debugger for various other programming languages, including NodeJS, Python, and more.

##Installing Vdebug
Note: Installing Vdebug requires having a Vim installation compiled with Python 3 support. On Ubuntu/Debian this can be attained with the vim-nox package.

In my NeoVim installation I use vim-plug to manage my vim plugins. It makes it dead simple to install new plugins. After [installing vim-plug](https://github.com/junegunn/vim-plug#installation), all you need to do is drop 

```vim
Plug 'vim-vdebug/vdebug'
```

into your ~/.config/nvim/init.vim file (NeoVim) or ~/.vimrc (Vim). Then, next time you open Vim enter command mode (:) and type :PlugInstall.

Huzzah! You've installed Vdebug!

##Debugging
First, you can use Vdebug to set breakpoints on the currently selected line in vim using F10. 

Once you've selected your breakpoints, you can start Vdebug by hitting F5. This opens Vdebug and starts listening for connections. Once you've done that, refresh your page with your browser debugger enabled, and you should see your debugger kick into action!

Once debugging has begun, F5 will step through your code, and F6 will stop the code and debugger.

One thing to note is that Vdebug utilizes vim splits to show multiple panes of information in the same terminal. If you've never used splits before (tsk tsk) now is a great time to start! The default hotkey for moving between splits is Ctrl+w {h,j,k,l} - this will navigate you directional through your vim split panes. So if you are on your primary code split, once the debugger is open it will show your loaded variables in a split that appears in the upper right hand corner. To get to this split you would hit Ctrl+w l. Within the variable pane youc an unfold any variable with a caret next to it and hit enter.

##Containerized Apps
If you're running your project in a Docker-based local development solution like Lando or DDEV, you need to do once last step to make sure your configuration works properly.

At the end of your (Neo)Vim configuration file (~/.config/nvim/init.vim for Neovim, ~/.vimrc for vim) add the following lines:

```vim
"vdebug mappings.
if !exists('g:vdebug_options')
      let g:vdebug_options = {}
endif
let g:vdebug_options['path_maps'] = {
      \  '/var/www/html' : '/home/myuser/myprojectroot',
    \}
```
Note that you will need to modify the values to match your path mappings! The first path (/var/www/html in this example) is the path to the codebase root inside your docker container - you can easily find this by ssh-ing into your container (lando ssh or ddev ssh or docker exec myappcontainer bin/bash) and location your codebase on the host system. The second value (on the right) is the path to the codebase on your local system.

 

And that's it! Although there are some gotchas that take a little time, really it's a very quick process to get up and running with an Xdebug setup in Vim!