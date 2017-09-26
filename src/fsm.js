class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (typeof config == 'undefined') {
            throw new Error();
        }
        this.config = config;
        this.activeState = config.initial;
        this.stateStack = [];
        this.redoStack = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (typeof this.config.states[state] == 'undefined') {
            throw new Error();
        }
        this.stateStack.push(this.activeState);
        this.activeState = state;
        this.redoStack = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var nextState = this.config.states[this.activeState].transitions[event];
        if (typeof nextState == 'undefined') {
            throw new Error();
        }
        this.changeState(nextState);
        this.redoStack = [];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.stateStack = [];
        this.activeState = this.config.initial;
        this.redoStack = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (typeof event == 'undefined') {
            var states = [];
            for (var state in this.config.states) {
                states.push(state);
            }
            return states;
        }
        var returnStates = [];
        for (var state in this.config.states) {
            if (typeof this.config.states[state].transitions[event] != 'undefined') {
                returnStates.push(state);
            }
        }
        return returnStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        var previousState = this.stateStack.pop();
        if (typeof previousState == 'undefined') {
            return false;
        }
        this.redoStack.push(this.activeState);
        this.activeState = previousState;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        var redoState = this.redoStack.pop();
        if (typeof redoState == 'undefined') {
            return false;
        }
        this.stateStack.push(this.activeState);
        this.activeState = redoState;

        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stateStack = [];
        this.redoStack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
