import * as React from 'react';
import { Button, Input, Row, Col } from 'antd';

const GITHUB_REPO = 'https://github.com/reduxjs/redux'

export interface ExploreProps {
    value: string;
    onChange: (nextValue: string) => void
}

class Explore extends React.Component<ExploreProps> {

    handleGoClick = (value: string) => {
        this.props.onChange(value)
    }

    render() {
        return (
            <div>
                <p>Type a username or repo full name and hit 'Go':</p>
                <Row>
                    <Col span={12}>
                        <Input.Search
                            defaultValue={this.props.value}
                            onSearch={this.handleGoClick}
                            enterButton={<Button type='primary'>Go!</Button>}
                        />
                    </Col>
                </Row>
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