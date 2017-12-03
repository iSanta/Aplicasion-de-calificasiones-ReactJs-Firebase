import React, { Component } from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Colors, {green600, fullWhite} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';


//---------------------Icons
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionUpdate from 'material-ui/svg-icons/action/update';

const recentsIcon = <ActionHome style={{color:'withe'}} color={fullWhite} />
const assignamet = <ActionAssignment style={{color:'withe'}} color={fullWhite} />
const add = <ContentAdd color={fullWhite} />
const update = <ActionUpdate color={fullWhite} />

class menu extends Component {
  constructor(){
    super();
    this.state={
      selectedIndex:0
    }
    this.select = this.select.bind(this);
  }

  select(i){
    this.setState({
      selectedIndex: i
    })
    var selectecItem=i;
    this.props.menuAction(selectecItem);


  }


  render(){
    return(
      <div className='menuContainer'>
        <Paper>
          <BottomNavigation style={{backgroundColor: green600, color: 'white'}}>
            <BottomNavigationItem
              style={{color: fullWhite}}
              color={fullWhite}
              label="Inicio"
              icon={recentsIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              style={{color: fullWhite}}
              color={fullWhite}
              label="Mis notas"
              icon={assignamet}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              style={{color: fullWhite}}
              color={fullWhite}
              label="Crear Asignatura"
              icon={add}
              onClick={() => this.select(2)}
            />
            <BottomNavigationItem
              style={{color: fullWhite}}
              color={fullWhite}
              label="Actualizar Notas"
              icon={update}
              onClick={() => this.select(3)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    )
  }

}


export default menu;
