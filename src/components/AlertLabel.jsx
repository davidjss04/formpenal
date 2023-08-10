import PropTypes from 'prop-types';

const AlertLabel = ({
  label,
  id,
  name,
  type,
  onChange,
}) => {
  return (
    <div className="alert alert-info text-start">
      <strong
        className="text-success-emphasis fw-bold pb-1"
        htmlFor="name"
      >
        {label}
      </strong>
      {
        id && (
          <div className="d-flex flex-row bd-highlight justify-content-start pt-2">
            <div className="m-0 p-0">
              <label
                className="form-check-label"
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "0.5rem",
                }}
                htmlFor="anonymous"
              >
                Sí
              </label>
              <input
                id={id}
                name={name}
                type={type}
                value="true"
                onChange={onChange}
              />
            </div>
            <div className="m-0 p-0">
              <label
                className="form-check-label"
                htmlFor="anonymous"
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "0.5rem",
                }}
              >
                No
              </label>
              <input
                id={id}
                name={name}
                type={type}
                value="false"
                onChange={onChange}
                defaultChecked
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

AlertLabel.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

AlertLabel.defaultProps = {
  label: '',
  id: '',
  name: '',
  type: '',
  onChange: () => { },
};


export default AlertLabel;
