import { useForm } from "react-hook-form";
import { Button, Spinner } from "react-bootstrap";

export default function LoginForm({ onSubmit, loading }) {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register}
          type="email"
          className="form-control"
          id="email"
          name="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register}
          type="password"
          className="form-control"
          id="password"
          name="password"
        />
      </div>
      {loading ? (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="mr-3"
          />
          Loading...
        </Button>
      ) : (
        <button
          type="submit"
          className="btn btn-main btn-primary bg-blue py-2 ttu"
        >
          Submit
        </button>
      )}
    </form>
  );
}
