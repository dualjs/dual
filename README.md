Dual
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

With Dual you can use your single widgets codebase **both on client and on server**. It is ideal for:

 * really fast headless testing
 * progressive enhancement
 * speeding up application UI loading
 * building pluggable server-side templates
 * building normal single-page applications (the way it is made with ExtJS or YUI, etc...)

What Dual is not:

 * Dual is not a framework for writting the whole application that works both on client and server side. You have to write your models, communication and logic yourself.
 * Dual is not a widgets collection itself - it is rather a platform to organize your views code into widgets. However, there is DCL - a set of widgets made with dual.
