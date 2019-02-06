import React,{Component} from 'react'

class Reset extends Component {
  state = {  }
  render() { 
    console.log(this.props.match.params.login)
    return (<div>Hello</div>  );
  }
}
 
export default Reset;