﻿var React = require('react');
var CommonSelectItem = require('./CommonSelectItem.react.jsx');

var CommonSelect = React.createClass({
  oldSelectId: '',
  getInitialState: function() {
    return {selectId: this.props.selectId};
  },
  componentWillMount: function() {
    this.oldSelectId = this.props.selectId;  
  },
  change: function(e){
      this.props.onSelectChange({[this.props.selectName]: e.target.value});
  },
  shouldComponentUpdate: function(nextProps) {
      //Если нужно всегда рэндерить компоненту, то передаем параметр alwaysUpdate={true}
      return (nextProps.selectId !== this.oldSelectId || this.props.alwaysUpdate==true);
  }, 
  componentDidUpdate: function(nextProps) {
    this.oldSelectId = nextProps.selectId;
  }, 
  render: function(){
      var selectNodes = this.props.dictcommonselect.map(function(item){ 
      // item.id, item.value - то, что возвращается в сигнатуре json
      return ( 
        <CommonSelectItem
          selectId={item.id} 
          name={item.value} 
          key={item.id}> 
        </CommonSelectItem> 
      ); 
    }); 
      return(
        <div className="form-group" id={this.props.selectName}> 
          <select id="select_edit" className="form-control input-sm" onChange={this.change} 
            value={this.props.selectId}>
            <option>Не выбрано</option>
            {selectNodes} 
          </select>
        </div>
      );      
  }
});

module.exports = CommonSelect;

//[{"id":171240,"value":"Верховный Суд Российской Федерации","label":"Верховный Суд Российской Федерации","sortOrder":0},{"id":171241,"value":"Суд Божий","label":"Суд Божий","sortOrder":0}]