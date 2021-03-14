import React, {Component} from 'react';
import {Text, View} from 'react-native';
import db from '../db';
export class index extends Component {
  IconColorActive() {
    return db.state.IconcolorActive;
  }
  iconColor() {
    return db.state.Iconcolor;
  }
  TextColor() {
    if (!db.state.darkmode) {
      return db.state.darktext;
    }
    return db.state.text;
  }
  LoadingColor() {
    if (!db.state.darkmode) {
      return db.state.lightbox;
    }
    return db.state.lightheader;
  }
  PlaceHolderColor() {
    if (!db.state.darkmode) {
      return '#eeeeeeaa';
    }
    return '#808080aa';
  }
  BoxColor() {
    if (!db.state.darkmode) {
      return db.state.darkbox;
    }
    return db.state.lightbox;
  }
  Primary() {
    if (!db.state.darkmode) {
      return db.state.darkbg;
    }
    return db.state.lightbg;
  }
  Biru() {
    return db.state.lightheader;
  }
  Merah() {
    return db.state.iconRed;
  }
}
const index_ = new index();

export default index_;
