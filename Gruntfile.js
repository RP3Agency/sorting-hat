/*!
 * RP3 Sorting Hat
 * @author Sarah Goldman and Julie Smith
 */

'use strict';

var helpers = {
    'pageTitle': function(pageName) {
        return (this.pages[pageName] ? this.pages[pageName].title : "");
    }
}

/**
 * Grunt module
 */
module.exports = function(grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  /**
   * FireShell Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      apps: 'apps',
      assets: 'assets',
      db: 'db',
      dist: 'dist',
      docs: 'docs',
      provisioning: 'provisioning',
      public: 'public',
      src: 'src',
      images: [
        '<%= project.public %>/img'
      ],
      scss: [
        '<%= project.src %>/scss/style.scss'
      ],
      js: [
        '<%= project.src %>/js/vendor/*.js',
        '<%= project.src %>/js/*.js'
      ]
    },

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' + 
              ' * <%= pkg.title %>\n' + 
              ' * <%= pkg.url %>\n' + 
              ' * @author <%= pkg.author %>\n' + 
              ' * @version <%= pkg.version %>\n' + 
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' + 
              ' */\n'
    },

    /**
     * Clean files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     * Remove generated files for clean deploy
     */
    clean: {
      dist: [
        '<%= project.dist %>/css/style.css'
      ]
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: [
        '<%= project.src %>/js/*.js',
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      dev: {
        files: {
          '<%= project.dist %>/js/scripts.min.js': '<%= project.js %>'
        }
      },
      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
      }
    },
    
    /**
     * Copy files and folders.
     * https://github.com/gruntjs/grunt-contrib-copy
     * Copies all files from public to dist
     */
    copy: {
      dev: {
        expand: true,
        cwd: '<%= project.public %>/',
        src: '**',
        dest: 'dist/',
        filter: 'isFile',
      },
      dist: {
        expand: true,
        cwd: '<%= project.public %>/',
        src: '**',
        dest: 'dist/',
        filter: 'isFile',
      }
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: '<%= tag.banner %>'
      },
      dist: {
        files: {
          '<%= project.dist %>/js/scripts.min.js': '<%= project.js %>'
        }
      }
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= project.src %>/scss',
          cssDir: '<%= project.dist %>/css',
          imagesDir: '<%= project.public %>/images',
          javascriptsDir: '<%= project.src %>/js',
          fontsDir: '<%= project.public %>/fonts',
          outputStyle: 'expanded',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: '<%= project.src %>/scss',
          cssDir: '<%= project.dist %>/css',
          imagesDir: '<%= project.public %>/images',
          javascriptsDir: '<%= project.src %>/js',
          fontsDir: '<%= project.public %>/fonts',
          outputStyle: 'expanded'
        }
      }
    },
	
	generator: {
        dev: {
            files: [
                { cwd: '<%= project.src %>/pages', src: ['**/*'], dest: '<%= project.dist %>', ext: '.html' }
            ],
            options: {
                partialsGlob: '<%= project.src %>/pages/partials/*.html',
                templates: '<%= project.src %>/pages/templates',
                handlebarsHelpers: helpers,
                environment: 'dev'
            }
        }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
    watch: {
      concat: {
        files: '<%= project.src %>/js/{,*/}*.js',
        tasks: ['concat:dev', 'jshint']
      },
      compass: {
        files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
        tasks: ['compass:dev']
      }
    }
  });

  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'copy:dev',
    'compass:dev',
    'concat:dev',
	'generator:dev'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'copy:dist',
    'clean:dist',
    'compass:dist',
    'uglify'
  ]);

};