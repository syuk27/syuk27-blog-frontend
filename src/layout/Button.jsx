export default function Button({children, clickFnc}) {
    
  return (
    <button className="btn btn-success" type="submit" onClick={clickFnc}>
      {children}
    </button>
  );
}
