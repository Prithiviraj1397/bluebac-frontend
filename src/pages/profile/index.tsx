import { FC, Fragment, useEffect, useState } from "react"
import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import Pageheader from "../../components/pageheader/pageheader"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { Scrollbar } from 'react-scrollbars-custom';
import { Friendsdata } from "./profiledata"
import media17 from "../../assets/images/media/media-17.jpg"
import media75 from "../../assets/images/media/media-75.jpg"
import media18 from "../../assets/images/media/media-18.jpg"
import media39 from "../../assets/images/media/media-39.jpg"
import media59 from "../../assets/images/media/media-59.jpg"
import media60 from "../../assets/images/media/media-60.jpg"
import media61 from "../../assets/images/media/media-61.jpg"
import media26 from "../../assets/images/media/media-26.jpg"
import media29 from "../../assets/images/media/media-29.jpg"
import face11 from "../../assets/images/faces/11.jpg"
import face2 from "../../assets/images/faces/2.jpg"
import face4 from "../../assets/images/faces/4.jpg"
import face5 from "../../assets/images/faces/5.jpg"
import face8 from "../../assets/images/faces/8.jpg"
import face9 from "../../assets/images/faces/9.jpg"
import face10 from "../../assets/images/faces/10.jpg"
import filemanager3 from "../../assets/images/media/file-manager/3.png"
import { IReducer } from "../../redux/interface"
import { useSelector } from "react-redux"
import CreateSubAdmin from "./createSubAdmin"
import SideModal from "../../components/common/sideModal/sideModal"

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const admin_user = useSelector((state: IReducer) => state.userReducer.admin_user)
  const { username, role } = admin_user.data
  const [tab, setTab] = useState<string>("activity")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = window.location.search
  const params = new URLSearchParams(url)
  const tabParams = params.get("tab")

  const tabHandler = (eventKey: any) => {
    navigate(`${location.pathname}?tab=${eventKey}`)
    setTab(eventKey)
  }

  useEffect(() => {
    if (tabParams) {
      setTab(tabParams)
    }
  }, [tabParams])

  return (
    <Fragment>
      <Pageheader title="Profile" heading="User" active="Profile" />
      <Row>
        <Col xxl={4} xl={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body className="card-body p-0">
              <div className="d-sm-flex align-items-top p-4 border-bottom-0 main-profile-cover">
                <div>
                  <span className="avatar avatar-xxl avatar-rounded online me-3">
                    <img src={face9} alt="" />
                  </span>
                </div>
                <div className="flex-fill main-profile-info">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="fw-semibold mb-1 text-fixed-white">{username}</h6>
                    <Button variant="" className="btn btn-sm btn-outline-secondary btn-wave">
                      <i className="ri-edit-line me-1 align-middle d-inline-block"></i>Edit
                    </Button>
                  </div>
                  <p className="mb-2 text-muted text-fixed-white op-7">{role.role}</p>
                  <p className="fs-12 text-fixed-white mb-0 op-5">
                    <span className="me-3">
                      <i className="ri-building-line me-1 align-middle"></i>United Kingdom
                    </span>
                    <span>
                      <i className="ri-checkbox-circle-line me-1 align-middle"></i> Active
                    </span>
                  </p>
                </div>
              </div>
              <div className="p-4 border-bottom border-block-end-dashed">
                <div className="mb-2">
                  <p className="fs-15 mb-2 fw-semibold">Professional Bio :</p>
                  <p className="fs-12 text-muted op-7 mb-0">
                    I am <b className="text-default">Sonya Taylor,</b> here by conclude that,i am the founder and
                    managing director of the prestigeous company name laugh at all and acts as the cheif executieve
                    officer of the company.
                  </p>
                </div>
              </div>
              <div className="p-4 border-bottom border-block-end-dashed">
                <p className="fs-15 mb-2 me-4 fw-semibold">About :</p>
                <div className="text-muted">
                  <p className="mb-2">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                      <i className="ri-mail-line align-middle fs-14"></i>
                    </span>
                    sonyataylor2531@gmail.com
                  </p>
                  <p className="mb-2">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                      <i className="ri-phone-line align-middle fs-14"></i>
                    </span>
                    +(555) 555-1234
                  </p>
                  <p className="mb-0">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                      <i className="ri-map-pin-line align-middle fs-14"></i>
                    </span>
                    MIG-1-11, Monroe Street, Georgetown, Washington D.C, USA,20071
                  </p>
                </div>
              </div>
              <div className="p-4 border-bottom border-block-end-dashed">
                <p className="fs-15 mb-2 me-4 fw-semibold">Contact Information :</p>
                <div className="text-muted">
                  <p className="mb-2">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                      <i className="ri-mail-line align-middle fs-14"></i>
                    </span>
                    sonyataylor2531@gmail.com
                  </p>
                  <p className="mb-2">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                      <i className="ri-phone-line align-middle fs-14"></i>
                    </span>
                    +(555) 555-1234
                  </p>
                  <p className="mb-0">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-muted">
                      <i className="ri-map-pin-line align-middle fs-14"></i>
                    </span>
                    MIG-1-11, Monroe Street, Georgetown, Washington D.C, USA,20071
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={8} xl={12}>
          <Row>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Body className="p-0">
                  <div className="p-3 border-bottom border-block-end-dashed d-flex align-items-center justify-content-between">
                    <div className="nav nav-tabs mb-0 tab-style-6 justify-content-start">
                      <Button
                        variant={tab === "activity" ? "primary" : "light"}
                        className="tab_btn me-2"
                        onClick={() => tabHandler("activity")}
                      >
                        <i className="ri-file-list-line me-1 align-middle d-inline-block"></i>Activity
                      </Button>
                      <Button
                        variant={tab === "teams" ? "primary" : "light"}
                        className="tab_btn"
                        onClick={() => tabHandler("teams")}
                      >
                        <i className="ri-group-line me-1 align-middle d-inline-block"></i>Teams
                      </Button>
                    </div>

                    <div>{tab === "teams" && <Button className="tab_btn" onClick={handleShow}>Create Sub-Admin User</Button>}</div>
                  </div>
                  <div className="p-3">
                    {tab === "activity" && (
                      <div className="animate__animated animate__fadeIn animate__faster">
                        <ul className="list-unstyled profile-timeline">
                          <li>
                            <div>
                              <span className="avatar avatar-sm bg-primary-transparent avatar-rounded profile-timeline-avatar">
                                E
                              </span>
                              <p className="mb-2">
                                <b>You</b> Commented on <b>alexander taylor</b> post{" "}
                                <Link className="text-secondary" to="#">
                                  <u>#beautiful day</u>
                                </Link>
                                .<span className="float-end fs-11 text-muted">24,Dec 2022 - 14:34</span>
                              </p>
                              <p className="profile-activity-media mb-0">
                                <Link to="#">
                                  <img src={media17} alt="" />
                                </Link>
                                <Link to="#">
                                  <img src={media18} alt="" />
                                </Link>
                              </p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                <img src={face11} alt="" />
                              </span>
                              <p className="text-muted mb-2">
                                <span className="text-default">
                                  <b>Json Smith</b> reacted to the post &#128077;
                                </span>
                                .<span className="float-end fs-11 text-muted">18,Dec 2022 - 12:16</span>
                              </p>
                              <p className="text-muted mb-0">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, repellendus
                                rem rerum excepturi aperiam ipsam temporibus inventore ullam tempora eligendi
                                libero sequi dignissimos cumque, et a sint tenetur consequatur omnis!
                              </p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                <img src={face4} alt="" />
                              </span>
                              <p className="text-muted mb-2">
                                <span className="text-default">
                                  <b>Alicia Keys</b> shared a document with <b>you</b>
                                </span>
                                .<span className="float-end fs-11 text-muted">21,Dec 2022 - 15:32</span>
                              </p>
                              <p className="profile-activity-media mb-0">
                                <Link to="#">
                                  <img src={filemanager3} alt="" />
                                </Link>
                                <span className="fs-11 text-muted">432.87KB</span>
                              </p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <span className="avatar avatar-sm bg-success-transparent avatar-rounded profile-timeline-avatar">
                                P
                              </span>
                              <p className="text-muted mb-2">
                                <span className="text-default">
                                  <b>You</b> shared a post with 4 people <b>Simon,Sasha,Anagha,Hishen</b>
                                </span>
                                .<span className="float-end fs-11 text-muted">28,Dec 2022 - 18:46</span>
                              </p>
                              <p className="profile-activity-media mb-2">
                                <Link to="#">
                                  <img src={media75} alt="" />
                                </Link>
                              </p>
                              <div>
                                <div className="avatar-list-stacked">
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img src={face2} alt="img" />
                                  </span>
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img src={face8} alt="img" />
                                  </span>
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img src={face2} alt="img" />
                                  </span>
                                  <span className="avatar avatar-sm avatar-rounded">
                                    <img src={face10} alt="img" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div>
                              <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                <img src={face5} alt="" />
                              </span>
                              <p className="text-muted mb-1">
                                <span className="text-default">
                                  <b>Melissa Blue</b> liked your post <b>travel excites</b>
                                </span>
                                .<span className="float-end fs-11 text-muted">11,Dec 2022 - 11:18</span>
                              </p>
                              <p className="text-muted">
                                you are already feeling the tense atmosphere of the video playing in the background
                              </p>
                              <p className="profile-activity-media mb-0">
                                <Link to="#">
                                  <img src={media59} className="m-1" alt="" />
                                </Link>
                                <Link to="#">
                                  <img src={media60} className="m-1" alt="" />
                                </Link>
                                <Link to="#">
                                  <img src={media61} className="m-1" alt="" />
                                </Link>
                              </p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                <img src={media39} alt="" />
                              </span>
                              <p className="mb-1">
                                <b>You</b> Commented on <b>Peter Engola</b> post{" "}
                                <Link className="text-secondary" to="#">
                                  <u>#Mother Nature</u>
                                </Link>
                                .<span className="float-end fs-11 text-muted">24,Dec 2022 - 14:34</span>
                              </p>
                              <p className="text-muted">
                                Technology id developing rapidly kepp uo your work &#128076;
                              </p>
                              <p className="profile-activity-media mb-0">
                                <Link to="#">
                                  <img src={media26} alt="" />
                                </Link>
                                <Link to="#">
                                  <img src={media29} alt="" />
                                </Link>
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                    {tab === "teams" && (
                      <div className="animate__animated animate__fadeIn animate__faster">
                        <Row>
                          {Friendsdata.map(idx => (
                            <Col xxl={4} xl={4} lg={6} md={6} sm={12} key={Math.random()}>
                              <Card className="custom-card shadow-none border">
                                <Card.Body className="card-body p-4">
                                  <div className="text-center">
                                    <span className="avatar avatar-xl avatar-rounded">
                                      <img src={idx.src} alt="" />
                                    </span>
                                    <div className="mt-2">
                                      <p className="mb-0 fw-semibold">{idx.name}</p>
                                      <p className="fs-12 op-7 mb-1 text-muted">{idx.mail}</p>
                                      <Badge bg={idx.color} className="badge rounded-pill">
                                        {idx.badge}
                                      </Badge>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                          <Col xl={12}>
                            <div className="text-center mt-4">
                              <Button variant="" className="btn btn-primary-light btn-wave">
                                Show All
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <SideModal open={show} handleClose={handleClose} children={<CreateSubAdmin />}  />
    </Fragment>
  )
}

export default Profile
