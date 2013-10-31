/* global describe, expect, it*/

var D = require('../dual');

describe('easyAttributes', function() {

    it('should work (smoke test)', function() {
        var W = D.Widget.extend({
            ATTRS: {
                kind : {
                    cssClass : {
                        1: 'kind-one',
                        2: 'kind-two'
                    }
                }
            },
            initStructure : function () {
                this.$ = D.fromJSON([
                    'div', {class:'test'}
                ]);
            }
        });

        var w = new W();
        w.setKind(1);
        w.stringify().should.equal('<div class="test kind-one"></div>');
        w.setKind(2);
        w.stringify().should.equal('<div class="test kind-two"></div>');
    });


});