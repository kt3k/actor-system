/**
 * actor-system.js v1.0.0
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 * depends on jQuery, class-component.js and subclass.js
 */


(function ($, subclass) {
    'use strict';

    var NAME = 'actor-system';

    if (typeof $ === 'undefined') {

        throw new Error('jQuery not found. ' + NAME + ' depends on jQuery');

    }

    if (typeof $.registerClassComponent === 'undefined') {

        throw new Error('$.registerClassComponent not found. ' + NAME + ' depends on class-component.js (https://github.com/kt3k/class-component).');

    }

    if (typeof subclass === 'undefined') {

        throw new Error('subclass not found. ' + NAME + ' depends on subclass.js ( https://github.com/kt3k/subclass ).');

    }


    /**
     * @private
     * @param {jQuery} $
     * @param {String} className
     * @param {Function} DefiningClass
     * @return {Function}
     */
    var assignClassComponent = function ($, className, DefiningClass) {

        DefiningClass.classComponentName = className;

        $.registerClassComponent(className, function (elem) {

            new DefiningClass(elem);

        });

        return DefiningClass;

    };

    /**
     * Defines an actor
     *
     * @param {String} actorName
     * @param {Function} definingFunction
     */
    $.defineActor = function (actorName, definingFunction) {

        var Actor0 = subclass(Actor, definingFunction);

        return assignClassComponent($, actorName, Actor0);

    };


    /**
     *
     * @param {String} actorName
     * @param {Function} definingFunction
     */
    $.defineRole = function (roleName, definingFunction) {

        var Role0 = subclass(Role, definingFunction);

        return assignClassComponent($, roleName, Role0);

    };


    var ReadyNotifier = subclass(function (pt) {

        pt.constructor = function (elem) {

            this.elem = elem;

            var classComponentName = this.constructor.classComponentName;

            this.elem.classComponentReady(classComponentName, this.init());

        };

        pt.init = function () {};

    });


    var Actor = subclass(ReadyNotifier, function (pt, parent) {

        pt.constructor = function (elem) {

            elem.data('__actor', this);

            parent.constructor.call(this, elem);

        };

    });


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

}(window.jQuery, window.subclass));
