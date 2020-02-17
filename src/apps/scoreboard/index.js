import React from 'react';
import './style.css';

/**
  *2020-2-7 江村暮早期React作品
  */

//显示分数的电子屏
function ShowScore(props){
  return <div className="score">{props.score}</div>
}

function Input(props){
  return(
    <div className="mdui-textfield">
      <input className="mdui-textfield-input" type="text" defaultValue={props.default}/>
    </div>
  )
}

function Undo(props){
  if (props.used) {
    return(
      <button 
        disabled
        className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">
        撤销
      </button>
    )  
  } else {
    return(
      <button 
        onClick={()=>props.undo()}
        className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">
        撤销
      </button>
    )
  }
}

function BtnGroup(props){
  var arr = Array(Number(props.max)).fill(null);//因为传入的是string所以先转Number
  var ele = arr.map((value,i) => {
    return(
      <button 
        className="mdui-btn-raised mdui-col btn-add mdui-btn"
        key={i} 
        onClick={()=>props.onclick(i)}>
        +{i + 1}
      </button>
    )
  })
  return ele
}

function ModeSelect(props){
  return(
    <select onChange={e=>props.onChange(e.target.value)} className="mdui-m-l-6 mdui-select" mdui-select="true">
      <option value="3">篮球模式</option>
      <option value="1">足球模式</option> 
      <option value="1">乒乓球模式</option>
    </select>
  ) 
}

class Ui extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueA: 0,
      valueB: 0,
      max: 3,
      history:{
        side: null,
        value: 0,
        used: false
      }
    };
  }
  render() {   
    const valueB = this.state.valueB;
    const valueA = this.state.valueA;
    return ( 
      <center className="mdui-container mdui-row-xs-3">
        <div className="mdui-col">
          <Input default='菜虚鲲队'/>
          <ShowScore score={valueA} />
          <br></br>
          <br></br>
          <BtnGroup 
            max={this.state.max} 
            onclick={i=>{                               
              this.setState({
                history:{
                  side:'A',
                  value:valueA,
                  used:false
                },
                valueA: valueA + i + 1
              })
            }} 
          />
        </div>
        <div className="mdui-col">
          <h2>VS</h2>
        </div>
        <div className="mdui-col">
          <Input default='鸡太美队'/>        
          <ShowScore score={valueB} />
          <br></br>
          <br></br>
          <BtnGroup 
            max={this.state.max}
            onclick={i=>{
              this.setState({
                history:{
                  side:'B',
                  value:valueB,
                  used:false
                },
                valueB: valueB + i + 1
              })
            }} 
          />  
        </div> 
        <div className="mdui-clearfix"></div>
        <br></br>
        <div className="mdui-row-xs-3">
          <div className="mdui-col">
           <button onClick={()=>this.setState({valueA: valueB,valueB:valueA})} className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">交换</button>
          </div>
          <div className="mdui-col">
            <button onClick={()=>this.setState({valueA: 0,valueB:0})} className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">重置</button>
          </div>
          <div className="mdui-col">
            <Undo
              used={this.state.history.used}
              undo={e=>{
                if (this.state.history.side === 'A') {
                  this.setState({
                    history: {
                      used: true,
                      value:this.state.history.value,
                      side:this.state.history.side
                    },
                    valueA: this.state.history.value
                  })
                }else{
                  this.setState({
                    history: {
                      used: true,
                      value:this.state.history.value,
                      side:this.state.history.side
                    },
                    valueB: this.state.history.value
                  })
                }
              }}
            />
          </div>
        </div>
        <br></br>
        <ModeSelect 
          onChange={e => {
            this.setState({
              max: e
            })
          }} 
        />
      </center>
    )
  }
}

export default ()=><Ui />;