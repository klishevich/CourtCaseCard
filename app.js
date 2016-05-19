var React = require('react');
var ReactDOM = require('react-dom');
var FilesListBox = require('./components/CourtCaseCard.react.jsx');

ReactDOM.render(
  <CCCard readOnly={$.parseJSON($('#pageEditable').val())} IdCourtCase={$('#IdCourtCase').val() } />,
  document.getElementById('contentCourtCaseCard')
);