<h1><img src="./res/logo/cslib_logo%20flat.png" alt="C.S.Lib logo" width="43" align="left"/> ChoiceScript Library</h1>

![Release](https://img.shields.io/github/v/release/choicescriptIDE/cslib?include_prereleases&style=for-the-badge) ![GitHub](https://img.shields.io/github/license/ChoicescriptIDE/cslib?style=for-the-badge) ![GitHub all releases](https://img.shields.io/github/downloads/ChoicescriptIDE/cslib/total?style=for-the-badge)
![test](https://img.shields.io/github/workflow/status/choicescriptide/cslib/test?label=tests&style=for-the-badge)

The ChoiceScript Library (cslib) is a collection of common, re-usable routines (i.e. functions) for use in development of ChoiceScript games. It's an attempt to extend ChoiceScript's core functionalities using vanilla ChoiceScript only.

[ChoiceScript](https://github.com/dfabulich/choicescript) is a simple programming language created by Dan Fabulich to aid non-programmers to write and code interactive fiction text-based gamebooks in the style of [Choose Your Own Adventure](https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure). The language is proprietary and governed by its own [license](https://github.com/dfabulich/choicescript/blob/master/LICENSE.txt).

The idea is to provide a community built (and supported) collection of routines, so [contribute](#-contributing) with ideas, code or feedback!

**Create, Learn and Experiment!**

## Use It!

### Installation
- Copy the module files (the ones that start with `cslib_`) to your game folder, together with your scene files.
- Create a global variable called `cslib_ret` to hold return values.
- Create (or set) `implicit_control_flow` to **true**.

```choicescript
__startup.txt__

*create implicit_control_flow true
*create cslib_ret 0
```

- That's it! :partying_face:

You can now call any of the public routines described in the files. :muscle:

(Private routines are meant for internal use of the module itself. The name of every private routine starts with an underscore.)

Routines that need to return a value will always do so (unless otherwise specified) through the dedicated global variable: `cslib_ret`. So make sure to capture its value into another variable!

Note that some routines will need you to create more global variables, or follow a naming convention, this is true, for instance, for array-based routines. Make sure you read the documentation on the routine before using it.

Also, remember that ChoiceScript is by nature not performant, which is fine, given its primary purpose. This library aims to extend ChoiceScript's core functionality, but don't go too crazy with it. Okay? :sweat_smile:

Credits are not mandatory but very much appreciated. :pray: You can mention the name of the `CSLIB` project and include a link to this repository.


## Examples:
### Lowercase

It is very common that mobile keyboards automatically enable uppercase for the first letter of a text input. So you asked your reader to insert a colour for the character's eyes and now, every time, it comes up like this?

> He looks into your sweet *Brown* eyes…

*Oof!* :joy: What if you could be sure every letter is in lowercase?

```choicescript
*gosub_scene cslib_string lowercase eye_colour
*set eye_colour cslib_ret
```

### Highest Stat

Very often authors need to check which of the stats is the highest one, whether to display flavour text or decide which branch to follow in the story. Writing a loop in ChoiceScript is not trivial and some authors even prefer to write many lines of `*if` statements just to work around it. But what if you could check it in a single line of code?!

```
*gosub_scene cslib_number max_stat "strength" "dexterity" "constitution" "intelligence" "wisdom" "charisma"
*goto {"flavour_text_" & cslib_ret}

--------------------------------

*label flavour_text_strength

The highest stat is "strength"! Amazing!
```

### Modules

`cslib` is divided into modules and each module might depend on routines present on the other ones. So when including the modules in your game, make sure to include their dependencies as well.

|    Module    |               Description                               | Version       | Depends on  |                          Routines                          |
|:------------:|:-------------------------------------------------------:|:-------------:|:-----------:|:----------------------------------------------------------:|
| cslib_string | Routines to manipulate text (strings).                  |  1.0.0        |             | concat, lowercase, substring, find, replace, reverse, etc. |
| cslib_number | Routines to manipulate numbers.                         |  1.0.0        |             | mean, max_stat, max, min, etc.                             |
| cslib_menu   | Routines to generate menus and choices.                 |  1.0.0        |             |                                                            |
| cslib_object | Routines to simulate objects.                           |  1.0.0        |             | get, get_by_field, set                                     |
| cslib_util   | Miscellaneous utility routines.                         |  1.0.0        |             | repeat                                                     |
| cslib_array  | Various array manipulation.                             |  1.0.0        |             | filter, clone, clean, push, pop, etc.                      |
| cslib_math   | Math functions, including trigonometric and hyperbolic. |  1.0.0        |             | sin, cos, sinh, cosh, pi                                   |

### Contributing

Every contribution is welcome. Did you use one of the modules? Let us know! You decided not to use it? Tell us why, was it difficult to understand/use? Or there wasn't anything you found useful?

Do you have a routine in mind you believe would be useful? Let us know! Or do you want to try it yourself and contribute with code? Great! Just make sure to read the [contributing guidelines](./CONTRIBUTING.md) for the code style conventions and other more technical stuff.
