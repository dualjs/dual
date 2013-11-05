/*
 * dcl-widget
 * https://github.com/dualjs/dcl-widget
 *
 * Copyright (c) 2013 Mark
 * Licensed under the MIT license.
 */


'use strict';


function createSingleClassHandler(cssClass, classAsset) {
    return function(value) {
        var asset = classAsset ? this.assets[classAsset] : this.$;
        if (value) {
            asset.addClass(cssClass);
        } else {
            asset.removeClass(cssClass);
        }
    };
}

function createHtmlAttributeHandler(htmlAttribute, htmlAttributeAsset) {
    return function(value) {
        var asset = htmlAttributeAsset ? this.assets[htmlAttributeAsset] : this.$;
        asset.setAttribute(htmlAttribute, value);
    };
}

function createTextHandler(textAsset) {
    return function(value) {
        var asset = textAsset ? this.assets[textAsset] : this.$;
        asset.setText(value);
    };
}

function createClassMapHandler(classMap, classAsset) {

    var valuesToClasses = [];
    for (var cssClass in classMap) {
        if (!classMap.hasOwnProperty(cssClass)) {
            continue;
        }

        valuesToClasses.push([cssClass, classMap[cssClass]]);
    }

    return function(value) {
        var asset = classAsset ? this.assets[classAsset] : this.$;

        for (var i = 0; i < valuesToClasses.length; i++) {
            var valueToClass = valuesToClasses[i];
            var matchValue = valueToClass[0];
            var className = valueToClass[1];
            if ('' + matchValue === '' + value) {
                asset.addClass(className);
            } else {
                asset.removeClass(className);
            }
        }
    };
}

function createHandlersRunner(handlers) {
    return function(value) {
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call(this, value);
        }
    };
}


function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
}

//--------------------------------------------------------------------

module.exports = function(newConstructor, protoProps, staticProps) {
    var proto = newConstructor.prototype;
    var attrs = proto.ATTRS || {};
    for (var attr in attrs) {
        var desc = attrs[attr];

        var applierName = desc.applierName || 'applyAttribute_' + attr;
        if (protoProps.hasOwnProperty(applierName) && 'function' === typeof(protoProps[applierName])) {
            continue; //already exists
        }

        var handlers = [];

        if (desc) {

            if (desc.cssClass) {
                if (isString(desc.cssClass)) {
                    handlers.push(
                        createSingleClassHandler(desc.cssClass, desc.cssClassAsset));
                } else {
                    handlers.push(
                        createClassMapHandler(desc.cssClass, desc.cssClassAsset));
                }
            }

            if (desc.htmlAttribute) {
                handlers.push(
                    createHtmlAttributeHandler(desc.htmlAttribute, desc.htmlAttributeAsset));
            }

            if (desc.textAsset !== undefined) {
                handlers.push(
                    createTextHandler(desc.textAsset));
            }
        }

        proto[applierName] = createHandlersRunner(handlers);
    }
    return newConstructor;
};