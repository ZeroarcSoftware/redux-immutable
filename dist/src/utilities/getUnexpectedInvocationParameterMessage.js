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
exports.getUnexpectedInvocationParameterMessage = void 0;
var Immutable = __importStar(require("immutable"));
var getStateName_1 = require("./getStateName");
var getUnexpectedInvocationParameterMessage = function (state, reducers, action) {
    var reducerNames = Object.keys(reducers);
    if (!reducerNames.length) {
        return 'Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.';
    }
    var stateName = (0, getStateName_1.getStateName)(action);
    if (!Immutable.isCollection(state)) {
        return 'The ' + stateName + ' is of unexpected type. Expected argument to be an instance of Immutable.Collection or Immutable.Record with the following properties: "' + reducerNames.join('", "') + '".';
    }
    var unexpectedStatePropertyNames = state.toSeq().keySeq().toArray().filter(function (name) {
        return !reducers.hasOwnProperty(name);
    });
    if (unexpectedStatePropertyNames.length > 0) {
        return 'Unexpected ' + (unexpectedStatePropertyNames.length === 1 ? 'property' : 'properties') + ' "' + unexpectedStatePropertyNames.join('", "') + '" found in ' + stateName + '. Expected to find one of the known reducer property names instead: "' + reducerNames.join('", "') + '". Unexpected properties will be ignored.';
    }
    return null;
};
exports.getUnexpectedInvocationParameterMessage = getUnexpectedInvocationParameterMessage;
