/**
 * actor-system.js v5.0.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 * depends on jQuery and class-component.js
 */


(function ($) {
    'use strict';

    var NAME = 'actor-system';

    if (typeof $.cc === 'undefined') {

        throw new Error('$.cc is undefined. ' + NAME + ' depends on class-component.js (https://github.com/kt3k/class-component).');

    }

    /**
     * @private
     * @param {Function} Parent The parent class
     * @param {String} name The class component name
     * @param {Function} defining
     * @return {Function} The child class
     */
    var extendAndAssign = function (Parent, name, defining) {

        if (defining == null && typeof name === 'function') {

            return extendAndAssign(Parent, null, name);

        }

        var Child = $.cc.subclass(Parent, defining);

        if (name) {

            $.cc.assign(name, Child);

        }

        return Child;

    };


    /**
     * @param {String} className
     * @param {Function} DefiningClass
     * @return {Function}
     */
    $.cc.assign = function (className, DefiningClass) {

        DefiningClass.classComponentName = className;

        $.cc.register(className, function (elem) {

            new DefiningClass(elem);

        });

        return DefiningClass;

    };

    /**
     * Defines and registers an actor
     *
     * @param {String} actorName
     * @param {Function} definingFunction
     */
    $.cc.defineActor = function (actorName, definingFunction) {

        return extendAndAssign($.cc.Actor, actorName, definingFunction);

    };

    /**
     * Defines and registers an role
     *
     * @param {String} roleName
     * @param {Function} definingFunction
     */
    $.cc.defineRole = function (roleName, definingFunction) {

        return extendAndAssign($.cc.Role, roleName, definingFunction);

    };

    /**
     * Coelement accompanies the element.
     */
    var Coelement = $.cc.subclass(function (pt) {

        pt.constructor = function (elem) {

            this.elem = elem;

        };

    });


    /**
     * Actor is a component class which drives the dom as main actor. A dom is able to have only one actor.
     */
    $.cc.Actor = $.cc.subclass(Coelement, function (pt, parent) {

        pt.constructor = function (elem) {

            parent.constructor.call(this, elem);

            elem.data('__actor', this);

        };

    });


    /**
     * Role is a component class. A dom can have multiple roles on it.
     */
    $.cc.Role = $.cc.subclass(Coelement, function (pt, parent) {

        pt.constructor = function (elem) {

            parent.constructor.call(this, elem);

            var roleName = this.constructor.classComponentName;

            elem.data('__role:' + roleName, this);

        };

    });

    /**
     * Gets an actor set on the element.
     *
     * @return {Actor}
     */
    $.fn.getActor = function () {

        return this.data('__actor');

    };

    /**
     * Gets an role of the given name set on the element.
     *
     * @param {String} roleName The role name
     * @return {Role}
     */
    $.fn.getRole = function (roleName) {

        return this.data('__role:' + roleName);

    };


}(jQuery));
