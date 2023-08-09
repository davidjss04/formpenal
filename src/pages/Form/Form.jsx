import { useFormik } from 'formik'

const Form = () => {
    return (
        <div className="container">
            <div className='row h-auto'>
                <div className='col align-items-center'>
                    <h3>LOGO</h3>
                </div>
            </div>
            <div className='card-body mb-3 text-center'>
                <div className='row h-auto border'>
                    <div className='border p-3 bg-body-secondary'>
                        <h3 className='fw-bold'>LÍNEA ÉTICA INDEPENDIENTE</h3>
                    </div>
                    <div className='border'>
                        <p>Formulario de Registro de Denuncia</p>
                    </div>
                    <div className='container p-4'>
                        <div className='d-flex-colunm text-start border p-2 rounded bg-info-subtle bg-opacity-25'>
                            <label className='text-success-emphasis fw-bold pb-1' htmlFor="name">¿Desea presentar una denuncia de forma anónima?</label>
                            <div className='row justify-content-start'>
                                <div className='col-1'>
                                    <label className='form-check-label' style={{
                                        paddingLeft: '1rem',
                                        paddingRight: '0.5rem',
                                    }} htmlFor="anonymous">Sí</label>
                                    <input type="radio" name="anonymous" id="anonymous" />
                                </div>
                                <div className='col-1'>
                                    <label className='form-check-label' htmlFor="anonymous" style={{
                                        paddingLeft: '1rem',
                                        paddingRight: '0.5rem',
                                    }}>No</label>
                                    <input type="radio" name="anonymous" id="anonymous" />
                                </div>
                            </div>
                        </div>
                        <div className='row p-3'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>Correo electrónico a donde se le notificará :</label>
                            <div className="col-sm-8">
                                <input type="email" className='form-control' id="inputEmail3" />
                            </div>
                        </div>
                        <div className='row p-3'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>Relación con la Entidad, donde se presentó el hecho denunciado:</label>
                            <div className="col-sm-8">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Seleccione una opción</option>
                                    <option value="1">Opción 1</option>
                                    <option value="2">Opción 2</option>
                                    <option value="3">Opción 3</option>
                                </select>
                            </div>
                        </div>
                        <div className='d-flex-colunm rounded bg-info-subtle bg-opacity-25'>
                            <p className='p-2 text-success-emphasis fw-bold text-start' htmlFor="name">1. DATOS DEL DENUNCIANTE (en caso no haya seleccionado la opcion de anónimo)</p>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>TIPO DE PERSONA:</label>
                            <div className="col-sm-8">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Seleccione una opción</option>
                                    <option value="1">Opción 1</option>
                                    <option value="2">Opción 2</option>
                                    <option value="3">Opción 3</option>
                                </select>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>DNI :</label>
                            <div className="col-sm-8">
                                <input type="email" className='form-control' id="inputEmail3" />
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>APELLIDO PATERNO:</label>
                            <div className="col-sm-8">
                                <input type="email" className='form-control' id="inputEmail3" />
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>APELLIDO MATERNO:</label>
                            <div className="col-sm-8">
                                <input type="email" className='form-control' id="inputEmail3" />
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>NOMBRES:</label>
                            <div className="col-sm-8">
                                <input type="email" className='form-control' id="inputEmail3" />
                            </div>
                        </div>
                        <div className='d-flex-colunm rounded bg-info-subtle bg-opacity-25'>
                            <p className='p-2 text-success-emphasis fw-bold text-start' htmlFor="name">2. INFORMACIÓN DE LA DENUNCIA</p>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>Seleccione el tipo de infracción a denunciar:</label>
                            <div className="col-sm-8">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Seleccione una opción</option>
                                    <option value="1">Opción 1</option>
                                    <option value="2">Opción 2</option>
                                    <option value="3">Opción 3</option>
                                </select>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>Indique la Entidad, donde ocurrieron los hechos a denunciar:</label>
                            <div className="col-sm-8">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Seleccione una opción</option>
                                    <option value="1">Opción 1</option>
                                    <option value="2">Opción 2</option>
                                    <option value="3">Opción 3</option>
                                </select>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>Indique la unidad orgánica o proceso donde han ocurrido los hechos a denunciar:</label>
                            <div className="col-sm-8">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Seleccione una opción</option>
                                    <option value="1">Opción 1</option>
                                    <option value="2">Opción 2</option>
                                    <option value="3">Opción 3</option>
                                </select>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label htmlFor="inputEmail3" className='fw-bold fs-6 col-sm-4 col-form-label text-start'>¿En qué fecha ocurrió el hecho de la denuncia? (aproximado):</label>
                            <div className="col-sm-8">
                                <input type="date" className='form-control' id="inputEmail3" />
                            </div>
                        </div>

                        <div className='col'>
                            <h3>FORM</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Form
