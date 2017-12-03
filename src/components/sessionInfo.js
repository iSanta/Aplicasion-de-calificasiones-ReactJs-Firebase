import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Colors, {fullWhite} from 'material-ui/styles/colors';

class sessionInfo extends Component{

  render(){
    return(
      <div className='sessionInfo'>
        <div className='user'>
          <List>
            <ListItem
            style={{color: fullWhite, paddingLeft:"100px"}}
            disabled={true}
            leftAvatar={
              <Avatar
                src={this.props.userPicture}
                size={60}
                style={{margin: "5px"}}
              />}>
              {this.props.userName}
              <br/>
              <span className='sessionClose' onClick={this.props.close}>Cerrar Sesion</span>
            </ListItem>
          </List>
        </div>
      </div>
    )
  }
}

export default sessionInfo;
