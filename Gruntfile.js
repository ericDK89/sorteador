function grunt(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less: {
      development: {
        files: {
          "./dev/styles/styles.css": "./src/styles/styles.less",
        },
      },
      production: {
        options: {
          compress: true,
        },
        files: {
          "./dist/styles/styles.min.css": "./src/styles/styles.less",
        },
      },
    },
    concurrent: {
      dev: ["less:development"],
      build: ["less:production"],
    },
    watch: {
      less: {
        files: ["./src/**/*.less"],
        tasks: ["concurrent:dev"],
      },
      html: {
        files: ["./src/**/*.html"],
        tasks: ["replace:dev"],
      },
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "CSS_ADDRESS",
              replacement: "./styles/styles.css",
            },
            {
              match: "JS_ADDRESS",
              replacement: "../src/scripts/scripts.js",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
      dist: {
        options: {
          patterns: [
            {
              match: "CSS_ADDRESS",
              replacement: "./styles/styles.min.css",
            },
            {
              match: "JS_ADDRESS",
              replacement: "./scripts/scripts.min.js",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["temp/index.html"],
            dest: "dist/",
          },
        ],
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "temp/index.html": "src/index.html", //a pasta temp serve para servir de base apenas, para então mandar para a pasta principal. Como não podemos usar pastas como a que estamos utilizando e nem a de desenvolvimento criamos a temp para depois mandar para a pasta de produção/dist
        },
      },
    },
    clean: ["temp"],
    uglify: {
      target: {
        files: {
          "dist/scripts/scripts.min.js": "src/scripts/scripts.js",
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", [
    "concurrent:build",
    "htmlmin:dist",
    "replace:dist",
    "clean",
    "uglify",
  ]);
}

module.exports = grunt;
