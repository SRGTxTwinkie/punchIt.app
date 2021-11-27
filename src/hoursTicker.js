import React from "react";

export default class HoursTicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onHourChange(event.currentTarget.value); 
    }


    render() {
        const styles = {
            display: this.props.showSelf === true ? "inline-block" : "none"
        }

        return (
            <div className="inlineBlock" style={styles}>
                <input className={"sideMargins"} type="radio" name={this.props.name} value={this.props.buttonArr[0]} onChange={this.handleChange}></input>    
                <input className={"sideMargins"} type="radio" name={this.props.name} value={this.props.buttonArr[1]} onChange={this.handleChange}></input>    
                <input className={"sideMargins"} type="radio" name={this.props.name} value={this.props.buttonArr[2]} onChange={this.handleChange}></input>    
                <input className={"sideMargins"} type="radio" name={this.props.name} value={this.props.buttonArr[3]} onChange={this.handleChange}></input>    
                <input className={"sideMargins"} type="radio" name={this.props.name} value={this.props.buttonArr[4]} onChange={this.handleChange}></input>
                <br />
                <label className={"labelPadding"}>{this.props.buttonArr[0]}</label>
                <label className={"labelPadding"}>{this.props.buttonArr[1]}</label>
                <label className={"labelPadding"}>{this.props.buttonArr[2]}</label>
                <label className={"labelPadding"}>{this.props.buttonArr[3]}</label>
                <label className={"labelPadding"}>{this.props.buttonArr[4]}</label>

            </div>
        )
    }
}
