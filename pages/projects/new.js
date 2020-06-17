import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import ProjectNewForm from "../../components/forms/ProjectNewForm";

const ProjectNew = () => {
  return (
    <>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4 text-center">
              <h1>🔥Create new project to market your skills</h1>
            </div>
          </div>
        </section>
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <h1 className="page-title">Project</h1>
              <ProjectNewForm
                onSubmit={(data) => alert(JSON.stringify(data))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withApollo(withAuth(ProjectNew, ["admin", "instructor"]));
