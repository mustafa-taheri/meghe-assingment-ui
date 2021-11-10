import React, { useState } from 'react'
import { Col, Input, Select, Row, Spin, Button, Typography, message, notification } from 'antd'
import "./SignUp.css"
import { UserOutlined } from '@ant-design/icons'
import logo from '../../Assets/logo.jpeg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { api_enpoint } from '../../config/env'

const { Option } = Select
const { Text } = Typography
const SignUp = props => {

    const [displayLoading, setdisplayLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState(undefined)
    const [gender, setGender] = useState('male')
    const [password, setpassword] = useState('')

    function checkValidation() {
        let _validate = true;
        let _emailRex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let _mobRex = new RegExp(/^[0-9\b]+$/)
        if (fullName.trim() === "") {
            message.error('Full Name cannot be blank ');
            return _validate = false;
        }
        if (email.trim() === "") {
            message.error('Email Address cannot be blank ');
            return _validate = false;
        }
        if (!_emailRex.test(email)) {
            message.error('Invalid Email Address');
            return _validate = false;
        }
        if (!_mobRex.test(mobile)) {
            message.error('Enter Only Numbers');
            return _validate = false;
        }
        if (mobile.length != 10) {
            message.error('Invalid Mobile Number');
            return _validate = false;
        }
        if (password.trim() === "") {
            message.error('Password cannot be blank');
            return _validate = false;
        }
        return _validate
    }
    const handleRegistrationClick = () => {
        if (checkValidation()) {
            setdisplayLoading(true)
            axios({
                method: 'POST',
                url: api_enpoint.base_url + api_enpoint.register,
                data: {
                    fullname: fullName,
                    mobile: mobile,
                    gender: gender,
                    email: email,
                    password: password
                }
            })
                .then(response => {
                    if (response.status === 200 || 201) {
                        setdisplayLoading(false)
                        setEmail('')
                        setFullName('')
                        setGender('male')
                        setMobile(undefined)
                        setpassword('')
                        notification['success']({
                            message: "Registration Successful",
                        });
                        alert(JSON.stringify(response.data))
                        props.history.push('/')

                    }
                })
                .catch(error => {
                    setdisplayLoading(false)
                    notification['error']({
                        message: error.response?.data ? error.response.data.message : "Unable Create",
                    });
                })
        }
    }

    return (
        <Spin
            spinning={displayLoading}
            tip={"Loading Please Wait"}
        >
            <div className="login-background">
                <div className='login-overlay'></div>
                <div className="login-card">
                    <Row>
                        <img height={110} width={150} src={logo} alt="logo" />
                    </Row>
                    <Row style={{ textAlign: "center", padding: 5 }}>
                        <h1>{"Student Registration Form"}</h1>
                    </Row>
                    <div style={{ width: "100%", padding: "16px 32px 0px 32px" }}>
                        <Row style={{ marginBottom: 20 }}>
                            <Col xs={24}>
                                <Input
                                    value={fullName}
                                    size='large'
                                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Full Name"
                                    type="text"
                                    onChange={(event) => setFullName(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 20 }}>
                            <Col xs={24}>
                                <Input
                                    value={email}
                                    size='large'
                                    addonBefore="@"
                                    placeholder="Email Address"
                                    type="text"
                                    onChange={(event) => setEmail(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 20 }}>
                            <Col xs={24}>
                                <Input
                                    value={mobile}
                                    size='large'
                                    addonBefore="+91 "
                                    placeholder="Mobile Number"
                                    type="number"
                                    onChange={(event) => setMobile(event.target.value)} />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 20 }}>
                            <Col xs={24}>
                                <Select
                                    style={{ width: "100%" }}
                                    value={gender}
                                    size='large'
                                    onChange={(value) => setGender(value)}>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">other</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 20 }}>
                            <Col xs={24}>
                                <Input.Password
                                    value={password}
                                    size='large'
                                    placeholder="Password"
                                    type="text"
                                    onChange={(event) => setpassword(event.target.value)} />
                            </Col>
                        </Row>
                        <div style={{ width: "100%", padding: "0px 32px 0px 32px" }}>
                            <Button
                                type='primary'
                                size="large"
                                onClick={handleRegistrationClick}
                                style={{ justifyContent: "center", alignItems: "center" }}
                                block
                            >
                                {"Register"}
                            </Button>
                        </div>
                        <Row justify='center' style={{ marginTop: 20 }}>
                            <Col xs={24} md={12}>
                                <Text style={{ fontSize: 15 }}>Already have an account..? <Link to='/'>Click Here</Link></Text>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default SignUp
