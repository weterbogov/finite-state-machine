class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (typeof config == 'undefined') {
            throw Error;
        }
        this.config = config;
        this.activeState = config.initial;
        this.stateStack = [];
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
        this.stateStack.push(activeState);
        this.activeState = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) { }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.stateStack = [];
        this.activeState = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (typeof event == 'undefined') {
            return this.config.states;
        }
        var returnStates = [];
        for (var state in this.config.states) {
            for (var tempEvent in state.transitions) {
                if (event == tempEvent) {
                    returnStates.push(state);
                }
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
        return (typeof previousState == 'undefined') ? false : previousState;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() { }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stateStack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
