import { StaticCSS as CSS } from '../../../index';

function Homepage() {
    return (
        <div>
            My example homepage
        </div>
    );
}

Homepage.displayName = "Homepage";

export default CSS(Homepage);
