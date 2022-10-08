import { Component } from "react";
import Quiz from "./quiz";
import Question from "./question";
import { Routes,Route } from "react-router-dom";

export default class App extends Component{
    constructor(props){
        super()
        this.state={
            id:null,
            data:null,
            category:"all",
            difficulty:"medium"
        }
    }

    handleFilter=(category)=>{
        this.setState({
            category:category
        })
        }
        
        handle=(event)=>{
            this.setState({
                difficulty:event.target.value
            })
        }
        handleId=(id)=>{
this.setState({
    id:id
})
        }

        componentDidMount() {
            fetch(
              `https://opentdb.com/api_category.php`
            )
              .then((res) => res.json())
              .then((data) =>
                this.setState({
                  data: data.trivia_categories
                  ,
                })
              );
          }
        
          componentDidUpdate(prevProps,prevState){
        if(prevState.category!==this.state.category){
            fetch(
                `https://opentdb.com/api_category.php`
              )
                .then((res) => res.json())
                .then((data) =>
                  this.setState({
                    data: this.state.category==="all"?data.trivia_categories:data.trivia_categories.filter(elm=> elm.name.includes(this.state.category))
                    ,
                  })
                );
        }
          }
    render(){
        return(
        <>
        <Routes>
            <Route path="/" element={<Quiz handleFilter={this.handleFilter} handleId={this.handleId} difficulty={this.props.difficulty}  handle={this.handle} data={this.state.data}/>}></Route>
            <Route path="/quiz" element={<Question difficulty={this.state.difficulty} category={this.state.id}  />}></Route>
        </Routes>
        </>
    )}
}