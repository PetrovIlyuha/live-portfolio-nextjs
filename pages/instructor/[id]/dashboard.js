import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/router";
import BaseLayout from "../../../layouts/BaseLayout";
import { Card, Button } from "react-bootstrap";

const InstructorDashboard = () => {
  const router = useRouter();
  const instructorId = router.query.id || "";
  return (
    <BaseLayout>
      <div className="container h-100">
        <div className="bwm-form mt-5">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">
                Instructor Projects - {instructorId}
              </h1>
              <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                  <Card.Title>Project Title</Card.Title>
                  <Card.Text>test test test test...</Card.Text>
                  <Button variant="outline-primary">Link to somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(
  withAuth(InstructorDashboard, ["admin", "instructor"])
);
