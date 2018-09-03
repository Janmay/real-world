import * as React from 'react';
import { Link } from 'react-router-dom'

export interface UserProps {
    user: {
        login?: string;
        avatarUrl?: string;
        name?: string;
    }
}
const User: React.SFC<UserProps> = ({ user: { login, avatarUrl, name } }) => (
    <div className='User'>
        <Link to={`/${login}`}>
            <img src={avatarUrl} alt={login} width='72' height='72' />
            <h3>
                {login} {name && <span>({name})</span>}
            </h3>
        </Link>
    </div>
)

export default User