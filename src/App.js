import { Component } from 'react';
import Section from './Components/Section';
import FeedbackOptions from './Components/FeedbackOptions';
import Statistics from './Components/Statistics';
import Notification from './Components/Notification';

class App extends Component {

    constructor(){
        super();
        this.handleButtonClick = this.handleButtonClick.bind(this);

        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
          };       
   
    }

    handleButtonClick(value){
        this.setState({
            [value]: this.state[value]+1,
        });      
    };
    

    countTotalFeedback(){
        return this.state.good+this.state.neutral+this.state.bad;
    };

    countPositiveFeedbackPercentage(){
        if(this.state.good===0){
            return 0;
        }
        return ((this.state.good/(this.state.good+this.state.neutral+this.state.bad))*100).toFixed(2);
    }

    checkFeedbackGiven(){
        if(this.state.good===0 && this.state.neutral===0 && this.state.bad===0){
            console.log("FALSE");
            return false;
        }
        console.log("TRUE");
        return true;
    }

    render() {
        return (
            <div>
                <Section title="Please leave your feedback">
                <FeedbackOptions
                    options={this.state}
                    onLeaveFeedback={this.handleButtonClick}
                />
                </Section>
                <Section title="Statistics:">

                {this.checkFeedbackGiven() ? <Statistics
                    good={this.state.good}
                    neutral={this.state.neutral}
                    bad={this.state.bad}
                    total={this.countTotalFeedback()}
                    positivePercentage={this.countPositiveFeedbackPercentage()}
                    /> : <Notification message="No feedback given"/>}                   

                
                </Section>
            </div>
        );
    }
}

export default App;