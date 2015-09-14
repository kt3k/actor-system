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
     * @param {String} className
     * @param {Function} DefiningClass
     */
    $.cc.assign = function (className, DefiningClass) {

        DefiningClass.coelementName = className;

        $.cc.register(className, function (elem) {

            new DefiningClass(elem);

        });

    };


    /**
     * Coelement is the additional function of the dom element. A coelement is bound to the element and works together with it.
     */
    $.cc.Coelement = $.cc.Coel  = $.cc.Co = $.cc.subclass(function (pt) {

        pt.constructor = function (elem) {

            this.elem = elem;

            // embeds coelement in the jquery object
            // to make it possible to reference coelement from the element.
            this.elem.data('__coelement:' + this.constructor.coelementName, this);

        };

    });


    /**
     * Actor is a component class which drives the dom as main actor. A dom is able to have only one actor.
     */
    $.cc.Actor = $.cc.subclass($.cc.Coelement, function (pt, parent) {

        pt.constructor = function (elem) {

            parent.constructor.call(this, elem);

            if (elem.data('__actor') != null) {

                throw new Error('actor is already set: ' + elem.data('__actor').constructor.coelementName);

            };

            elem.data('__actor', this);

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



}(jQuery));
