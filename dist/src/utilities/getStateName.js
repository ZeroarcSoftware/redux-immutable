"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateName = void 0;
var getStateName = function (action) {
    return action && action.type === '@@redux/INIT' ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
};
exports.getStateName = getStateName;
