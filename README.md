<h1><img src="./res/logo/cslib_logo%20flat.png" alt="C.S.Lib logo" width="43" align="left"/> ChoiceScript Library</h1>

![Release](https://img.shields.io/github/release/ChoicescriptIDE/cslib) ![GitHub](https://img.shields.io/github/license/ChoicescriptIDE/cslib) ![GitHub all releases](https://img.shields.io/github/downloads/ChoicescriptIDE/cslib/total) ![Discourse topics](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fforum.choiceofgames.com%2F) 
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FChoicescriptIDE%2Fcslib%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/ChoicescriptIDE/cslib/goto?ref=main)

The ChoiceScript Library (cslib) is a collection of common, re-usable routines (i.e. functions) for use in development of ChoiceScript games. It's an attempt to extend ChoiceScript's core functionalities using vanilla ChoiceScript only. It relies heavily on string parsing and string manipulation.

[ChoiceScript](https://github.com/dfabulich/choicescript) is a simple programming language created by Dan Fabulich to aid non-programmers to write and code interactive fiction text-based gamebooks in the style of [Choose Your Own Adventure](https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure). The language is proprietary and governed by its own [license](https://github.com/dfabulich/choicescript/blob/master/LICENSE.txt).

The idea is to provide a community built (and driven) collection of routines, so [contribute](#-contributing) with ideas, code or feedback!

**Create, Learn and Experiment!**

## Use It!

### Installation
- Copy the file to your game folder together with your scene files.

- Create a global variable called `cslib_ret` to hold return values.

```choicescript
__startup.txt__

*create cslib_ret 0
```

- That's it! :partying_face:

You can now call any of the routines described in the file. :muscle:

Routines that need to return a value will generally do so through the dedicated global variable: `cslib_ret`. So make sure to capture its value into another variable!

Note that some routines will need you to create more global variables, or follow a naming convention, make sure you read the documentation on the routine before using it.

Also, remember that ChoiceScript is by nature not performant, which is fine, given its primary purpose. This library aims to extend ChoiceScript's core functionality, but don't go too crazy with it. Okay? :sweat_smile:

Credits are not mandatory but very much appreciated. :pray:


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

|    Module    |               Description               | Version | Depends on |                          Routines                          |
|:------------:|:---------------------------------------:|:-------:|:----------:|:----------------------------------------------------------:|
| cslib_string | Routines to manipulate text (strings).  |  1.0.0  |            | concat, lowercase, substring, find, replace, reverse, etc. |
| cslib_number |     Routines to manipulate numbers.     |  1.0.0  |            |                    mean, max_stat, max, min, etc.                    |
|  cslib_menu  | Routines to generate menus and choices. |  1.0.0  |           |                                                            |
|  cslib_loop  |   Repeat the execution of a routine.    |  1.0.0  |            |                           repeat                           |

### Contributing

Every contribution is valid. Did you use one of the modules? Let us know! You decided not to use it? Tell us why, was it difficult to understand/use? Or there wasn't anything you found useful?

Do you have a routine in mind you believe would be useful? Shoot it! Or do you want to try it yourself and contribute with code? Great! Just make sure to read the [contributing guidelines](./CONTRIBUTING.md) for the code style conventions and other more technical stuff.

The idea is for the project to be driven by the community, so everyone is welcome.

### Attributions

`cslib`'s logo makes free and fair use of a modified `compass` [icon](https://fontawesome.com/icons/compass?style=regular) from Font Awesome, version 5.11.1, used under the Creative Commons Attribution 4.0 International license.

As required, these are links to Font Awesome licenses:

- [Pro](https://fontawesome.com/license)
- [Free](https://fontawesome.com/license/free)

Font Awesome is a private company, which is not connected to this project and may not endorse it.

---

`cslib`'s logo also makes free and fair use of a modified version of a maze icon by Freepik.

As required, here's the attribution:

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


---

`cslib` is released under a permissive license, it--however--does not apply to the logo. You may not use or repurpose the logo without consulting the available licenses of the original owners. 
