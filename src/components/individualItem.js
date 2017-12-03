import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Colors, {green600, fullWhite} from 'material-ui/styles/colors';



class item extends Component{
  constructor() {
    super()
  }

  render(){

      return(
        <div>
          <TextField
            floatingLabelFocusStyle={{color: green600}}
            underlineFocusStyle={{borderColor: green600}}
            floatingLabelText={"Nota #"+ (this.props.index + 1)}
            defaultValue={this.props.actualNote}
            id={"nota"+ this.props.index}
          />
          <TextField
            floatingLabelFocusStyle={{color: green600}}
            underlineFocusStyle={{borderColor: green600}}
            style={{marginLeft: "20px"}}
            floatingLabelText={"Porcentaje de la nota #" + (this.props.index + 1)}
            defaultValue={this.props.actualPercentage}
            id={"porcentaje"+ this.props.index}
            className={"porcentajeItem"}
          />
        </div>
      )
  }
}


export default item;
