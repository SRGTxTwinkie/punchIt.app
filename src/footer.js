import logo from './LI-In-Bug.png'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/* create an image with a link */}
                <a href="https://github.com/SRGTxTwinkie/punchIt.app" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                        alt="Github"
                        width="50px" 
                        style={{opacity: "0.3"}}/>
                </a>
                <a href="https://www.linkedin.com/in/zane-reisbig-328119200/" target="_blank" rel="noopener noreferrer">
                    <img
                        src={logo}
                        alt="LinkedIn"
                        width="50px"
                        style={{opacity: "0.3"}}/>
                </a>
                <h5>Created by Zane Reisbig <span style={{opacity:"0.2"}}> with love </span></h5> 
            </div>
        </footer>
    );
  }


export default Footer;
