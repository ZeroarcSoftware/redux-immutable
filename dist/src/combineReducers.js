"use strict";
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
exports.combineReducers = void 0;
var Immutable = __importStar(require("immutable"));
var utilities_1 = require("./utilities");
var combineReducers = function (reducers, getDefaultState) {
    if (getDefaultState === void 0) { getDefaultState = Immutable.Map; }
    var reducerKeys = Object.keys(reducers);
    return function (inputState, action) {
        if (inputState === void 0) { inputState = getDefaultState(); }
        // eslint-disable-next-line no-process-env
        if (process.env.NODE_ENV !== 'production') {
            var warningMessage = (0, utilities_1.getUnexpectedInvocationParameterMessage)(inputState, reducers, action);
            if (warningMessage) {
                // eslint-disable-next-line no-console
                console.error(warningMessage);
            }
        }
        return inputState
            .withMutations(function (temporaryState) {
            for (var _i = 0, reducerKeys_1 = reducerKeys; _i < reducerKeys_1.length; _i++) {
                var reducerName = reducerKeys_1[_i];
                var reducer = reducers[reducerName];
                var currentDomainState = temporaryState.get(reducerName);
                var nextDomainState = reducer(currentDomainState, action);
                (0, utilities_1.validateNextState)(nextDomainState, reducerName, action);
                temporaryState.set(reducerName, nextDomainState);
            }
        });
    };
};
exports.combineReducers = combineReducers;
