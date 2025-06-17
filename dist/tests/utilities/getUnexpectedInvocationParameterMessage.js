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
var getUnexpectedInvocationParameterMessage_1 = require("../../src/utilities/getUnexpectedInvocationParameterMessage");
describe('utilities', function () {
    describe('getUnexpectedInvocationParameterMessage()', function () {
        var validAction;
        var validReducers;
        var validState;
        beforeEach(function () {
            validState = Immutable.Map();
            validReducers = {
                foo: function () { },
            };
            validAction = {
                type: '@@redux/INIT',
            };
        });
        context('store does not have a valid reducer', function () {
            it('returns an error', function () {
                var expectedErrorMessage = (0, getUnexpectedInvocationParameterMessage_1.getUnexpectedInvocationParameterMessage)(validState, {}, validAction);
                (0, chai_1.expect)(expectedErrorMessage).to.equal('Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.');
            });
        });
        context('state is not an instance of Immutable.Collection or Immutable.Record', function () {
            it('returns error', function () {
                var expectedErrorMessage = (0, getUnexpectedInvocationParameterMessage_1.getUnexpectedInvocationParameterMessage)({}, validReducers, validAction);
                (0, chai_1.expect)(expectedErrorMessage).to.equal('The initialState argument passed to createStore is of unexpected type. Expected argument to be an instance of Immutable.Collection or Immutable.Record with the following properties: "foo".');
            });
        });
        context('state defines properties that are not present in the reducer map', function () {
            it('returns error', function () {
                var expectedErrorMessage = (0, getUnexpectedInvocationParameterMessage_1.getUnexpectedInvocationParameterMessage)(Immutable.Map({
                    bar: 'BAR',
                }), validReducers, validAction);
                (0, chai_1.expect)(expectedErrorMessage).to.equal('Unexpected property "bar" found in initialState argument passed to createStore. Expected to find one of the known reducer property names instead: "foo". Unexpected properties will be ignored.');
            });
        });
        context('valid', function () {
            it('returns null', function () {
                var expectedErrorMessage = (0, getUnexpectedInvocationParameterMessage_1.getUnexpectedInvocationParameterMessage)(validState, validReducers, validAction);
                (0, chai_1.expect)(expectedErrorMessage).to.equal(null);
            });
        });
    });
});
