


(function () {
    'use strict';

    var Actor = $.cc.Actor;

    describe('$.fn.getActor', function () {

        it('gets the actor on the element', function () {

            var actor = {};

            var $dom = $('<div />').data('__actor', actor);;

            expect($dom.getActor()).to.equal(actor);

        });

    });

    describe('$.cc.assign', function () {

        it('assign class implemntation as class component', function () {

            // TODO: assert

        });

    });

}());
