nav = new SceneNavigator(["startup"]);
stats = {};

/*
 We modify Scene.prototype.bug to make *bug 'catchable'.
 If the stat cslib_catch_bug is set to true, in case of a bug a function
 will simply return. The error message will be available in cslib_bug_message.
 Make sure cslib_catch_bug is immediately reset to false.

 Example usage:

    *set cslib_catch_bug true
    *gosub_scene cslib_... ... ...
    *set cslib_catch_bug false
    *gosub test_finish "Expected message" cslib_bug_message

  The the code below is only the original source. The executed
  code is found in startup.txt in a minimized form. If you update
  the minimized code, please remember to update the source below as well.

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
*/

/*  AUTOMATIC CHOICE SELECTION #1
    ---------------------------------
    As with bug, we want to be able to be able to 'catch', but also
    test and interact with *choice(s) programatically.

    Example usage:

    *comment configure automatic choice selection
    *set cslib_catch_choice true
    *comment dictate which options (comma separated, for nested choices) should be selected
    *set cslib_choice_select "3"
    *fake_choice
      # Go east
        Eastward bound.
      # Go west
        Westward bound.
      # Go south
        Southward bound.
    *comment 'Southward bound.' will be printed here.
    *comment And helper variables will be populated:
    ${cslib_choice_count} == 3
    ${cslib_choice_1} == "Go east."
    ${cslib_choice_2} == "Go west."
    *comment etc.
    *comment and turn off automatic choice selection
    *set cslib_catch_choice false
*/


/*  AUTOMATIC CHOICE SELECTION #2
    ---------------------------------
    The core functionality is implemented by overriding the renderOptions
    method, which serves as the initial trigger to print the radio button
    UI to the screen. We guard the old and new (automatic) functionality
    on a global: cslib_catch_choice.

    cslib_choice_select is another global that should contain the number
    of the choice option to select (1 based), or a series of numbers,
    separated by a comma, if your choices are nested.

    A few helper variables are also created to help confirm that the length/number
    (cslib_choice_count) of options and their text content (cslib_choice_n) is as expected.

    The the code below is only the original source. The executed
    code is found in startup.txt in a minimized form. If you update
    the minimized code, please remember to update the source below as well.

    Scene.prototype.renderOptions = function renderOptions(groups, options, callback) {
      var self = this;
      for (var i = 0; i < options.length; i++)
        options[i].name = self.replaceVariables(options[i].name);

      if (this.stats.cslib_catch_choice) {
        // automated choice selection for cslib_menu tests
        if (this.stats.cslib_choice_select.length === 0)
          throw new Error("Error: stuck in a choice menu but selections (cslib_choice_select) were exhausted.");

        // Extract the next choice selection
        var selections = this.stats.cslib_choice_select.split(",");
        var thisSelection = parseInt(selections.shift());
        this.stats.cslib_choice_select = selections.join(",");

        // Populate helper variables
        this.stats["cslib_choice_count"] = options.length;
        for (var i = 0; i < options.length; i++)
          this.stats["cslib_choice_" + (i+1).toString()] = options[i].name;

        // Resolve the selection
        this.standardResolution(options[thisSelection - 1]);
      } else {
        // original 'game' behaviour
        this.paragraph();
        printOptions(groups, options, callback);

        if (this.debugMode) println(toJson(this.stats));

        if (this.finished) printFooter();
      }

    };
*/

/*  AUTOMATIC CHOICE SELECTION #3
    ---------------------------------
    Unfortunately, randomtest also has to override choice in order to function,
    and its overridden version does not call renderOptions.
    The simplest thing to do here is re-override that override, and patch
    in a simple substitute that calls renderOptions.

    However, as randomtest.js defines its override _after_ mygame.js is
    included, we have to override it via *script in startup.txt.

    That means the code below is only the original source. The executed
    code is found in startup.txt in a minimized form. If you update
    the minimized code, please remember to update the source below as well.

    Scene.prototype.choice = function choice(data) {
      var groups = ["choice"];
      if (data) groups = data.split(/ /);
      var options = this.parseOptions(this.indent, groups);
      var self = this;
      timeout = function() {
        println("");
        self.renderOptions(groups, options, function(option) {
          self.standardResolution(option);
        });
      }
      this.finished = true;
    };
*/
