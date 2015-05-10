/**
 * actor-system.js v0.1.1
 * author: Yoshiya Hinosawa ( https://github.com/kt3k )
 * license: MIT
 * depends on jQuery, custom-class.js and subclass.js
 */


(function ($, subclass) {
    'use strict';

    var NAME = 'actor-system';

    if (typeof $ === 'undefined') {

        throw new Error('jQuery not found. ' + NAME + ' depends on jQuery');

    }

    if (typeof subclass === 'undefined') {

        throw new Error('subclass not found. ' + NAME + ' depends on subclass.js ( https://github.com/kt3k/subclass ).');

    }

    /**
     * Defines an actor
     *
     * @param {String} actorName
     * @param {Function} definingFunction
     */
    $.defineActor = function (actorName, definingFunction) {

        var Actor0 = subclass(Actor, definingFunction);

        $.registerCustomClass(actorName, function (elem) {

            new Actor0(elem);

        });

        return Actor0;

    };


    /**
     *
     * @param {String} actorName
     * @param {Function} definingFunction
     */
    $.defineRole = function (roleName, definingFunction) {

        var Role0 = subclass(Role(roleName), definingFunction);

        $.registerCustomClass(roleName, function (elem) {

            new Role0(elem);

        });

        return Role0;

    };


    var Actor = subclass(function (pt) {

        pt.constructor = function (elem) {

            this.elem = elem;

            this.elem.data('__actor', this);

            this.init();

        };

        pt.init = function () {};

    });


    var roleClassCache = {};

    var Role = function (roleName) {

        if (typeof roleName !== 'string') {

            throw new Error('The role name has to be a string');

        }

        if (typeof roleClassCache[roleName] !== 'undefined') {

            // return from cache
            return roleClassCache[roleName];

        }

        var Role0 = subclass(function (pt) {

            pt.constructor = function (elem) {

                this.elem = elem;

                this.elem.data('__role:' + roleName, this);

                this.init();

            };

            pt.init = function () {};

        });

        roleClassCache[roleName] = Role0;

        return Role0;

    };

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
