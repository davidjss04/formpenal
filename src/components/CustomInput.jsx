
import PropTypes from 'prop-types';


const CustomInput = (
  { id, name, label, type, placeholder, value, onChange, options = [] }
) => {
  return (
    <div className="row p-3">
      <label htmlFor={id} className="fw-bold fs-6 col-sm-4 col-form-label text-start">{label}</label>
      <div className="col-sm-8">
        {
          type !== "select" ? (
            <input
              id={id}
              name={name}
              type={type}
              className='form-control'
              onChange={onChange}
              placeholder={placeholder}
              value={value}
              required
            />
          ) : (
            <select
              id={id}
              name={name}
              className='form-select'
              onChange={onChange}
              value={value}
              defaultValue={value}
              required
            >
              <option selected>Seleccione una opción</option>
              {
                options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))
              }
            </select>

          )
        }
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }))
};

CustomInput.defaultProps = {
  id: '',
  name: '',
  label: '',
  type: '',
  placeholder: '',
  value: '',
  onChange: () => { },
  options: [],
}

export default CustomInput;



