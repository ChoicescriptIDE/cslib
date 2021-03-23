nav = new SceneNavigator(["startup"]);
stats = {};

// We modify Scene.prototype.bug to make *bug 'catchable'.
// If the stat cslib_catch_bug is set to true, in case of a bug a function
// will simply return. The error message will be available in cslib_bug_message.
// Make sure cslib_catch_bug is immediately reset to false.
//
// Example usage:
//
//    *set cslib_catch_bug true
//    *gosub_scene cslib_... ... ...
//    *set cslib_catch_bug false
//    *gosub test_finish "Expected message" cslib_bug_message

Scene.prototype.bug = function scene_bug(message) {
  if (message) {
    message = "Bug: " + this.replaceVariables(message);
  } else {
    message = "Bug";
  }
  if (this.stats.cslib_catch_bug) {
    this.stats.cslib_bug_message = message;
    this.return();
  } else {
    throw new Error(this.lineMsg() + message);
  }
}