module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      default:
        expand: true
        flatten: true
        cwd: 'src'
        src:
          '*.coffee'
        dest: 'bin'
        ext: '.js'
    watch:
      scripts:
        files:
          '**/*.coffee'
        tasks:
          'coffee'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['watch']
