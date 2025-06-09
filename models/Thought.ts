

import { Schema, model, Types, Document } from 'mongoose';
import { format } from 'date-fns';

// Reaction subdocument schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: any) => format(timestamp, 'MMM d, yyyy h:mm a'),
    },
  },
  {
    _id: false,
    toJSON: {
      getters: true,
    },
  }
);

// Interface for the main Thought document
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof ReactionSchema[];
}

const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => format(timestamp, 'MMM d, yyyy h:mm a'),
    } as any,
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual for number of reactions
ThoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', ThoughtSchema);
export default Thought;