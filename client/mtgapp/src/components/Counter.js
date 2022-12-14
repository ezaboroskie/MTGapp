import IncrementDecrementCounter from "./IncrementDecrementCounter"
import AddSubtractCounter from "./AddSubtractCounter"
import DisplayCounter from "./DisplayCounter"
import Home from "./Home"
import '../styles/Counter.css'

function Counter(){

return(
  <>
    <div className="counter-container">
    <IncrementDecrementCounter/>
    <DisplayCounter/>
    <AddSubtractCounter/>
    </div>

  </>
)

}

export default Counter