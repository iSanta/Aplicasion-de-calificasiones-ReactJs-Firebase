import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Colors, {green600, fullWhite, green900} from 'material-ui/styles/colors';
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import firebase from 'firebase';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

class logMail extends Component{
  constructor() {
    super()
    this.state={
      openRegister: false,
      completed: 0,
      registered: false,
      message: ' ',
      openSessionInit: false,
      userInfo: null
    }
    this.handleRegist = this.handleRegist.bind(this);

  }

  handleOpenSessionInit = () =>{
    this.setState({
      openSessionInit: true,

    });
  }

  handleRequestClose = () => {
    this.setState({
      registered: false,
    });
  };


  handleOpen = () => {
    this.setState({
      openRegister: true,
    });
  };

  handleClose = () => {
    this.setState({
      openRegister: false,
      openSessionInit: false,
    });
  };

  //Proseso de inicio de sesion
  handleInitSession = () => {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let uid = email.replace('.', '-');
    uid = uid.replace('.', '-');

    firebase.database().ref('users').child(uid).once('value', (snapshot) => {

      if (snapshot.exists()) {
        var userEmail = snapshot.val().email;
        var userPass = snapshot.val().passWord;
        if (userEmail === email && userPass === password) {
          const userInfo = {
            displayName: snapshot.val().displayName,
            email: userEmail,
            photoURL: snapshot.val().photoURL,
            uid: uid,
          }

          this.setState({
            userInfo: userInfo,
            openSessionInit: false,
            registered: true,
            message: 'Has iniciado sesión de forma correcta.',
          })
          this.props.loged(userInfo);
        }
        else{
          this.setState({
            registered: true,
            message: 'El correo electrónico no coincide con la contraseña en nuestra base de datos.',
          });
        }


      } else {
        this.setState({
          registered: true,
          message: 'No se ha encontrado ningún usuario registrado con tu correo electrónico.',
        });
      }



  })

  }
  //Proseso de inicio de registro
  handleRegist = () => {
    let displayName = document.getElementById('displayName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let photoUrl = "allaaa";
    var userOld = false;

    let uid = email.replace('.', '-');
    uid = uid.replace('.', '-');

    firebase.database().ref('users').child(uid).once('value', (snapshot) => {
      const thisOne = this;
      if (snapshot.exists()) {
        console.log('el usuario ya existe');
        this.setState({
          message: 'Ya existe una cuenta asociada a tu correo electrónico.',
          registered: true,
        });
      } else {

      let profilePic = document.getElementById('profilePic');
      const file = profilePic.files[0];
      const storageReft = firebase.storage().ref('/profilePics/' + uid);
      const task = storageReft.put(file);

      task.on('state_changed', (snapshot) => {
        let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        this.setState({
          completed: percentaje
        })
      }, (error) => {
        console.log('Ha ocurrido un error: ' + error.message);
      }, () => {
        console.log('Archivo subido exitosamente');
        photoUrl = task.snapshot.downloadURL

        var record = {
          displayName: displayName,
          email: email,
          passWord: password,
          photoURL: photoUrl,
          uid: uid
        }
        console.log(record);

        //Registro de la informacion

        const dbRef = firebase.database().ref('users/' + uid);
        //const newRegist = dbRef.push();
        dbRef.set(record);

        this.setState({
          openRegister: false,
          openSessionInit: true,
          registered: true,
          message: 'Te has registrado exitosamente.',
        });

      })

    }


  })
}


  render(){

    //Acciones del Dialog de iniciar Sesion
    const actionsInitSession = [
      <RaisedButton
        label="Cancelar"
        backgroundColor={green900}
        labelColor={fullWhite}
        style={{marginLeft: "10px"}}
        keyboardFocused={false}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Iniciar sesión"
        backgroundColor={green900}
        labelColor={fullWhite}
        style={{marginLeft: "10px"}}
        keyboardFocused={false}
        onClick={this.handleInitSession}
      />,
    ];
    //Acciones del Dialog de Registrarse
    const actionsregister = [
      <RaisedButton
        label="Cancelar"
        backgroundColor={green900}
        labelColor={fullWhite}
        style={{marginLeft: "10px"}}
        keyboardFocused={false}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Registrarse"
        backgroundColor={green900}
        labelColor={fullWhite}
        style={{marginLeft: "10px"}}
        keyboardFocused={false}
        onClick={this.handleRegist}
      />,
    ];
    const customContentStyle = {
      width: '30%',
      maxWidth: 'none',
    };
    const styles = {
      button: {
        margin: 12,
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    };



    return(
      <Paper>
        <div className='cout'><br/><br/>
          <span style={styles.title}>Inicie sesión con una cuenta de correo electrónico.</span>
          <br/>
          <div className='separeDiv' style={{borderRight: '1px solid #dbdbdb'}}>
          <h2>Registrarse</h2><br/>
          Si aún no estas registrado, puedes hacerlo mediante el siguiente botón.<br/><br/>
            <RaisedButton
              backgroundColor={green900}
              labelColor={fullWhite}
              style={{marginLeft: "10px"}}
              label="Registrarse"
              icon={<CommunicationVpnKey color={fullWhite} />}
              onClick={this.handleOpen}
            />


            <Dialog
              title="Nuevo Registro"
              actions={actionsregister}
              modal={false}
              open={this.state.openRegister}
              onRequestClose={this.handleClose}
              contentStyle={customContentStyle}
            >
              Registro de nuevos usuarios.<br/>
              <TextField
                id="displayName"
                floatingLabelText="Nombre completo"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
              />
              <br />
              <TextField
                id="email"
                floatingLabelText="Correo Electrónico"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
              />
              <br />
              <TextField
                id="password"
                floatingLabelText="Contraseña"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
                type="password"
              />
              <br/>
              <RaisedButton
                label="Imagen de perfil"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
              >
                <input id='profilePic' type="file" style={styles.exampleImageInput} />
              </RaisedButton>

              <LinearProgress color={green600} mode="determinate" value={this.state.completed} />
            </Dialog>


          </div>
          <div className='separeDiv'>
          <h2>Iniciar sesión</h2><br/>
          Si ya tienes una cuenta de correo electrónico, puedes iniciar por medio del siguiente botón.<br/><br/>
            <RaisedButton
              backgroundColor={green900}
              labelColor={fullWhite}
              style={{marginLeft: "10px"}}
              label="Iniciar sesión"
              icon={<CommunicationVpnKey color={fullWhite} />}
              onClick={this.handleOpenSessionInit}
            />


            <Dialog
              title="Iniciar sesión"
              actions={actionsInitSession}
              modal={false}
              open={this.state.openSessionInit}
              onRequestClose={this.handleClose}
              contentStyle={customContentStyle}
            >
              Inicia sesión por medio del siguiente formulario.<br/>
              <TextField
                id="email"
                floatingLabelText="Correo Electrónico"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
              />
              <br />
              <TextField
                id="password"
                floatingLabelText="Contraseña"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
                type="password"
              />
            </Dialog>

          </div>
        </div>


        <Snackbar
          open={this.state.registered}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </Paper>
    )
  }
}

const styles = {
  title: {
    fontSize: 20,
    color: '#3c3c3c'
  }
}


export default logMail;
