## ChoiceScript Library (cslib)

The ChoiceScript library (cslib) is a collection of common, re-usable routines (i.e. functions) for use in development of ChoiceScript games. 

cslib is written entirely in ChoiceScript itself, so is easy to understand, configure and use.

The idea is to provide a community built (and driven) collection of routines that provide ChoiceScript with extended functionality and usage patterns. 

- **Unblock Creation**
    cslib can aid in ChoiceScript development by providing complicated functionality out of the box, or allowing certain code patterns to be written more concisely.

- **Stimulate Learning**
    cslib is written in ChoiceScript, so it's easy for any ChoiceScript author to read, understand, and learn from the cslib code. In time, they may even choose to contribute themselves.

- **Encourage Experimentation**
    This one needs little explanation. Whether you're helping create cslib, just using it your games, all that matters is that you're enjoying the experience.

## Overview 

cslib is organized into 'modules' (scene files) that represent certain categories of functionality, for example, string (cslib_string), or number manipulation (cslib_number).

### Usage

To use cslib, you need only include the cslib_ prefixed scene files in your project, and define a few configuration variables in your startup scene (details further below). You can then call each individual routine as required, via gosub_scene. Documentation on each routine, including its functionality and required parameters (arguments) can be found in the commented source files.

### Limitations

Sadly, cslib is not always going to be a one-size-fits all solution to your ChoiceScript woes. There are inherent limitations in ChoiceScript that cannot be overcome, no matter how much extra ChoiceScript we write. In addition, when writing a utility like cslib (that aims to appeal to a large number of people), certain tradeoffs have to be made. So, if you plan to use it, you should keep the following limitations in mind:

- **Performance**
ChoiceScript isn't built for performance, and cslib isn't going to make that any better. The library relies heavily on usage of *gosub_scene, which is costly but it's also the only reliable way to handle complex variable scoping. If you're using the odd function or two as a utility here and there, then you shouldn't have any problems. If, however, you're planning on a super awesome complex simulator that loops through thousands of strings which it passes to cslib:replace or cslib:find... At that point, you might want to consider other options (including a different scripting language!).

- **\*temp scope**
Due to the usage of \*gosub_scene, and inherent limitations in ChoiceScript, access to current game state stored in temporary (\*temp) variables from inside cslib functions isn't going to be possible. Most of the time this isn't a problem as you can (and should!) be passing your values as parameters. However, there are definitely some desirable use-cases that aren't currently possible. The best example is passing an "array" (mytemp_1, mytemp_2, mytemp_3) to a function. You can't reliably do this with parameters as you can't change the amount of parameters you're passing at runtime. You can get around it with globals (\*create'd) arrays by passing the variable "prefix" (e.g. 'myvar' in myvar_1, myvar_2) as an argument and de-referencing it via {} syntax (and providing a length). However, having to create every array in the global scope is far from ideal.

## Technical Details

Below follow some extra technical details that will be beneficial to anyone wishing to learn more about the cslib internals, or plan to contribute to its source code.

### Global Configuration Variables

You must define all of the following variables in your startup scene (via \*create).

Note that cslib modules (scenes) should not refer to any global variable other than those listed below (or those accessed via a reference passed as a parameter).

- **cslib_ret** — *anything* (default: "")
This variable is how all cslib functions return their results. Each function should set this global before \*return with their 'result' (if there is one). If you wish to return more than one value, consider taking the refs (names) of global variables as parameters, which you can assign to via indirect reference.

- **cslib_script** — *boolean* (recommended default: false)
This variable is used to guard against any usage of \*script in cslib modules. If set to true any cslib function *may* switch to using \*script implementations in order to improve performance. Not all functions have \*script implementations, in which case they will continue to use the ChoiceScript variation.

- **cslib_assert** — *boolean* (recommended default: false)
Used to guard cslib asserts.
If set to true cslib functions are permitted to use \*bug more liberally. Best set to true when testing or debugging, particularly if you're having issues with any cslib code.

### Coding Conventions

Any contributions to the cslib source code should adhere to the following guidelines wherever possible.

#### Coding

Below follows guidance on code style when contributing to cslib.

- **Plain ChoiceScript first** 
All code in cslib modules MUST have a standard ChoiceScript implementation. It may optionally feature a \*script variant of each routine, for performance reasons, but it **must** be guarded by the *cslib_script* config variable, and be functionally equivalent to the ChoiceScript implementation.
- **Only \*gosub_scene dependencies**
Public cslib functions can depend on (call) one another (for e.g. string:find uses string:substring) but they **must** use \*gosub_scene and **not** \*gosub, even if they reside within the same scene. Yes, this is horrible for performance, but it guarantees correct scoping (preventing different function's variables overwriting one another) and removes a whole category of nasty bugs for end-users.
- **cslib_ret must be set**
All cslib functions **must** \*set cslib_ret to a value before they \*return. If the function doesn't need to return a value, it should still set cslib_ret to an empty string: "". This will help discourage over-reliance on cslib_ret, which could lead to nasty bugs, or code that is difficult to read.
- **config variables**
Adding any new global config variables to cslib is invasive and increases  configuration effort. Adding one should be considered a breaking change, and only ever be done as a last resort.
-  **Use \*bug for unrecoverable errors**
Any unrecoverable error state in a function should be handled by \*bug, and contain as much useful info as possible: file name, function name, variable values etc. It should not try to print the error message to the game screen.
- **Tests**
All cslib functions should have tests covering at least the basic use-cases. If the function is something that isn't easily tested (like a lot of cslib:menu), try to break it down into smaller (internal) functions that can be.
- **Comments**
All public cslib functions should be self-documenting, i.e. contain \*comment lines before them that briefly describe: the purpose of the function, its arguments and its return value (if any).


#### Naming

Below follows guidance on naming variables and routines etc., when contributing code to cslib.

##### Functions
Private functions should be prefixed with an underscore, e.g.: `*label _replace_helper`.
Public functions, i.e. functions you intend a user (or another cslib scene) to call with \*gosub_scene, should be named as simply and intuitively as possible. They should **not** be prefixed with an underscore, e.g.: `*label replace`. Try to avoid special characters or numbers (without good reason). Words should be separated by an underscore.
##### Parameters
Named parameters (created via \*params) should similarly be free of special characters and numbers. They should also be prefixed with p_, e.g.: `*params p_start p_end`.
Automatic `param_N` variables are, of course, exempt.

##### Config Variables
All global cslib config variables should start with 'cslib_' and be as short and informatively named as possible.

##### Scenes
Public scenes (modules) should be named `cslib_modulename` (all lowercase) and avoid numbers or special characters (aside from underscores to separate words). All `test` scenes should be named as: `test_modulename`.