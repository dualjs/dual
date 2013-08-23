module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        amdwrap: {
            usingDynamicExpansion: {
                expand: true,
                cwd: "./",
                src: ["*.js", "Node/*.js"],
                dest: "test/amd/"
            }
        },

        watch: {
            all: {
                files: ["*.js", "Node/*.js"],
                tasks: ['amdwrap'],
                options: {
                    spawn: false
                },
            },
        },

        browserify2: {
            all: {
                entry: './global',
                compile: './build/dominate.js'
            }
        },

        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //     },
        //     build: {
        //         src: 'src/<%= pkg.name %>.js',
        //         dest: 'build/<%= pkg.name %>.min.js'
        //     }
        // }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-amd-wrap');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify2');

    // Default task(s).
    grunt.registerTask('default', ['amdwrap', 'watch']);
    grunt.registerTask('build', ['browserify2']);

};