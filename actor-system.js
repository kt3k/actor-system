/**
 * actor-system.js v1.4.1
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 * depends on jQuery, class-component.js and subclass.js
 */


(function ($, subclass) {
    'use strict';

    var NAME = 'actor-system';

    if (typeof $.registerClassComponent === 'undefined') {

        throw new Error('$.registerClassComponent not found. ' + NAME + ' depends on class-component.js (https://github.com/kt3k/class-component).');

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

        var Child = subclass(Parent, defining);

        if (name) {

            $.assignClassComponent(name, Child);

        }

        return Child;

    };


    /**
     * @param {String} className
     * @param {Function} DefiningClass
     * @return {Function}
     */
    $.assignClassComponent = function (className, DefiningClass) {

        DefiningClass.classComponentName = className;

        $.registerClassComponent(className, function (elem) {

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
    $.defineActor = function (actorName, definingFunction) {

        return extendAndAssign(Actor, actorName, definingFunction);

    };


    /**
     * Defines and registers an role
     *
     * @param {String} roleName
     * @param {Function} definingFunction
     */
    $.defineRole = function (roleName, definingFunction) {

        return extendAndAssign(Role, roleName, definingFunction);

    };


    /**
     * ReadyNotifier is the component class which notifies the readiness of the component.
     */
    var ReadyNotifier = subclass(function (pt) {

        pt.constructor = function (elem) {

            this.elem = elem;

            var classComponentName = this.constructor.classComponentName;

            this.elem.classComponentReady(classComponentName, this.__init());

        };

        pt.__init = function () {};

    });


    /**
     * Actor is a component class which drives the dom as main actor. A dom is able to have only one actor.
     */
    var Actor = subclass(ReadyNotifier, function (pt, parent) {

        pt.constructor = function (elem) {

            elem.data('__actor', this);

            parent.constructor.call(this, elem);

        };

    });


    /**
     * Role is a component class. A dom can have multiple roles on it.
     */
    var Role = subclass(ReadyNotifier, function (pt, parent) {

        pt.constructor = function (elem) {

            var roleName = this.constructor.classComponentName;

            elem.data('__role:' + roleName, this);

            parent.constructor.call(this, elem);

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

    $.defineActor.Actor = Actor;
    $.defineRole.Role = Role;

}(jQuery, subclass));
