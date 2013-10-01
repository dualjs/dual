dual
====

DOM framework for Node and browser

Features:

 * two ways of rendering - `.domify()` for browser and `.stringify()` for Node
 * incapsulation with `dual.Widget`
 * list management with `dual.List`
 * Backbone integration with `dual.adapter.BackboneModel` and `dual.adapter.BackboneCollection`
 * DCL - Dual Components Library (Twitter Bootstrap powered set of useful widgets) TODO
 * automatic building with `grunt-dcl` TODO
 * project scaffolding with `grunt-init-dual` TODO

With Dual you can use your single widgets codebase both on client and server. It is ideal for:

 * really fast headless testing
 * progressive enhancement
 * speeding up application UX loading
 * building pluggable server-side templates
 * building normal single-page applications

What Dual is not:

 * Dual is not a framework for writting the whole application that works both on client and server side. You have to write your models, communication and logic yourself.
