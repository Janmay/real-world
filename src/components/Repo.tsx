import * as React from 'react'
import { Link } from 'react-router-dom'

interface RepoProps {
    owner: {
        login?: string;
    };
    repo: {
        name?: string;
        description?: string;
        fullName?: string;
    }
}

const Repo: React.SFC<RepoProps> = ({ owner: { login }, repo: { name, description } }) => (
    <div className="Repo">
        <h3>
            <Link to={`/${login}/${name}`}>
                {name}
            </Link>
            {' by '}
            <Link to={`/${login}`}>
                {login}
            </Link>
        </h3>
        {description && <p>{description}</p>}
    </div>
)

export default Repo