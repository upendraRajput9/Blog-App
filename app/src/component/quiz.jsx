import React,{Component} from "react";
import QuizBlock from "./quizBlock";
import { Route, Routes, NavLink } from 'react-router-dom';


export default class Quiz extends Component{
constructor(props){
    super()
}


render(){
  let {data} = this.props
return(<main className="container">
    <header>
    <h1>QUIZ APP</h1>
    </header>
    <section className="quiz-btn">
      
        <ul>
        <li onClick={()=>this.props.handleFilter("all")}>ALL</li>
            <li className="all" onClick={()=>this.props.handleFilter("Science")}>Science</li>
            <li className="all" onClick={()=>this.props.handleFilter("Entertainment")}>Entertainment</li>
            <li onClick={()=>this.props.handleFilter("Mythology")}>Mythology</li>
            <li onClick={()=>this.props.handleFilter("Sports")}>Sports</li>
            <li onClick={()=>this.props.handleFilter("Geography")}>Geography</li>
            <li onClick={()=>this.props.handleFilter("General Knowledge")}>General Knowledge</li>
            <li onClick={()=>this.props.handleFilter("Vehicles")}>Vehicles</li>
            <li onClick={()=>this.props.handleFilter("Celebrities")}>Celebrities</li>
            <li onClick={()=>this.props.handleFilter("Politics")}>Politics</li>
            <li onClick={()=>this.props.handleFilter("Art")}>Art</li>
            <li onClick={()=>this.props.handleFilter("History")}>History</li>
            <li onClick={()=>this.props.handleFilter("Animals")}>Animals</li>
        </ul>
    </section>
    <section className="select-box">
        <h2>Quiz Level :</h2>
    <select name="difficulty" defaultValue={this.props.difficulty} onChange={this.props.handle}>
            <option value="easy">Easy</option>
            <option value="medium">Meduim</option>
            <option value="hard">Hard</option>
        </select>
        </section>
    <section className="quizs">
    {
    data?data.map(elm=><QuizBlock key={elm.id} difficulty={this.props.difficulty} handleId={this.props.handleId}  {...elm}/>):<h1>loding</h1>
    }
    </section>
    </main>
)
}
}