import React from 'react';

export class RaceList extends React.Component {
    constructor() {
        super();
        this.state = { 
            time: Date.now(),
            summaries: [],
            filteredSummaries: [],
        };
    }
    
    componentDidMount() {
        const sortedSummaries = this.props.summaries.sort(function(a, b) {
            return a.advertised_start.seconds - b.advertised_start.seconds;
        })
        this.setState({ summaries: sortedSummaries, filteredSummaries: sortedSummaries });
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    calculateTimeLeft = (seconds) => {
        let difference = seconds*1000 - Date.now();
        let timeLeft = {
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
        }

        if (difference < -60000) {
            this.state.summaries.shift();
            this.state.filteredSummaries.shift();
        }

        return timeLeft;
    }

    filterRaceType = (id) => {
        let races = this.state.summaries;
        let filteredRaces = races.filter(race => race.category_id === id);
        this.setState({ filteredSummaries: filteredRaces});
    }

    resetFilter = () => {
        this.setState({ filteredSummaries: this.state.summaries});
    }

    render() {
        const greyhound = '9daef0d7-bf3c-4f50-921d-8e818c60fe61';
        const harness = '161d9be2-e909-4326-8c2c-35ed71fb460b';
        const horse = '4a2788f8-e825-4d36-9894-efd4baf1cfae';
        return (
            <div>
                <button onClick={() => this.filterRaceType(greyhound)}>Greyhound racing</button>
                <button onClick={() => this.filterRaceType(harness)}>Harness racing</button>
                <button onClick={() => this.filterRaceType(horse)}>Horse racing</button>
                <button onClick={() => this.resetFilter()}>Reset Filter</button>
                {this.state.filteredSummaries.slice(0, 5).map((race, i) => {
                    const timeLeft = this.calculateTimeLeft(race.advertised_start.seconds);
                    return (
                        <div key={race.race_id}>
                            <h4>{i+1}</h4>
                            <div>
                                Meeting Name: {` ${race.meeting_name}`}
                            </div>
                            <div>
                                Race Number: {` ${race.race_number}`}
                            </div>
                            <div>
                                Minutes: {` ${timeLeft.minutes} `}
                                Seconds: {` ${timeLeft.seconds} `}
                            </div>         
                        </div>
                    )
                })}
            </div>
        )
    }
}