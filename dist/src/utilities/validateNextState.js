"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNextState = void 0;
var validateNextState = function (nextState, reducerName, action) {
    if (nextState === undefined) {
        throw new Error('Reducer "' + reducerName + '" returned undefined when handling "' + action.type + '" action. To ignore an action, you must explicitly return the previous state.');
    }
};
exports.validateNextState = validateNextState;
