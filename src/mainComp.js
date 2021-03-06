import React from "react";
import HoursTicker from "./hoursTicker";
import Footer from "./footer";

export default class MainComp extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        currentHours: "35",
        hoursNeeded: "40",
        punchTime: "08:00",
        lastPressed: ""
      };

      this.showButtonsChange = this.showButtonsChange.bind(this);
      this.handleHourChangeOne = this.handleHourChangeOne.bind(this);
      this.handleHourChangeTwo = this.handleHourChangeTwo.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.setTime = this.setTime.bind(this);

  }

  async handleTimeChange(e) {
    await this.setState({punchTime: e.target.value});
    this.updateText();
  }

  async handleHourChangeOne(value) {
    await this.setState({currentHours: value});
    this.updateText();
  }

  async handleHourChangeTwo(value) {
    await this.setState({hoursNeeded: value});
    this.updateText();
  }

  updateText(){
    if(this.state.lastPressed === "submit"){
      this.onSubmit();
    }
    else{
      this.getTimes();
    }

  }

  async showButtonsChange(e) {
    await this.setState({showButtons: e.target.checked});
  }

  onSubmit() {
    this.setState({lastPressed: "submit"});
    var newDate = this.generateDate(); 

    var useMinutes = false;
    
    var timeDiff = parseFloat(this.state.hoursNeeded - this.state.currentHours).toFixed(2);
    newDate.setTime(newDate.getTime() + timeDiff * 60 * 60 * 1000);

    if(timeDiff.toString().substring(0,1) === "0"){
      timeDiff = timeDiff * 60;
      useMinutes = true;
    }

    var out1 = `You have ${timeDiff} ${useMinutes === true ? "minutes" : "hours"} remaining this week`;
    var out2 = timeDiff < 12 | useMinutes ? `To work the remaing hours, you need to punch out at ${newDate.toLocaleTimeString()}` : "";


    this.appendTimes(out1, out2); 
    
  }

  getTimes(){
    this.setState({lastPressed: "getTimes"});

    var times = []; 
    for(var i = 0; i < 8; i++){
      var newDate = this.generateDate();
      newDate = this.addHoursToDate(newDate, i + 1);
      times[i] = `${i + 1} Hours: ` + newDate.toLocaleTimeString(); 
    }
    
    this.appendTimes("Punch out at these times:", times.join("<br>"));
    
  }

  addHoursToDate(date, hours) {
    return new Date(new Date(date).setHours(date.getHours() + hours));
  }


  appendTimes(out1, out2){
    var punchTimeP = document.getElementById("punchTime");
    var remaingTimeP = document.getElementById("timeRemaing");

    punchTimeP.innerHTML = out1;
    var punchTimePClone = punchTimeP.cloneNode(true);
    
    remaingTimeP.innerHTML = out2;
    var remaingTimePClone = remaingTimeP.cloneNode(true);


    punchTimeP.parentNode.replaceChild(punchTimePClone, punchTimeP);
    remaingTimeP.parentNode.replaceChild(remaingTimePClone, remaingTimeP);
  }

  generateDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    return new Date(`${mm} ${dd}, ${yyyy} ${this.state.punchTime}`);
  }

  async setTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    currentTime = String(hours + ":" + String("0" + minutes).slice(-2));
    console.log(currentTime);
    await this.setState({punchTime: currentTime});
    this.getTimes();
  }

  render() {
    return (
        <div className={"inlineBlock"}>
          <div className={"centeredText webpageCentered"} id={"punch-time"}>
            <input
              className={"noMargin noPadding"}
              type="checkbox"
              onChange={this.showButtonsChange} />

            <label className={"tinyText noMargin noPadding"} style={{float: "clear both"}}> Show Radios</label>

            <p>When did you punch in?</p>
            <button
              style={{
                      transform:"translateX(-4px)",
                      width:"140px"
                    }}
              onClick={this.setTime}>
              Now?
            </button>
            
            <br />
            <div className={"hoverReveal transform33"}>
              <input
                type="text"
                value={this.state.punchTime}
                onChange={this.handleTimeChange}
                className={"smallInput"}
                style={{fontSize: "20px", textAlign: "left", paddingLeft: "3px", marginLeft:"3px"}} >

                </input>
              
              <label className={"opacity0"}> 24 Hour</label>
            </div>
            <div className={"hoverReveal transform33"}>
              <input
                type="time"
                value={this.state.punchTime}
                onChange={this.handleTimeChange}
                tabIndex="1"
                style={{fontSize: "20px", padding: "3px 3px 3px 2px"}} >

                </input>
              
              <label className={"opacity0"}> 12 Hour</label>
            </div>
            <br />
            <br />
          </div>
          <div className={"inlineBlock"}>
            <p className={"noMargin noPadding centeredText floatLeft marginRight10"}>Current Hours </p>
            <p className={"noMargin noPadding centeredText floatRight marginLeft10"}>Hours Needed</p>
          </div>
          <br />
          <input
            tabIndex="2" 
            className={"smallInput marginRight5"}
            type="number"
            step="0.1"
            min="0"
            style={{fontSize: "20px"}}
            value={this.state.currentHours}
            onChange={(e) => this.handleHourChangeOne(e.target.value)}/>
          
          <input
            tabIndex="3"
            className={"smallInput marginLeft5"}
            type="number"
            step="0.1"
            min="0"
            style={{fontSize: "20px"}}
            value={this.state.hoursNeeded}
            onChange={(e) => this.handleHourChangeTwo(e.target.value)}/>
          
          <br />
          <HoursTicker
            showSelf = {this.state.showButtons}
            name="time1"
            onHourChange={this.handleHourChangeOne}
            buttonArr={["10", "20", "25", "30", "35"]}/>
          <HoursTicker
            showSelf = {this.state.showButtons}
            name="time2"
            onHourChange={this.handleHourChangeTwo}
            buttonArr={["10", "20", "25", "30", "35"]}/>
          <br />
          <br />
          <button
            id={"submitButton"}
            className={"button"}
            onClick={() => this.onSubmit()}
            tabIndex="4">
            Submit
          </button>
          <br />
          <button
            id={"getTimes"}
            className={"button"}
            onClick={() => this.getTimes()}
            tabIndex="5">
            Get times
          </button>

          <p id={"punchTime"} style={{fontSize: "25px"}} className={"fadeIn scaleVwVh"}></p>
          <p id={"timeRemaing"} style={{fontSize: "25px"}} className={"fadeIn scaleVwVh"}></p>
          <Footer />
        </div>
    );
  }
}