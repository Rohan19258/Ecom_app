import Toast from 'react-bootstrap/Toast';

 
function Toastify(props) {



  return (
    <>

        <Toast
        // variant="secondary"
          className="d-inline-block m-1"
          bg="primary"
    position="top-start"
        >
          <Toast.Header>
            <img
              src=""
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body >
        {props.text}
          </Toast.Body>
        </Toast>
 
    </>
  );
}

export default Toastify;