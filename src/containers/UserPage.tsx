import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { loadUser, loadStarred } from '../actions'
import User from '../components/User'
import Repo from '../components/Repo'
import List from '../components/List'
import { zip } from 'lodash'
import { StoreState } from '../reducers';

export interface UserPageProps {
    login: string;
    user?: object;
    starredPagination?: {
        ids: [],
        isFetching: boolean
    };
    starredRepos: object[];
    starredRepoOwners: object[];
    loadUser: typeof loadUser;
    loadStarred: typeof loadStarred;
}

export type UserPageRouteProps = UserPageProps & RouteComponentProps<any>;

const loadData = ({ login, loadUser: loadUserData, loadStarred: loadStarredData }: UserPageProps) => {
    loadUserData(login, [ 'name' ])
    loadStarredData(login)
}

class UserPage extends React.Component<UserPageProps> {
    componentWillMount() {
        loadData(this.props)
    }

    componentWillReceiveProps(nextProps: UserPageProps) {
        if (nextProps.login !== this.props.login) {
            loadData(nextProps)
        }
    }

    handleLoadMoreClick = () => {
        this.props.loadStarred(this.props.login, true)
    }

    renderRepo = ([ repo, owner ]: [{fullName: string}, object]) => {
        return (
            <Repo repo={repo} owner={owner} key={repo.fullName} />
        )
    }

    render() {
        const { login, user } = this.props
        if (!user) {
            return <h1><i>Loading {login}{"'s profile..."}</i></h1>
        }

        const { starredRepos, starredRepoOwners, starredPagination } = this.props
        const { isFetching, ...restStarredPagination } = starredPagination!
        return (
            <div>
                <User user={user} />
                <hr/>
                <List
                    renderItem={this.renderRepo}
                    items={zip(starredRepos, starredRepoOwners)}
                    onLoadMoreClick={this.handleLoadMoreClick}
                    loadingLabel={`Loading ${login}'s starred...`}
                    isFetching={isFetching}
                    {...restStarredPagination}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState, ownProps: UserPageRouteProps) => {
    const login: string = ownProps.match.params.login.toLowerCase()

    const {
        pagination: { starredByUser },
        entities: { users, repos }
    } = state

    const user: UserPageProps['user'] = users![login]
    const starredPagination: UserPageProps['starredPagination'] = starredByUser[login] || { ids: [] }
    const starredRepos: UserPageProps['starredRepos'] = starredPagination!.ids.map((id:string) => repos![id])
    const starredRepoOwners: UserPageProps['starredRepoOwners'] = starredRepos.map((repo: {owner: string}) => users![repo.owner])

    return {
        login,
        starredPagination,
        starredRepoOwners,
        starredRepos,
        user
    }
}

export default withRouter(connect(mapStateToProps, {
    loadStarred,
    loadUser
})(UserPage))
