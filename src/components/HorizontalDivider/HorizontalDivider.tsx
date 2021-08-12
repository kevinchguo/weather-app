import { FC } from 'react';

import './index.css';

const Divider: FC = ({ children }) => (
    <div className="container">
        <div className="border" />
        <span className="content">{children}</span>
        <div className="border" />
    </div>
);

export default Divider;
