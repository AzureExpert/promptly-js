"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_1 = require("./topic");
// TopicsRoot - A specialized ConversationTopic used to anchor a Topics based conversation model
//  in state.
class TopicsRoot extends topic_1.Topic {
    constructor(context) {
        if (!context.state.conversation.topicsRoot) {
            // Initialize root ConversationTopic state and persist it to conversatin state
            //  to establish the root of all state in the model.
            context.state.conversation.topicsRoot = {
                state: { activeTopic: undefined }
            };
        }
        // Note: This is a subtle, but powerful, aspect of the library. By rooting the TopicsRoot
        //  state in conversation state this way and using that state by reference to all 
        //  subsequent Topics, each Topic's state is persisted automatically (without having to write
        //  state management code).
        super(context.state.conversation.topicsRoot.state);
    }
}
exports.TopicsRoot = TopicsRoot;
//# sourceMappingURL=topicsRoot.js.map