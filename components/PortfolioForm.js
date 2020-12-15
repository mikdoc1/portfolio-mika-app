import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';

const formValues = {
  title: '',
  company: '',
  companyWebsite: '',
  location: '',
  jobTitle: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
};

const PortfolioForm = ({ onSubmit, initialData }) => {
  const formik = useFormik({
    initialValues: initialData ? initialData : formValues,
    onSubmit,
    enableReinitialize: true,
  });

  const { values, handleSubmit, handleChange, getFieldProps, setFieldValue } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...getFieldProps()}
          name="title"
          type="text"
          className="form-control"
          id="title"
          value={values.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          {...getFieldProps()}
          name="company"
          type="text"
          className="form-control"
          id="company"
          value={values.company}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="companyWebsite">Company Website</label>
        <input
          {...getFieldProps()}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"
          value={values.companyWebsite}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          {...getFieldProps()}
          name="location"
          type="text"
          className="form-control"
          id="location"
          value={values.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          {...getFieldProps()}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
          value={values.jobTitle}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...getFieldProps()}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <div>
          <DatePicker
            {...getFieldProps()}
            name="startDate"
            showYearDropdown
            selected={values.startDate}
            onChange={(val) => setFieldValue('startDate', val)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <div>
          <DatePicker
            {...getFieldProps()}
            name="endDate"
            showYearDropdown
            selected={values.endDate}
            onChange={(val) => setFieldValue('endDate', val)}
          />
        </div>
      </div>
      <div className="form-group">
        {values.endDate && (
          <button type="button" className="btn btn-danger" onClick={() => setFieldValue('endDate', null)}>
            No End Date
          </button>
        )}
        {!values.endDate && (
          <button type="button" className="btn btn-success" onClick={() => setFieldValue('endDate', new Date())}>
            Set End Date
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? 'Edit' : 'Create'}
      </button>
    </form>
  );
};

export default PortfolioForm;
