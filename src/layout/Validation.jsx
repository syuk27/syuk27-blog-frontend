import { useEffect, useState } from "react";

const Validation = ({ value, patten, className, children }) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(true);
    if (value) {
      setIsValid(patten.test(value));
    }
  }, [value]);

  if (!className) {
    className = "text-red-500 text-sm";
  }

  return (
    <>{isValid === false && <span className={className}>{children}</span>}</>
  );
};

export default Validation;
