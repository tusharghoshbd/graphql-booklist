import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails'


class Booklist extends Component{

    constructor(props){
        super(props);
        this.state={
            bookId : ''
        }
    }

    displayBook(){
        
        let data = this.props.data;

        if(data.loading){
            return <div>Loading</div>
        }else{
            
            return  data.books.map(book=>{
                return (<li onClick={(e)=>{
                    return this.setState({
                        bookId: book.id
                    })
                }} key={book.id}>{book.name}</li>)
            });
        }
    }

    render(){
        
        return (
            <div>
                <h3>Book Name List</h3>
                <ul id='booklist'>
                    
                    {this.displayBook()}
                </ul>
                    <BookDetails bookId={this.state.bookId}/>
            </div>
        )
    }
}

export default graphql(getBooksQuery)(Booklist) ;