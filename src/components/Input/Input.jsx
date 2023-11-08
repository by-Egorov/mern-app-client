import React from 'react'

const Input = ({ label, className, ...props }) => {
  return (
    <div className={`${className} input-default-style`}>
      <label>
        {label}
        <input  {...props}/>
      </label>
    </div>
  )
}
export default Input
