import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Colors, {green600, green900, fullWhite, transparent} from 'material-ui/styles/colors';
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';


class sessionInit extends Component{
  render(){
    return(
      <div className='menuContainer'>
        <Paper style={{backgroundColor: transparent}}>
          <p className='menuText'>No estas logueado. Inicia sesion:
            <RaisedButton
              onClick={this.props.onClicked}
              backgroundColor={green900}
              labelColor={fullWhite}
              style={{marginLeft: "10px"}}
              label="Cuenta de Google"
              icon={<CommunicationVpnKey color={fullWhite} />}
            />
            <RaisedButton
              onClick={this.props.logMail}
              backgroundColor={green900}
              labelColor={fullWhite}
              style={{marginLeft: "10px"}}
              label="Correo Electronico"
              icon={<CommunicationVpnKey color={fullWhite} />}
            />

          </p>
        </Paper>
      </div>
    )
  }
}

export default sessionInit;
