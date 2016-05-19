var React = require('react');
var ReactDOM = require('react-dom');
var CourtCaseCard = require('./components/CourtCaseCard.react.jsx');

ReactDOM.render(
  <CourtCaseCard readOnly={$.parseJSON($('#pageEditable').val())} IdCourtCase={$('#IdCourtCase').val() } />,
  document.getElementById('contentCourtCaseCard')
);