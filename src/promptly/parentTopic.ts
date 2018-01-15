import { Topic } from './topic';

export interface ActiveTopicState {
    name: string;
    // State must by any (vs. generic) becuase child topic state will vary amoung all the possible active topics
    //  for a ParentTopic.
    state?: any;
}

export interface ParentTopicState {
    activeTopic?: ActiveTopicState;
}

export abstract class ParentTopic<S extends ParentTopicState> extends Topic<S> {

    private _subTopics: any;
    protected set subTopics(subTopics: any) {
        this._subTopics = subTopics;
    }
    protected get subTopics(): any {
        return this._subTopics;
    }

    private _activeTopic: Topic;
    public get activeTopic(): Topic {
        // If there is no active topic state, there is no active child topic being managed.
        if(!this.state.activeTopic) {
            return undefined;
        } 
        
        // If there is an active child topic object reference, return that.
        if(this._activeTopic) {
            return this._activeTopic;
        }

        this._activeTopic = this.subTopics[this.state.activeTopic.name];
        this._activeTopic.state = this.state.activeTopic.state;

        return this._activeTopic;
    }

    public set activeTopic(childTopic: Topic) {
        this._activeTopic = childTopic;

        const subTopicName = Object.keys(this.subTopics).find((e) => { return this.subTopics[e] === childTopic});
        
        this.state.activeTopic = { name: subTopicName, state: childTopic.state } as ActiveTopicState;
    }

    public get hasActiveTopic(): boolean {
        return this.state.activeTopic !== undefined;
    }
}