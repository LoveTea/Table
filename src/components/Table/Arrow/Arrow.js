import React from "react";

export default (props) => {
  return (
    <span>
        {props.sortType === 'asc' ? <small>▼</small> : <small>▲</small>}
    </span>
  );
};