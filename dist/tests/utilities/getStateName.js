"use strict";
/* eslint-disable max-nested-callbacks */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var getStateName_1 = require("../../src/utilities/getStateName");
describe('utilities', function () {
    describe('getStateName()', function () {
        context('action.type is @@redux/INIT', function () {
            it('describes initialState', function () {
                var expectedStateName = (0, getStateName_1.getStateName)({
                    type: '@@redux/INIT',
                });
                (0, chai_1.expect)(expectedStateName).to.equal('initialState argument passed to createStore');
            });
        });
        context('action.type is anything else', function () {
            it('describes previous state', function () {
                var expectedStateName = (0, getStateName_1.getStateName)({});
                (0, chai_1.expect)(expectedStateName).to.equal('previous state received by the reducer');
            });
        });
    });
});
