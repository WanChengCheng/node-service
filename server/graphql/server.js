/*
 * File: server.js
 * File Created: Thursday, 8th November 2018 12:12:30 am
 * Author: ChegCheng Wan (chengcheng.st@gmail.com)
 */

import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';
// import logger from '../utils/logger';
// Construct a schema, using GraphQL schema language

const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    return Array(numRolls)
      .fill()
      .map(() => this.rollOnce());
  }
}

// The root provides the top-level API endpoints
const root = {
  getDie({ numSides }) {
    return new RandomDie(numSides || 6);
  },
};

const service = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
});

export default service;
