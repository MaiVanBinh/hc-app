import React from 'react';
import classes from './Paginator.module.css';

const paginator = props => (
  <div className={classes.Paginator}>
    <div className={classes.Paginator__controls}>
      {props.prev ?  
        <button className={classes.Paginator__control} onClick={props.prevClicked}>
          Previous
        </button> : null
        }
        {props.next ?  
        <button className={classes.Paginator__control} onClick={props.nextClicked}>
          Next
        </button> : null }
    </div>
  </div>
);

export default paginator;
