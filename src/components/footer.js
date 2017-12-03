import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Colors, {green600, fullWhite} from 'material-ui/styles/colors';
class footer extends Component {
  render(){
    return(
      <footer className='footer'>
        <div className='menuContainer'>
          <Paper style={{backgroundColor: green600, color: fullWhite}}>
            Humilde aplicación realizada por Juan Carlos Santa Abreu
          </Paper>
        </div>
      </footer>
    )
  }
}


export default footer;
