import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { loadRepo, loadStargazers } from '../actions'
import Repo from '../components/Repo'
import User from '../components/User'
import List from '../components/List';
import { RepoProps } from '../components/Repo';
import { UserProps } from '../components/User';
import { StoreState } from '../reducers';

export interface RepoPageProps {
    fullName: string;
    repo?: RepoProps['repo'];
    owner?: RepoProps['owner'];
    name: string;
    stargazers: object[];
    stargazersPagination?: {
        isFetching: boolean
    };
    loadRepo: typeof loadRepo;
    loadStargazers: typeof loadStargazers;
}
const loadData = (props: RepoPageProps) => {
    const { fullName } = props
    props.loadRepo(fullName, [ 'description' ])
    props.loadStargazers(fullName)
}

class RepoPage extends React.Component<RepoPageProps> {
    componentWillMount() {
        loadData(this.props)
    }

    componentWillReceiveProps(nextProps: RepoPageProps) {
        if (nextProps.fullName !== this.props.fullName) {
            loadData(nextProps)
        }
    }

    handleLoadMoreClick = () => {
        this.props.loadStargazers(this.props.fullName, true)
    }

    renderUser(user: UserProps['user']) {
        return <User user={user} key={user.login} />
    }

    render() {
        const { repo, owner, name } = this.props
        if (!repo || !owner) {
            return <h1><i>Loading {name} details...</i></h1>
        }

        const { stargazers, stargazersPagination } = this.props
        const { isFetching, ...restStarredPagination } = stargazersPagination!
        return (
            <div>
                <Repo repo={repo} owner={owner} />
                <hr/>
                <List
                    renderItem={this.renderUser}
                    items={stargazers}
                    onLoadMoreClick={this.handleLoadMoreClick}
                    loadingLabel={`Loading stargazers of ${name}...`}
                    isFetching={isFetching}
                    {...restStarredPagination}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState, ownProps: RepoPageProps & RouteComponentProps<any>) => {
    const login = ownProps.match.params.login.toLowerCase()
    const name = ownProps.match.params.name.toLowerCase()

    const {
        pagination: { stargazersByRepo },
        entities: { users, repos }
    } = state

    const fullName = `${login}/${name}`
    const stargazersPagination = stargazersByRepo[fullName] || { ids: [] }
    const stargazers = stargazersPagination.ids.map((id: string) => users[id])

    return {
        fullName,
        name,
        owner: users[login],
        repo: repos[fullName],
        stargazers,
        stargazersPagination
    }
}

export default withRouter(connect(mapStateToProps, {
    loadRepo,
    loadStargazers
})(RepoPage))