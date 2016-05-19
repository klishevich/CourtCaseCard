var React = require('react');

var CheckBox = React.createClass({
    render: function () {
        //console.log("checked", this.props);
        return (
            <label>
                <input type="checkbox"
                    checked={this.props.checked}
                    onClick={this.handleClick}
                 />
                {this.props.label}
            </label>
    );
    },
    handleClick: function(e) {
        this.props.onChange({ [this.props.checkboxName]: e.target.checked });
    }
});

module.exports = CheckBox;