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
var combineReducers_1 = require("../src/combineReducers");
describe('combineReducers()', function () {
    context('reducer returns received state', function () {
        it('returns initial state', function () {
            var rootReducer = (0, combineReducers_1.combineReducers)({
                foo: function (state) {
                    return state;
                },
            });
            var initialState = Immutable.fromJS({
                foo: {
                    count: 0,
                },
            });
            (0, chai_1.expect)(rootReducer(initialState, {
                type: 'ADD',
            })).to.equal(initialState);
        });
    });
    context('reducer creates new domain state', function () {
        it('returns new state', function () {
            var rootReducer = (0, combineReducers_1.combineReducers)({
                foo: function (state) {
                    return state.set('count', state.get('count') + 1);
                },
            });
            var initialState = Immutable.fromJS({
                foo: {
                    count: 0,
                },
            });
            (0, chai_1.expect)(rootReducer(initialState, {
                type: 'ADD',
            }).getIn([
                'foo',
                'count',
            ])).to.equal(1);
        });
    });
    context('root reducer is created from nested combineReducers', function () {
        it('returns initial state from default values', function () {
            var initialState = Immutable.fromJS({
                outer: {
                    inner: {
                        bar: false,
                        foo: true,
                    },
                },
            });
            var innerDefaultState = Immutable.fromJS({
                bar: false,
                foo: true,
            });
            var rootReducer = (0, combineReducers_1.combineReducers)({
                outer: (0, combineReducers_1.combineReducers)({
                    inner: function (state) {
                        if (state === void 0) { state = innerDefaultState; }
                        return state;
                    },
                }),
            });
            // eslint-disable-next-line no-undefined
            (0, chai_1.expect)(rootReducer(undefined, {})).to.eql(initialState);
        });
    });
    context('root reducer uses a custom Immutable.Iterable as default state', function () {
        it('returns initial state as instance of supplied Immutable.Record', function () {
            var defaultRecord = Immutable.Record({
                bar: {
                    prop: 1,
                },
                foo: undefined, // eslint-disable-line no-undefined
            });
            var rootReducer = (0, combineReducers_1.combineReducers)({
                bar: function (state) {
                    return state;
                },
                foo: function (state) {
                    if (state === void 0) { state = {
                        count: 0,
                    }; }
                    return state;
                },
            }, defaultRecord);
            var initialState = {
                bar: {
                    prop: 1,
                },
                foo: {
                    count: 0,
                },
            };
            // eslint-disable-next-line no-undefined
            var reducedState = rootReducer(undefined, {});
            (0, chai_1.expect)(reducedState.toJS()).to.deep.equal(initialState);
            (0, chai_1.expect)(reducedState).to.be.instanceof(defaultRecord);
        });
        it('returns initial state as instance of Immutable.OrderedMap', function () {
            var rootReducer = (0, combineReducers_1.combineReducers)({
                bar: function (state) {
                    if (state === void 0) { state = {
                        prop: 1,
                    }; }
                    return state;
                },
                foo: function (state) {
                    if (state === void 0) { state = {
                        count: 0,
                    }; }
                    return state;
                },
            }, Immutable.OrderedMap);
            var initialState = {
                bar: {
                    prop: 1,
                },
                foo: {
                    count: 0,
                },
            };
            // eslint-disable-next-line no-undefined
            var reducedState = rootReducer(undefined, {});
            (0, chai_1.expect)(reducedState.toJS()).to.deep.equal(initialState);
            (0, chai_1.expect)(reducedState).to.be.instanceof(Immutable.OrderedMap);
        });
        it('returns initial state as result of custom function call', function () {
            var getDefaultState = function () {
                return Immutable.Map({
                    bar: {
                        prop: 1,
                    },
                });
            };
            var rootReducer = (0, combineReducers_1.combineReducers)({
                bar: function (state) {
                    return state;
                },
                foo: function (state) {
                    if (state === void 0) { state = {
                        count: 0,
                    }; }
                    return state;
                },
            }, getDefaultState);
            var initialState = {
                bar: {
                    prop: 1,
                },
                foo: {
                    count: 0,
                },
            };
            // eslint-disable-next-line no-undefined
            var reducedState = rootReducer(undefined, {});
            (0, chai_1.expect)(reducedState.toJS()).to.deep.equal(initialState);
            (0, chai_1.expect)(reducedState).to.be.instanceof(Immutable.Map);
        });
    });
});
