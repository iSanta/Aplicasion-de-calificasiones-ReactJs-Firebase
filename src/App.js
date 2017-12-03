import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu';
import SessionInit from './components/sessionInit';
import firebase from 'firebase';
import logo from './img/logo.png';
import SessionInfo from './components/sessionInfo';
import HomeContent from './components/homeContent';
import NotesContent from './components/notesContent';
import NewAsignature from './components/newAsignature';
import UpdateContent from './components/updateContent';
import Footer from './components/footer';

//----------------------------Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Colors, {green600, green900, fullWhite, transparent} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';





class App extends Component {
  constructor(){
    super();
    this.state={
      user: null,
      actualPage: 0
    };
    this.loadMenu = this.loadMenu.bind(this);
    this.menuChange = this.menuChange.bind(this);
    this.close = this.close.bind(this);
    this.loggin = this.loggin.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount(){

    // onAuthStateChanged sirve para llevar el sistema de sessions, ciando nos loguamos obtiene informacion, cuando nos desloguamos pasa a null
    firebase.auth().onAuthStateChanged(user =>{
      //actualiza el state con los parametros enviados por Google Firebase
      var thisHere = this;
      this.setState({
        user: user
      })

      var userId = this.state.user.uid;

      //compara si dentro de 'users' existe un elemento identificado con ul user id de google
      firebase.database().ref('users').child(userId).once('value', function(snapshot) {
        if (snapshot.exists()) {
            console.log("user exist");
        } else {
            console.log("user don't exist");

            //registro del usuario que no exite
            const record ={
                photoURL: thisHere.state.user.photoURL,
                displayName: thisHere.state.user.displayName,
                email: thisHere.state.user.email,
                phoneNumber: thisHere.state.user.phoneNumber,
                uid: thisHere.state.user.uid
            };


            const dbRef = firebase.database().ref('users/'+userId);
            //const newUser = dbRef.push(userId);
            dbRef.set(record);
        }
      });







    })
  }

  loadContent(){
    switch (this.state.actualPage) {
      case 0:
        return(
          <HomeContent />
        );
        break;

      case 1:
        return(
          <NotesContent userId={this.state.user.uid} />
        );
        break;
      case 2:
        return(
          <NewAsignature userId={this.state.user.uid} />
        );
        break;
      case 3:
        return(
          <UpdateContent userId={this.state.user.uid} />
        );
        break;

      default:
        return(
          <div className='pageContent'>ola k ase No se encontro</div>
        );
    }
  }

  close(){
    firebase.auth().signOut()
     .then(result => console.log(result.user.email + ' ha iniciado cerrado sesion'))
     .catch(error => console.log('Error ' + error.code + ' : ' + error.message))

    this.setState({
      actualPage: 0
    })
  }
  loggin(){
    console.log("abrirPop");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      // result lo retorna Firebase, .then es para cuando la conexion es correcta, .catch es cuando fracasa, ${result.user.email} simplemente accede a las variables del objeto result, la sintaxis corresponde a un concatenamiento sin separar el string, esta sintaxis por alguna razon no me funciono :(
      .then(result => console.log(result.user.email + ' ha iniciado sesion'))
      .catch(error => console.log('Error ' + error.code + ' : ' + error.message))




  }

  menuChange(e){
    console.log(e);
    this.setState({
      actualPage: e
    })
  }

  loadMenu(){
    if(this.state.user){
      return(
        <header className="header">
        <div className='superiorMenu'>
          <img width='30%' src={logo}/>
          <SessionInfo close={this.close} userName={this.state.user.displayName} userPicture={this.state.user.photoURL} />
        </div>
          <Menu menuAction={this.menuChange} />
        </header>

      )
    }
    else{
      return(
        <header className="header">
          <div className='superiorMenu'>
            <img width='30%' src={logo}/>
          </div>
          <SessionInit onClicked={this.loggin}/>
        </header>

      )
    }

  }


  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
        <div>{this.loadMenu()}</div>
        <div className='pageContent'>{this.loadContent()}</div>
        <Footer />



        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
