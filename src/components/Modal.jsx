import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import propTypes from 'prop-types';

function ModalCustom(
    {
        show,
        handleClose,
        handleCancel,
        loading,
    }
) {
    /*     const [show, setShow] = useState(false);
    
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true); */

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>CONFIRMAR CAMBIOS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <p>¿Está seguro que desea guardar los cambios?</p>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        CANCELAR
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        CONFIRMAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalCustom.propTypes = {
    show: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
    handleCancel: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
}

ModalCustom.defaultProps = {
    show: false,
    handleClose: () => { },
    handleCancel: () => { },
    loading: false,
}

export default ModalCustom;