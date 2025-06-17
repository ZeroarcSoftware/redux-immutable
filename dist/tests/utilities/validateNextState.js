"use strict";
/* eslint-disable max-nested-callbacks */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Immutable = __importStar(require("immutable"));
var validateNextState_1 = require("../../src/utilities/validateNextState");
describe('utilities', function () {
    describe('validateNextState()', function () {
        context('state is undefined', function () {
            it('throws an error', function () {
                (0, chai_1.expect)(function () {
                    // eslint-disable-next-line no-undefined
                    (0, validateNextState_1.validateNextState)(undefined, 'reducer name', {
                        type: 'foo',
                    });
                }).to.throw(Error, 'Reducer "reducer name" returned undefined when handling "foo" action. To ignore an action, you must explicitly return the previous state.');
            });
        });
        context('state is defined', function () {
            it('returns undefined', function () {
                var result = (0, validateNextState_1.validateNextState)(Immutable.Map(), 'reducer name', {
                    type: 'foo',
                });
                // eslint-disable-next-line no-undefined
                (0, chai_1.expect)(result).to.equal(undefined);
            });
        });
    });
});
