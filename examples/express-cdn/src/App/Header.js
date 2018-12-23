import React from 'react';
import { StaticCSS as CSS } from '../../../../';

function Header() {
    return (
        <header className="fake-header">
            My header
        </header>
    );
};

Header.displayName = "Header";

export default CSS(Header);
