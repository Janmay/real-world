import * as React from 'react';

const GITHUB_REPO = 'https://github.com/reduxjs/redux'

export interface ExploreProps {
    value: string;
    onChange: (nextValue: string) => void
}

class Explore extends React.Component<ExploreProps> {

    input: HTMLInputElement | null = null;

    componentWillReceiveProps(nextProps: ExploreProps) {
        if (nextProps.value !== this.props.value) {
            this.setInputValue(nextProps.value)
        }
    }

    getInputValue = () => {
        return this.input!.value
    }

    setInputValue = (val: string) => {
        this.input!.value = val;
    }

    handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            this.handleGoClick()
        }
    }

    handleGoClick = () => {
        this.props.onChange(this.getInputValue())
    }

    render() {
        return (
            <div>
                <p>Type a username or repo full name and hit 'Go':</p>
                <input
                    type="text"
                    size={45}
                    ref={(input) => this.input = input}
                    defaultValue={this.props.value}
                    onKeyUp={this.handleKeyUp}
                />
                <button onClick={this.handleGoClick}>Go!</button>
                <p>
                    Code on <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">Github</a>.
                </p>
                <p>
                    Move the DevTools with Ctrl+W or hide them with Ctrl+H.
                </p>
            </div>
        );
    }
}

export default Explore