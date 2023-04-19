function grunt(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
  });

  grunt.registerTask("default", ["concurrent"]);
}

module.exports = grunt;
