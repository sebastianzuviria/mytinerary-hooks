import './index.css'

const About = () => {
  return (
    <div className="About">
      <h3> About </h3>
      <div className="AboutContainer">
        <p>
          This page was build with ReactJS, Redux, NodeJS, Express and MongoDB by 
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/sebastian-zuviria/" className="Link"> Sebastian Zuviria <i className="fab fa-linkedin Linkedin"></i></a>
        </p>
        <div className="ListContainer">
          <h4>You can:</h4>
          <div className="List">
            <ul>
              <li>
                Login with Google.
              </li>
              <li>
                Add itineraries to favourites.
              </li>
              <li>
                Comment the itineraries and delete them.
              </li>
              <li>
                Like or dislikes comments.
              </li>
            </ul>
          </div>
        </div>
        <div>
          <i className="fab fa-github Github"></i>
          <div>
            Find the code for this page on <a target="_blank" rel="noreferrer" href="https://github.com/szuviria/mytinerary-hooks" className="Link">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
