import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBookQuery} from '../queries/queries'


class AddBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }
    changeHandeler(e){
        this.setState({
            [e.target.name] : e.target.value 
        })
    }
    displayAuthors(){
        let data = this.props.getAuthorsQuery;

        if(data.loading){
            return <option>Loading</option>
        }else{
            
            return  data.authors.map(author=>{
                return (<option value={author.id} key={author.id}>{author.name}</option>)
            });
        }
    }
    submitForm(e){
        e.preventDefault()
       
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries: [{ query: getBookQuery }]
        })
        console.log(this.props.addBookMutation);
    }

    render(){
        
        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name='name' onChange={(e)=>this.changeHandeler(e)} value={this.state.name}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name='genre' onChange={(e)=>this.changeHandeler(e)}value={this.state.genre} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select name='authorId' onChange={(e)=>this.changeHandeler(e)} value={this.state.authorId}>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+Add</button>

            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
) (AddBook) ;