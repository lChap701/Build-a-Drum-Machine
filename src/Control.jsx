import React from "react";

/* Stateless component */
export const Control = props => {
  return (
    <div className="control">
      <input 
        id={props.id}
        name={props.attributes.name}
        type={props.attributes.type}
        step={props.attributes.step}
        min={props.attributes.min}
        max={props.attributes.max}
        value={props.attributes.value}
        onChange={props.onChange}
      />
    </div>
  );
};