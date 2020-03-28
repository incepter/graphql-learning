const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const Book = require('../models/Book');
const Author = require('../models/Author');

const BookType = new GraphQLObjectType({
  name: 'book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return authors.find(t => t.id === parent.id);
        return Author.findById(parent.authorId);
      }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books.filter(t => t.authorId === parent.id)
        return Book.find({
          authorId: parent.id,
        })
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        // return authors;
        return Author.find({});
      }
    },
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return books.find(t => t.id === args.id);
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return authors.find(t => t.id === args.id);
        return Author.findById(args.id);
      }
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parent, {name, age}) {
        const author = new Author({
          name,
          age,
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID},
      },
      resolve(parent, {name, genre, authorId}) {
        const book = new Book({
          name,
          genre,
          authorId,
        });
        return book.save();
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
