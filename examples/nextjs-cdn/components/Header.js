import { StaticCSS as CSS } from '../../../';

function Header() {
    return (
        <div className="example-header">
            My example Header
        </div>
    );
}

Header.displayName = "Header";

export default CSS(Header);
