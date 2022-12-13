import {connect} from 'react-redux'


function DisplayCounter(props){
    return(
        <>
            <h1>{props.ctr}</h1>
        </>
    )
}

const mapStateToProps = (state)=>{
    return{
        ctr:state.count
    }
}

export default connect(mapStateToProps)(DisplayCounter);