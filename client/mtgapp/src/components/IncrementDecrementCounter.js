import {connect} from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'


function IncrementDecrementCounter(props){


    return(
        <>
            <button onClick = {props.onIncrement}>+1</button>
            <button onClick = {props.onDecrement}>-1</button>
        </>
    )

}    

    const mapStateToProps = (state)=>{
        return{
            ctr:state.count
        }
    }

    const mapDispatchToProps = (dispatch)=>{
        return{
        
            onIncrement: ()=>dispatch(actionCreators.incrementCounter()),  
            onDecrement: ()=>dispatch(actionCreators.decrementCounter())

        }   
    }

export default connect(mapStateToProps, mapDispatchToProps)(IncrementDecrementCounter);