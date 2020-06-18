import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

const ProjectNewForm = ({ onSubmit }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    register({ name: "startDate" });
    register({ name: "endDate" });
  }, [register]);

  const handleDateChange = (dateType, setDate) => (date) => {
    setValue(
      dateType,
      (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
    );
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">Project's Contents</label>
        <input
          ref={register}
          name="content"
          type="text"
          className="form-control"
          id="content"
        />
      </div>

      <div className="form-group">
        <label htmlFor="stack">Technological Stack</label>
        <input
          ref={register}
          name="stack"
          type="text"
          className="form-control"
          id="stack"
        />
      </div>

      <div className="form-group">
        <label htmlFor="link">Link</label>
        <input
          ref={register}
          name="link"
          type="text"
          className="form-control"
          id="link"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gif">Presentational GIF</label>
        <input
          ref={register}
          name="gif"
          type="text"
          className="form-control"
          id="gif"
        />
      </div>

      <div className="form-group">
        <label htmlFor="days">Days for Development</label>
        <input
          ref={register}
          name="days"
          type="text"
          className="form-control"
          id="days"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleDateChange("startDate", setStartDate)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
          <DatePicker
            showYearDropdown
            disabled={!endDate}
            selected={endDate}
            onChange={handleDateChange("endDate", setEndDate)}
          />
        </div>
      </div>
      <div className="form-group">
        {endDate ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDateChange("endDate", setEndDate)(null)}
          >
            Don't Show End Date
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleDateChange("endDate", setEndDate)(new Date())}
          >
            Set end date
          </button>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="progress">Is in progress Now?</label>
        <div>
          <select name="progress" ref={register}>
            <option name="yes">Yes</option>
            <option name="no">No</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default ProjectNewForm;
