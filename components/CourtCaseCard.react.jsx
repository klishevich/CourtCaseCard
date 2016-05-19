var React = require('react');
var CourtCaseCardElement = require('./CourtCaseCardElement.react.jsx');

var Constants = {
    GridName: "Карточка судебного дела на Реакте"
};

var CourtCaseCard = React.createClass({
    //edit
    getInitialState: function() {
        return {data: [], currencySelect: [], userSelect: [], courtCaseTypeSelect: [], prioritySelect: []};
    },

    componentWillMount: function () {
        this.loadFromServer();
        this.LoadSelectCurrency('?category=Currency');
        this.LoadSelectUser('?category=User');
        this.LoadSelectCourtCaseType('?category=CourtCaseType');
        this.LoadSelectPriority('?category=CourtCasePriority');
    },

    // Select Lists
    LoadSelectCurrency: function (passedParams) {
        $.ajax({
            url: '/Tech/DropDownListByCategory' + passedParams,
            dataType: 'json',
            success: function (currentDictSelect) {
                if (this.isMounted()) {
                    this.setState({ currencySelect: currentDictSelect });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    LoadSelectUser: function (passedParams) {
        $.ajax({
            url: '/Tech/DropDownListByCategory' + passedParams,
            dataType: 'json',
            success: function (currentDictSelect) {
                if (this.isMounted()) {
                    this.setState({ userSelect: currentDictSelect });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    LoadSelectCourtCaseType: function (passedParams) {
        $.ajax({
            url: '/Tech/DropDownListByCategory' + passedParams,
            dataType: 'json',
            success: function (currentDictSelect) {
                if (this.isMounted()) {
                    this.setState({ courtCaseTypeSelect: currentDictSelect });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    LoadSelectPriority: function (passedParams) {
        $.ajax({
            url: '/Tech/DropDownListByCategory' + passedParams,
            dataType: 'json',
            success: function (currentDictSelect) {
                if (this.isMounted()) {
                    this.setState({ prioritySelect: currentDictSelect });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // Select Lists
    //edit url
    loadFromServer: function () {
        $.ajax({
            url: '/CourtCase/EditCard/' + this.props.IdCourtCase,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (this.isMounted()) {
                    this.setState({data: data});
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    //edit url
    handleAdd: function(item) {
        $.ajax({
            url: '/CourtCase/Create',
            dataType: 'json',
            type: 'POST',
            data: item,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    //edit url
    handleSave: function (item) {
        $.ajax({
            url: '/CourtCase/Edit',
            dataType: 'json',
            type: 'POST',
            data: item,
            success: function (data) {
                console.log('handleSave 3 Group', data);
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {     
        return (
          <div className="CCCard">
            <h3>{Constants.GridName}</h3>
              <CourtCaseCardElement data={this.state.data}
                onSave={this.handleSave}
                onAdd={this.handleAdd}
                readOnly={this.props.readOnly}
                IdCourtCase={this.props.IdCourtCase} 
                currencySelect={this.state.currencySelect}
                userSelect={this.state.userSelect}
                courtCaseTypeSelect={this.state.courtCaseTypeSelect}
                prioritySelect={this.state.prioritySelect}/>
            </div>
        );
    }
});

module.exports = CourtCaseCard;