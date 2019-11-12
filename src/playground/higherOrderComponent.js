// Higher Order Component (HOC) the one that renders another component
// reuse code
// render hijacking
// prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';


 const Info = (props) => (
     <div>
         <h1>Info
             <p>The info is: {props.info}</p>
         </h1>
     </div>
 );

// const withAdminWarning = (WrappedComponent) => {
// return (props) => (
//     <div>
//         { props.isAdmin &&  <p>This is private info. Please don't share</p> }
//         <WrappedComponent {...props}/>
//     </div>
// )
// }

// function that creates a higher order component; the component that passed in will be wrapped in some JSX

const requireAuthentication = (WrappedComponent) => {
    
    return (props) => (
        <div>
        {props.isAuthenticated  ? 
            (<WrappedComponent {...props} />) : 
            (<p>Log in to see the information!!!</p>)
        }
        </div>
           
        
    )
}

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


//  ReactDOM.render(<AdminInfo isAdmin={false} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="There are the details" />, document.getElementById('app'));