import Button from "../layout/Button";

export default function Search() {
    function clickHandler() {

    }

    return (
        <div className="d-flex justify-content-center mt-4">
        <form className="d-flex">
          <input
            className="form-control me-2 w-50"
            type="text"
            placeholder="Search"
            readOnly
          />
          <Button onClick={clickHandler}>Search</Button>
        </form>
      </div>
    );
}