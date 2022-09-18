import { Component } from "react";
import { NavLink } from "react-router-dom";

export default class QuizBlock extends Component{
    constructor(props){
        super()
    }

    render(){
        let {id,name}=this.props
        return(
            <>
            <article>
                <h2>{name}</h2>
                <div>
            <button  onClick={()=>this.props.handleId(id)}>
                <NavLink to="/quiz">Take This Quiz</NavLink>
            </button>
            </div>
            </article>

            </>
        )
    }
}