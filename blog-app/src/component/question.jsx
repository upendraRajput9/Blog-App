import { Component } from "react";
export default class Question extends Component{
    constructor(props){
        super()
        this.state={
data:null,
quesCount: 0,
error:true,
correct:0
        }
    }
    
    handleRetake=()=>{
        let {data} = this.state
        this.setState({
            quesCount:0,
            data:data.map(elm=>{
                elm["chooseAns"]=[]
        return elm
            })
        })
        localStorage.setItem("ques",JSON.stringify(this.state.data))
localStorage.setItem("count",JSON.stringify(0))
       }

    handleSubmit= async (ans,index)=>{
     await   this.setState((prevState)=>{
return {
    error:true,
    data:prevState.data.map((elm,i)=>{
        if(i===index){
      elm["chooseAns"]= elm["chooseAns"].includes(ans)?elm.chooseAns.filter(elm=>elm!==ans) :elm["chooseAns"].concat(ans)
        }
return elm
    })
}   
        })
        localStorage.setItem("ques",JSON.stringify(this.state.data))
    }
    
    componentDidMount(){
        let {category,difficulty}=this.props
      category!==null?fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`)
        .then(res=>res.json())
        .then(data=>{
this.setState({
    quesCount:0,
    data:data.results.map(elm=>{
        elm["answers"]=elm.incorrect_answers.concat(elm.correct_answer)
        elm["answers"]=elm.answers.sort()
        elm["chooseAns"]=[]
return elm
    })
})
localStorage.setItem("ques",JSON.stringify(this.state.data))
localStorage.setItem("count",JSON.stringify(0))
        })
       
        :this.setState({
            data:JSON.parse(localStorage.getItem('ques')),
            quesCount:JSON.parse(localStorage.getItem('count'))
            })
    }

    handleNext= async ()=>{
        let {quesCount ,data} = this.state
        let count= data[quesCount].chooseAns.length
     await   count>0?this.setState((prevState)=>({quesCount:prevState.quesCount+1,
    })):this.setState({error:false})
        localStorage.setItem("count",JSON.stringify(this.state.quesCount))
    }
    handleResult=()=>{
        let {data} = this.state
        let count=0
        data.forEach(elm => {
            if(elm.correct_answer===elm.chooseAns.join("")){
                count++
            }
        });
        return count
    }
    render(){
        let {quesCount ,data} = this.state
    return(
        <>{
           
        quesCount<10?
        <main className="ques-container">
        <section>
        <h3>Question {this.state.quesCount+1}/10</h3>
             <div className="big-div">
                <div className="small-div" style={{width:`${(this.state.quesCount+1)*10}%`}}></div>
             </div>
        </section>
        <section>
       <p>{this.state.data?this.state.data[quesCount].question:""}</p>
       <ul>
      {( this.state.data?this.state.data[quesCount].answers:[]).map((elm)=>
        <li className={data[quesCount].chooseAns.includes(elm)?"ticked":"ans"} onClick={()=>this.handleSubmit(elm,quesCount)} key={elm}>{data[quesCount].chooseAns.includes(elm)?<i class="fa-solid fa-circle-check"></i>:""}  {elm}</li>
        )}
        </ul>
       <h4 className={this.state.error?"active":""}>Select an answer to go forward!</h4>
        <button onClick={()=>this.handleNext()}>Next</button>
        </section>
        </main>
        :
        <section className="container table">
            <div>
            <h3>Result of the quiz.</h3>
            <button onClick={()=>this.handleRetake()}>Retake the quiz!</button>
            </div>
           
        <table>
        <tr>
    <th>Question</th>
    <th>Correct Answers</th>
    <th>You Selected</th>
    <th>Right Or Wrong</th>
  </tr>
{
    data.map(elm=>{
 return <tr>
    <td className="ques-col">{elm.question}</td>
    <td>{elm.correct_answer}</td>
    <td>
        {
        elm.chooseAns.map(ch=> <p key={ch}>{ch}</p> )
        }
        </td>
    <td className="sign-col">{elm.correct_answer===elm.chooseAns.join("")?<i style={{color:"rgb(98,179,133)"}} className="fa-regular fa-circle-check"></i>:<i style={{color:"rgb(229,62,62)"}} className="fa-regular fa-circle-xmark"></i> }</td>
  </tr>
    })
  }
  
    <tfoot>
    <td colspan = "2">Total Correct</td>
        <td className="correct" colspan = "2">{this.handleResult()}</td>
    </tfoot>
  
        </table>
        
         </section>
        }
       
        </>
    )
    }
}