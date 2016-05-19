//var Globalize = require('globalize')
//var globalizeLocalizer = require('react-widgets/lib/localizers/globalize')
//Globalize.load()
//Globalize.locale('ru-RU')
//globalizeLocalizer(Globalize);

//var Moment = require('moment')
//var momentLocalizer = require('react-widgets/lib/localizers/moment')
//momentLocalizer(Moment);

var React = require('react');
//var DateTimePicker = require('react-widgets').DateTimePicker;
var DateTimePicker = require('react-widgets/lib/DateTimePicker')
//import DateTimePicker from 'react-widgets/lib/DateTimePicker';
var CheckBox = require('./Common/CheckBox.react.jsx');
var CommonSelect = require('./Common/CommonSelect.react.jsx');
var DateTimeFormat = "DD.MM.YY HH:mm";
var DateFormat = "DD.MM.YY";

var Constants = {
    IdName: "IdCourtCase",
    IdParent: "IdCourtCase",
    ClassName: "CourtCaseInfo",
    ReactClassName: "CourtCaseCardElement",
    Number: "Номер дела",
    RegistrationDate: "Дата регистрации",
    CaseStage: '',
    ClaimSum: "Сумма",
    Currency_Name: "Валюта",
    User_Name: "Ответственный сотрудник",
    Priority_Name: "Приоритет",
    User: 'Пользователь указанный в Access',
    CourtCaseType_Name: "Тип судебного дела",
    Group: "Группа",
    IdCourtCaseStage: '',
    CourtCaseStage_Name: '',
    Measures: "Меры",
    PerformanceList: "Дата получения исполнительного листа",
    Guarantee: "Наличие залога",
    VotesCount: "Количество голосов в собрании %",
    End: "Дата окончания судебного дела",
    DecisionSum: "Сумма по решению суда",
    Topic: "Предмет"
};

var CourtCaseCardElement = React.createClass({
    isAlwaysUserUpdate: true,
    //edit
    getInitialState: function() {
        return {
            IdCourtCase: '',
            Group: '',
            Number: '',
            RegistrationDate: null,
            Topic: '',
            ClaimSum: '',
            IdCurrency: '',
            IdUser: '',
            IdCourtCaseType: '',
            IdPriority: '',
            Measures: false,
            PerformanceList: null,
            Guarantee: false,
            VotesCount: '',
            End: null,
            DecisionSum: ''
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            IdCourtCase: nextProps.IdCourtCase,
            Group: nextProps.data.Group,
            Number: nextProps.data.Number,
            RegistrationDate: convertDateEdit(nextProps.data.RegistrationDate),
            Topic: nextProps.data.Topic,
            ClaimSum: nextProps.data.ClaimSum,
            IdCurrency: nextProps.data.IdCurrency,
            IdUser: nextProps.data.IdUser,
            IdCourtCaseType: nextProps.data.IdCourtCaseType,
            IdPriority: nextProps.data.IdPriority,
            Measures: nextProps.data.Measures,
            PerformanceList: convertDateEdit(nextProps.data.PerformanceList),
            Guarantee: nextProps.data.Guarantee,
            VotesCount: nextProps.data.VotesCount,
            End: convertDateEdit(nextProps.data.End),
            DecisionSum: nextProps.data.DecisionSum
        });
    },
    componentDidUpdate: function() {
        if (this.props.userSelect.length > 0 && this.isAlwaysUserUpdate) {
            this.isAlwaysUserUpdate = false;
        }
    },
    handleUpdateUIState: function (e) {
        e.preventDefault();
        var newData = this.fillDataFromProps();
        this.setState(newData);
    },
    handleSave: function(e) {
        e.preventDefault();
        var newData = this.fillDataForSave();
        this.props.onSave(newData);
    },
    //edit
    fillDataForSave: function () {
        var newData = {
            IdCourtCase: this.props.IdCourtCase,
            Group: this.state.Group,
            Number: this.state.Number,
            RegistrationDate: this.state.RegistrationDate,
            Topic: this.state.Topic,
            ClaimSum: this.state.ClaimSum,
            IdCurrency: this.state.IdCurrency,
            IdUser: this.state.IdUser,
            IdCourtCaseType: this.state.IdCourtCaseType,
            IdPriority: this.state.IdPriority,
            Measures: this.state.Measures,
            PerformanceList: this.state.PerformanceList,
            Guarantee: this.state.Guarantee,
            VotesCount: this.state.VotesCount,
            End: this.state.End,
            DecisionSum: this.state.DecisionSum
        };
        return newData;
    },
    //edit
    fillDataFromProps: function () {
        var newData = {
            IdCourtCase: this.props.IdCourtCase,
            Group: this.props.data.Group,
            Number: this.props.data.Number,
            RegistrationDate: this.props.data.RegistrationDate,
            Topic: this.props.data.Topic,
            ClaimSum: this.props.data.ClaimSum,
            IdCurrency: this.props.data.IdCurrency,
            IdUser: this.props.data.IdUser,
            IdCourtCaseType: this.props.data.IdCourtCaseType,
            IdPriority: this.props.data.IdPriority,
            Measures: this.props.data.Measures,
            PerformanceList: this.props.data.PerformanceList,
            Guarantee: this.props.data.Guarantee,
            VotesCount: this.props.data.VotesCount,
            End: this.props.data.End,
            DecisionSum: this.props.data.DecisionSum
        };
        return newData;
    },
    handleCommonChange: function (e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    },
    handleCheckBoxChange: function (item) {
        this.setState(item);
    },
    //edit
    //Строка в гриде
    rowViewBase: function (rowClassName) {
        // отображать или нет кнопки
        var buttonsExists;
        if (!this.props.readOnly) {
            buttonsExists =
                <div className="ToggleEdit">
                </div>
        }

        var idName = Constants.ClassName + this.props[Constants.IdName];
        return (
        <div className={rowClassName} id={idName}>
            {buttonsExists}
            {this.cellViewText("Group")}
            {this.cellViewText("Number")}
            {this.cellViewDate("RegistrationDate")}
            {this.cellViewText("Topic")}
            {this.cellViewText("ClaimSum")}
            {this.cellViewText("Currency_Name")}
            {this.cellViewText("User_Name")}
            {this.cellViewText("User")}
            {this.cellViewText("CourtCaseType_Name")}
            {this.cellViewText("Priority_Name")}
            {this.cellViewText("Measures")}
            {this.cellViewDate("PerformanceList")}
            {this.cellViewText("Measures")}
            {this.cellViewText("PerformanceList")}
            {this.cellViewText("Guarantee")}
            {this.cellViewText("VotesCount")}
            {this.cellViewText("End")}
            {this.cellViewDate("DecisionSum")}
        </div>);
    },
    elementView: function() {
        return this.rowViewBase(Constants.ClassName);
    },
    rowViewError: function() {
        name = Constants.ClassName + " table-error-row";
        return this.rowViewBase(name);
    },
    inputBaseText: function (columnName, type) {
        return (
                <input className="form-control input-sm" type={type} name={columnName} id={columnName}
                    placeholder={Constants[columnName]} value={this.state[columnName]}
                    onChange={this.handleCommonChange}/>
                );
    },
    inputText: function(columnName) {
        return this.inputBaseText(columnName, "text");
    },
    inputMoney: function (columnName) {
        //TODO сделать контрол для ввода денег
        return this.inputBaseText(columnName, "text");
    },
    inputCheckbox: function (columnName) {
        //TODO сделать checkbox
        //return this.inputBaseText(columnName, "text");
        return (
                    <CheckBox checked={this.state[columnName]} checkboxName={columnName} onChange={this.handleCheckBoxChange}></CheckBox>
            );
    },
    inputTextarea: function(columnName, rows) {
        return (
                    <textarea className="form-control input-sm" rows={rows} name={columnName} id={columnName} style={{width: '100%'}}
                        value={this.state[columnName]}
                        onChange={this.handleCommonChange} />
                );
    },
    handleDateTimePickerChange : function(name, value) {
        this.setState({
            [name]: convertDateEdit(value)
        });
    },
    inputBaseDatetme: function(columnName, hasTime, format) {
        return  (
                    <DateTimePicker format={format} name={columnName} time={hasTime} value={datePickerEdit(this.state[columnName])}
                                    onChange={this.handleDateTimePickerChange.bind(null, columnName)} />
                    );
    },
    inputDate: function(columnName) {
        return this.inputBaseDatetme(columnName, false, DateFormat);
    },
    inputDatetime: function(columnName) {
        return this.inputBaseDatetme(columnName, true, DateTimeFormat);
    },
    handleSelectChange: function(item) {
        this.setState(item);
    },
    dropdown: function (columnName, propsName, isAlwaysUpdate = true) {
        var name = Constants.ClassName;
        name = name + columnName;
        return (
                 <CommonSelect selectId={this.state[columnName]} onSelectChange={this.handleSelectChange} selectName={columnName}
                    dictcommonselect={this.props[propsName]} alwaysUpdate={isAlwaysUpdate}/>
                );
    },
    elementEdit: function () {
        var name = "button-block " + Constants.ClassName;
        var actionButtons;
        if (this.props.add == "true"){
            name = name + "ButtonsAdd";
            actionButtons = (
                <div className={name} width="100px">
                  <a href="#" className="btn btn-primary" onClick={this.handleAdd}>Добавить</a>
                  <a href="#" className="btn btn-defalut btn-sm" onClick={this.handleCancel}>Отменить</a>
                </div>);
        }
        else{
            name = name + "ButtonsEdit";
            actionButtons = (
                <div className={name} width="100px">
                  <a href="#" className="btn btn-primary btn-sm" onClick={this.handleSave}>Сохранить</a>
                  <a href="#" className="btn btn-defalut btn-sm" onClick={this.handleCancel}>Отменить</a>
                </div>);
        }
        var bunkruptcyFields;
        if (this.props.isBankruptcy == 1) {
            bunkruptcyFields = (
                <div className="row">
                    <div className="col-xs-4">
                        Поля для банкротных дел
                    </div>
                </div> );
        }
        var message;
        if (this.props.data.Message) {
            if (this.props.data.Message.length > 0) {
                message = (
                    <div className="row">
                        <div className="col-xs-8 message"> 
                            <div className="alert alert-success" role="alert">{this.props.data.Message}</div>
                        </div>
                    </div>);
            }
        }
        //edit
        //Форма редактирования элемента в гриде
        return (<div className={name}>
                    {message}
                    <div className="row">
                        <div className="col-xs-4">
                            <div className="testButton" width="100px">
                                <a href="#" className="btn btn-primary btn-sm" onClick={this.handleUpdateUIState}>Update UI State</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="Group">{Constants.Group}</label>{this.inputText("Group")}
                        </div>
                        <div className="col-xs-4">
                            <label htmlFor="Number">{Constants.Number}</label>{this.inputText("Number")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="RegistrationDate">{Constants.RegistrationDate}</label>{this.inputDate("RegistrationDate")}
                        </div>
                        <div className="col-xs-4">
                            <label htmlFor="Topic">{Constants.Topic}</label>{this.inputText("Topic")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="ClaimSum">{Constants.ClaimSum}</label>{this.inputMoney("ClaimSum")}
                        </div>
                        <div className="col-xs-4">
                            <label htmlFor="IdCurrency">{Constants.Currency_Name}</label>{this.dropdown("IdCurrency", "currencySelect")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="IdUser">{Constants.User_Name}</label>{this.dropdown("IdUser", "userSelect", this.isAlwaysUserUpdate)}
                        </div>
                        <div className="col-xs-4">
                            <label htmlFor="IdCourtCaseType">{Constants.CourtCaseType_Name}</label>{this.dropdown("IdCourtCaseType", "courtCaseTypeSelect")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="IdPriority">{Constants.Priority_Name}</label>{this.dropdown("IdPriority", "prioritySelect")}
                        </div>
                        <div className="col-xs-4">
                            <label htmlFor="Measures">{Constants.Measures}</label>{this.inputCheckbox("Measures")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="PerformanceList">{Constants.PerformanceList}</label>{this.inputDate("PerformanceList")}
                        </div>
                        <div className="col-xs-4">
                            <label htmlFor="Guarantee">{Constants.Guarantee}</label>{this.inputCheckbox("Guarantee")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="VotesCount">{Constants.VotesCount}</label>{this.inputText("VotesCount")}
                        </div>
                        <div className="col-xs-4">
                            <label htmlFor="End">{Constants.End}</label>{this.inputDate("End")}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <label htmlFor="DecisionSum">{Constants.DecisionSum}</label>{this.inputMoney("DecisionSum")}
                        </div>
                    </div>
                            {bunkruptcyFields}
                    <div className="row">
                        <div className="col-xs-4">
                            {actionButtons}
                        </div>
                    </div>
        </div>);
    },  
    render: function () {

        return this.elementEdit();

        //if (this.state.edit || this.props.add == "true") {
        //    return this.rowEdit();
        //}
        //else {
        //    if (this.props.Errors) {
        //        return this.rowViewError();
        //    }
        //    else {
        //        return this.rowView();
        //    }
        //}
    }
});

module.exports = CourtCaseCardElement;