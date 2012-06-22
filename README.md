Setting up Ruby
---------------

### Windows

 * Get [RubyInstaller][ri] 1.9.

### Mac OSX

  * Install one of the following:
     - [Command line tools for XCode][apple] (~171MB, for Lion+)
     - [OSX GCC installer][osxgcc] (<250MB, for Snow Leopard or Lion)
     - [XCode][apple] (1.4GB(!), for anyone else)
  * Install [Homebrew][brew].
  * You can now install Ruby 1.9 using `brew install ruby`.

You may also install with [rbenv][rbenv] (recommended if you're developing on
Ruby regularly), or [rvm][rvm].

### Ubuntu Linux

 * Install Ruby using `sudo apt-get install ruby-1.9.1-full`.

You may also install with [rbenv][rbenv] (recommended if you're developing on
Ruby regularly), or [rvm][rvm].

[ri]: http://rubyinstaller.org/
[apple]: http://developer.apple.com/downloads
[osxgcc]: https://github.com/kennethreitz/osx-gcc-installer
[brew]: http://mxcl.github.com/homebrew
[rbenv]: https://github.com/sstephenson/rbenv
[rvm]: http://rvm.io

Development setup
-----------------

    $ gem install bundler
    $ bundle
    $ bundle exec middleman

You may need to prefix the first 2 commands with `sudo` (eg, `sudo gem install
bundler`) if it doesn't work.

Icons
-----

 - http://www.iconfinder.com/search/?q=iconset%3Asocial

