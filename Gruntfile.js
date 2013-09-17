module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        amdwrap: {
            all: {
                expand: true,
                cwd: "./",
                src: ["dominate.js",
                    "lib/**.js",
                    "lib/Node/**.js"
                ],
                dest: "amd/"
            }
        },

        watch: {
            all: {
                files: ["./lib/**.js", "test/*.js", "examples/list/**.js"],
                tasks: [
                    'amdwrap',
                    'browserify2:test',
                    'browserify2:examples_list'
                ],
                options: {
                    spawn: false
                },
            }
        },

        browserify2: {
            test: {
                entry: './test/index.test',
                compile: './build/test.js',
                debug: true
            },
            build: {
                entry: './global',
                compile: './build/dominate.js'
            },
            examples_list: {
                entry: './examples/list/app',
                compile: './examples/list/build/app.js',
                debug: true
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
    grunt.registerTask('default', [
        'amdwrap',
        'browserify2:test',
        'browserify2:examples_list',
        'watch']);
    grunt.registerTask('build', ['browserify2']);

};