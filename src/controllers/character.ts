import { AnimatedSprite, Container } from "pixi.js";

export type CharacterStateNames = 'idle'

export type CharacterState = {
    state: CharacterStateNames,
    sprite: AnimatedSprite
};

/**
 * Basic state controlled container to be extend with behaviour logic
 * Manages its own internal state as well as animated sprites that correspond with them
 */
export class Character extends Container{

    states: CharacterState[] = [];
    currentState?: string;
    
    /**
     * Instantiate the character. Will automatically add its active sprite as a child to the parent context if possible
     * @param parent 
     */
    constructor(parent?: Container, initialStates?: CharacterState[], startingState?: CharacterStateNames){
        super();

        if(initialStates){ this.states = initialStates };
        if(startingState){ this.currentState = startingState };

        //Instantiate our initial state if applicable
        if(initialStates && startingState){
            //Check we actually have a matching state for the startingState
            const state = this.getStateByName(startingState);
            if(!state){
                throw new Error(`Starting State ${startingState} was not found in initial states.`);
            }else{
                this.setCurrentState(startingState);
            }
        }

        //Connect ourself to our parent if applicable
        if(parent){ 
            this.setParent(parent);
            this.parent.addChild(this);
        };
    }

    /**
     * Fetches the state you want out of the state list by name
     * @param stateName The state name we are looking for
     * @returns The first state with matching name
     */
    getStateByName(stateName: string): CharacterState|undefined{
        return this.states.find(e => e.state === stateName);
    }

    /**
     * Removes the current state sprite and applies the new one instead
     * @param stateName The state we want to set the Character to, will throw an error if missing
     */
    setCurrentState(stateName: string){
        const state = this.getStateByName(stateName);
        if(!state){
            throw new Error(`${this.name} tried to set state to ${stateName} but could not find it in state list`);
        }
        //Check if we had a prior state and remove it
        if(this.currentState){
            const currentChild = this.getChildByName(this.currentState);
            currentChild.destroy();
        }
        //Add the new state sprite to ourself
        this.currentState = stateName;
        state.sprite.name = state.state; //Ensure the name matches so we can find the child later
        this.addChild(state.sprite);
    }
}