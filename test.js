


(function () {
    'use strict';

    var Actor = $.CC.Actor;
    var Role = $.CC.Role;

    describe('$.CC.defineActor', function () {

        it('defines an actor of the given name', function (done) {

            $.CC.defineActor('actor0', function (pt) {

                pt.answer = function () {
                    return 42;
                };

            });

            var $dom = $('<div class="actor0" />').appendTo(document.body);

            $(document).trigger('init-class.actor0');

            setTimeout(function () {

                expect($dom.getActor()).to.exist;
                expect($dom.getActor()).to.be.instanceof(Actor);
                expect($dom.getActor().answer()).to.equal(42);

                done();

            }, 50);

        });


        it('returns the defining class of the actor', function () {

            var Actor0 = $.CC.defineActor(null, function (pt) {

                pt.answer = function () {
                    return 42;
                };

            });

            var actor = new Actor0($('<div />'));

            expect(actor).to.be.instanceof(Actor);
            expect(actor.answer()).to.equal(42);

        });

    });

    describe('$.CC.defineRole', function () {

        it('defines a role of the given name', function (done) {

            $.CC.defineRole('role0', function (pt) {

                pt.foo = function () { return 'bar'; };

            });

            var $dom = $('<div class="role0" />').appendTo(document.body);

            $(document).trigger('init-class.role0');

            setTimeout(function () {

                expect($dom.getRole('role0')).to.exist;
                expect($dom.getRole('role0')).to.be.instanceof(Role);
                expect($dom.getRole('role0').foo()).to.equal('bar');

                done()

            });

        });


        it('throws error when the given name is not a string', function () {

            expect(function () {

                $.CC.defineRole(123, function () {});

            }).to.throw(Error);

        });


        it('returns the defining class of the role', function () {

            var Role0 = $.CC.defineRole(null, function (pt) {

                pt.answer = function () {
                    return 42;
                };

            });

            var role = new Role0($('<div />'));

            expect(role).to.be.instanceof(Role);
            expect(role.answer()).to.equal(42);

        });

    });

    describe('$.fn.getActor', function () {

        it('gets the actor on the element', function () {

            var actor = {};

            var $dom = $('<div />').data('__actor', actor);;

            expect($dom.getActor()).to.equal(actor);

        });

    });

    describe('$.fn.getRole', function () {

        it('gets the actor of the given name on the element', function () {

            var role = {};

            var $dom = $('<div />').data('__role:abc', role);;

            expect($dom.getRole('abc')).to.equal(role);
            expect($dom.getRole('def')).to.not.exist;

        });

    });


    describe('$.CC.assign', function () {

        it('assign class implemntation as class component', function () {

            // TODO: assert

        });

    });

}());
