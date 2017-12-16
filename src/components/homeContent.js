import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Colors, {green600, fullWhite, green900} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import LinearProgress from 'material-ui/LinearProgress';
import firebase from 'firebase';
import Snackbar from 'material-ui/Snackbar';


var dataBaseRef = null;

class homeContent extends Component {
  constructor(){
    super()
    this.state ={
      user: null,
      showForm: false,
      completed: null,
      snackbar: false,
      message: '',
      pictures: []
    }
  }

  componentWillUnmount() {
    //-------- Es necesario desmontar la referencia de la base de datos, de no ser asi al volver a cargar el componente simplemente leera el primer registro de la base de datos por alguna razon
    dataBaseRef.off();
  }

  componentWillMount = () => {
    this.setState({
      user: this.props.user,
      message: 'Has publicado una nueva entrada de forma correcta.'
    })


    dataBaseRef = firebase.database().ref('wall');
    dataBaseRef.on('child_added', snapchot =>{
      this.setState({
        pictures: this.state.pictures.concat(snapchot.val())
      })
    })
  }

  publicate = () => {
    let title = document.getElementById('title').value;
    let subtitle = document.getElementById('subtitle').value;
    let content = document.getElementById('content').value;
    let imageTitle = document.getElementById('imageTitle').value;
    let imageSubtitle = document.getElementById('imageSubtitle').value;
    let userName = this.state.user.displayName;
    let userPicture = this.state.user.photoURL;

    const randomNumer = Math.floor((Math.random() * 10000) + 1);
    let image = document.getElementById('image');
    const file = image.files[0];
    const storageReft = firebase.storage().ref('/wallImages/'+ randomNumer + file.name );
    const task = storageReft.put(file);
    var photoUrl;

    task.on('state_changed', (snapshot) => {
      let percentaje = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      this.setState({
        completed: percentaje
      })
    }, (error) => {
      console.log('Ha ocurrido un error: ' + error.message);
    }, () => {

      console.log('imagen subida');
      photoUrl = task.snapshot.downloadURL;
      var record = {
        title: title,
        subtitle: subtitle,
        content: content,
        imageTitle: imageTitle,
        imageSubtitle: imageSubtitle,
        photoUrl: photoUrl,
        userName: userName,
        userPicture: userPicture,
      }
      const dbRef = firebase.database().ref('wall');
      const newRegist = dbRef.push();
      newRegist.set(record);

      this.setState({
        snackbar: true,
        showForm: false,
        completed: 0,
      })

    })
  }


  // funcion para cerrar el snackbar
  handleRequestClose = () => {
    this.setState({
      snackbar: false
    })
  }


  // Muestra el formulario despues de hacer click al toggle
  form = () => {
    if (this.state.showForm) {
      return(
        <div>
          <br/>
          <br/>
          <div className='table'>
            <div className='separeDivForm'>
              <TextField
                id="title"
                floatingLabelText="Titulo"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
                fullWidth={true}
              />
            </div>
            <div className='separeDivForm'>
              <TextField
                id="subtitle"
                floatingLabelText="Subtitulo"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
                fullWidth={true}
              />
            </div>
            <div style={{width: '94%', padding: '0px 3%'}}>
              <TextField
                id="content"
                floatingLabelText="Contenido"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
                fullWidth={true}
                multiLine={true}
                rows={4}
              />

              <br />
              <br />
              <br />
              <Divider />
              <br />

            </div>
          </div>

          <div className='table'>
            <div className='separeDivForm'>
              <RaisedButton
                label="Imagen"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
              >
                <input id='image' type="file" style={styles.exampleImageInput} />
              </RaisedButton>
            </div>

            <div className='separeDivForm'>
              <TextField
                id="imageTitle"
                floatingLabelText="Titulo de la imagen"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
                fullWidth={true}
              />
              <br />
              <TextField
                id="imageSubtitle"
                floatingLabelText="Subtitulo de la imagen"
                floatingLabelFocusStyle={{color: green600}}
                underlineFocusStyle={{borderColor: green600}}
                fullWidth={true}
              />
            </div>



          </div>
          <div style={{width: '94%', padding: '0px 3%'}}>
            <br />
            <LinearProgress color={green600} mode="determinate" value={this.state.completed} />
            <br />
            <RaisedButton
              backgroundColor={green900}
              labelColor={fullWhite}
              style={{marginLeft: "10px"}}
              label="Publicar"
              onClick={this.publicate}
            />
          </div>
        </div>
      )
    }
    else{
      return(
        <div></div>
      )
    }
  }


  // funcion que abre y cierra el toggle
  displayForm = () => {
    var toggle = this.state.showForm;
    toggle = !toggle;
    this.setState({
      showForm: toggle
    })
  }


  publisher = () => {

    if (this.state.user) {
      return(
        <div id='publisher'>
          <Paper>
            <div style={{minHeight: 30}} className='cout'>
              <h3>¿Quieres decirle algo al mundo?</h3>
              <p>Todo lo que publiques en este muro será visto por los demás usuarios.</p>
              <br/>
              <br/>
              <div style={{width: '50%'}}>
                <Toggle
                  label="Desplegar"
                  labelPosition="right"
                  onToggle={this.displayForm}
                  thumbSwitchedStyle={{backgroundColor: green900}}
                  trackSwitchedStyle={{backgroundColor: green600}}
                />
              </div>
              {this.form()}

            </div>
          </Paper>
        </div>
      )
    }
    else{
      return(
        <div id='publisher'>
          <Paper>
            <div style={{minHeight: 0}} className='cout'>
              Debes iniciar sesión para poder publicar en el muro.
            </div>
          </Paper>
        </div>
      )
    }



  }

  render(){
    return(
      <Paper>
        <div className='cout'>
          {this.publisher()}


          <div id='wall'>
            <Paper>
              <div className='cout'>
                {
                  this.state.pictures.map(post =>(
                    <div>
                    <Card>
                      <CardHeader
                        title={post.userName}
                        subtitle="Una persona"
                        avatar={post.userPicture}
                      />
                      <CardMedia
                        overlay={<CardTitle title={post.imageTitle} subtitle={post.imageSubtitle} />}
                      >
                        <img src={post.photoUrl} alt="" />
                      </CardMedia>
                      <CardTitle title={post.title} subtitle={post.subtitle} />
                      <CardText>
                        {post.content}
                      </CardText>

                    </Card>
                    <br />
                    </div>
                  )).reverse()
                }
              </div>
            </Paper>
          </div>
        </div>

        <Snackbar
          open={this.state.snackbar}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />


      </Paper>
    )
  }
}



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

export default homeContent;
