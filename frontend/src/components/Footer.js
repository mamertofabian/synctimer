import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Footer = () => {
  const activeTimerState = useSelector((state) => state.activeTimerState);
  const { activeTimer } = activeTimerState;

  return (
    <footer className={!activeTimer ? "show" : ""}>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; SharedTimer</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
