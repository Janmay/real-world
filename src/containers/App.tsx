import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import Explore from '../components/Explore';
import { resetErrorMessage } from '../actions';
import { ErrorMessageState } from '../reducers';

interface Props {
    errorMessage?: string | null;
    inputValue: string;
    children: React.ReactNode;
}

export type AppProps = Props & RouteComponentProps<any>;

const App: React.SFC<AppProps> = ({errorMessage, inputValue, children, history}) => {
    const handleDismissClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        resetErrorMessage()
        e.preventDefault()
    }

    const handleChange = (nextValue: string) => {
        history.push(`/${nextValue}`)
    }

    const renderErrorMessage = () => {
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                <button onClick={handleDismissClick}>Dismiss</button>
            </p>
        )
    }

    return (
        <div>
            <Explore value={inputValue} onChange={handleChange} />
            <hr/>
            {renderErrorMessage()}
            {children}
        </div>
    )
}

const mapStateToProps = ({ errorMessage }: ErrorMessageState, ownProps: AppProps) => ({
    errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
})

const mapDispatchToProps = () => ({
    resetErrorMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))