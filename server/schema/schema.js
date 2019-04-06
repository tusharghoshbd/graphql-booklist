const graphql = require('graphql');
const Book = require('./../models/book');
const Author = require('./../models/author');

const _ = require('lodash')

const {
    buildSchema,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList   

} = graphql;




const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id:{ type: GraphQLID },
        name:{ type: GraphQLString},
        genre:{ type: GraphQLString},
        authorId:{ type: GraphQLID},
        author:{ 
            type: AuthorType,
            resolve(parent, args){
                //return Author.find({ id: parent.authorId})
                //return Author.findById(parent.authorId);
                return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id:{ type: GraphQLID },
        name:{ type: GraphQLString},
        age:{ type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({ authorId: parent.id });
            }
        },
        // age:{
        //     type: GraphQLString,
        //     resolve(parent, args){
        //         console.log(parent);
        //         console.log(args);
        //         return "string";
        //     }
        // }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: { id:{ type: GraphQLID } },
            resolve(parent, args){
                return Book.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
               return Book.find({});
            }
        },
        author:{
            type: AuthorType,
            args:{ id:{ type: GraphQLID  }},
            resolve(parent, args){
                console.log("----------------")
                console.log(parent);
                console.log(args);
                return Author.findById(args.id);
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            args:{ id:{ type: GraphQLID  }},
            resolve(parent, args){
                return Author.find({});
            }
        },
        hello:{
            type: GraphQLString,
            resolve(){
                return 'Hello World'
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addBook:{
            type: BookType,
            args:{
                name: { type: GraphQLString},
                genre: { type: GraphQLString},
                authorId: { type: GraphQLID }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
                
            }
        },
        deleteBook:{
            type: BookType,
            args:{
                id: { type: GraphQLID}
            },
            resolve(parent, args){
                return Book.remove({ id: args.id });                
            }
        },
        addAuthor:{
            type: AuthorType,
            args:{
                name: { type: GraphQLString},
                age: { type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
                
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
