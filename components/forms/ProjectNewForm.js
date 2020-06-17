import { useForm } from "react-hook-form";

const ProjectNewForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();
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
        <input
          ref={register}
          name="startDate"
          type="text"
          className="form-control"
          id="startDate"
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <input
          ref={register}
          name="endDate"
          type="text"
          className="form-control"
          id="endDate"
        />
      </div>
      <div className="form-group">
        <label htmlFor="progress">Is in progress Now?</label>
        <input
          type="text"
          ref={register}
          name="progress"
          className="form-control"
          id="progress"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default ProjectNewForm;
