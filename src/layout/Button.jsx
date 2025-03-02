export default function Button({children, onClick, isDisabled, className}) {
  if(!className) {
    className = "btn btn-success";
  } 
  
  return (
    <button className={className} type="submit" onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
}
