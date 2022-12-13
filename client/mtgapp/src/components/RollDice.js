import React,{Component} from 'react'
import Die from '../components/Die'
import '../styles/RollDice.css'
import Home from '../components/Home'

class RollDice extends Component{
    static defaultProps = {
        sides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]
    }


    constructor(props){
        super(props)
        this.state={
            die1:'',
            rolling: false
        }
        this.roll = this.roll.bind(this)
    }

    roll(){
        const {sides} = this.props
        this.setState({
            die1 : sides[Math.floor(Math.random() * sides.length)],
            rolling:true
        })
        setTimeout(() => {
            this.setState({rolling:false})
        },1000)
        }
    
    render(){
        const handleBtn = this.state.rolling ? 
        'RollDice-rolling' : ''
        const {die1,rolling} = this.state
        return(
            <>
            
            <div className = 'RollDice'>
                <div className = 'RollDice-container'>
                    <Die face = {die1} rolling ={rolling}/>      
                </div>
                <h1 className='DisplayNumber'>{die1}</h1>
                <button className = {handleBtn}
                    disabled= {this.state.rolling}
                    onClick = {this.roll}>
                    {this.state.rolling ? 'Rolling' : 'Roll Dice!'}
                </button>
                <Home/>
            </div>
           
            
        
           </>
            
           
            
        
        )
    }
}

export default RollDice
