function Button(props) {
  var name = props.name ? props.name : "Calculate";

  return (
    <button onClick={props.onClick} >{name}</button>
  )
}


export default Button;