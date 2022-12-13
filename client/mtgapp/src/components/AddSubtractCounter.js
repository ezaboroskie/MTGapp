import {useState} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'

function AddSubtractCounter(props){

    const [counter , setCounter] = useState(0)

    const handleChange = (e) => {
        const value = e.target.value
        if(value.length == 0){
            return
        }
        setCounter(parseInt(value))
    }


    return(
        <>
            <input type = 'text' onChange = {handleChange}/>
            <button onClick = {() => props.onAdd(parseInt(counter))}>Add</button>
            <button onClick = {() => props.onSubtract(parseInt(counter))}>Subtract</button>
        </>
    )

}

const mapDispatchToProps = (dispatch) => {
    return{
        onAdd: (value) => dispatch(actionCreators.addCounter(value)),
        onSubtract: (value) => dispatch(actionCreators.subractCounter(value))
    }
}

export default connect(null, mapDispatchToProps)(AddSubtractCounter);