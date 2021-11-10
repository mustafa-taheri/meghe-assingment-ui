import { Button, Col, Divider, Input, notification, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import logo from '../../Assets/logo.jpeg'
import { UserOutlined } from '@ant-design/icons'
import { api_enpoint } from '../../config/env'
import axios from 'axios'

const { Text, Title } = Typography
const Login = (props) => {
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [displayLoading, setdisplayLoading] = useState(false)

    function checkValidation() {
        let _validate = true;
        if (userName.trim() === "") {
            notification["error"]({
                message: "Invalid User Name"
            });
            _validate = false;
        }
        if (password.trim() === "") {
            notification["error"]({
                message: "Invalid Password",
            });
            _validate = false;
        }
        return _validate
    }

    const handleLoginClick = () => {
        if (checkValidation()) {
            setdisplayLoading(true)
            axios({
                method: 'POST',
                url: api_enpoint.base_url + api_enpoint.login,
                data: {
                    email: userName,
                    password: password
                }
            })
                .then(response => {
                    if (response.status === 200 || 201) {
                        setdisplayLoading(false)
                        setuserName('')
                        setpassword('')
                        notification['success']({
                            message: "Login Successfully",
                        });
                        alert(JSON.stringify(response.data))
                    }
                })
                .catch(error => {
                    setdisplayLoading(false)
                    notification['error']({
                        message: error.response && error.response.data ? error.response.data.message : "Unable Create",
                    });
                })
        }
    }

    return (
        <div>
            <header className='header'>
                <img src={logo} alt="logo" />
                <Row>
                    <Col>
                        <Text style={{ fontSize: 18 }}>Don't have an account? <Link to='/signup'>Sign Up</Link> here</Text>
                    </Col>
                </Row>
            </header>
            <Row style={{ textAlign: 'center' }}>
                <Col xs={24}>
                    <Title level={2}>Sign In</Title>
                </Col>
            </Row>
            <Row style={{ textAlign: 'center', padding: 20 }}>
                <Col xs={24} md={11}>
                    <div className='signInWith'>
                        <img width={400} src="https://androidexample365.com/content/images/2019/11/GButton.jpg" />
                    </div>
                </Col>
                <Col md={2}>
                    <Divider type='vertical' orientation='center' style={{ height: '90%' }} />
                </Col>
                <Col xs={24} md={11}>
                    <Row style={{ marginBottom: 20 }}>
                        <Col xs={24} md={12}>
                            <Input
                                value={userName}
                                size='large'
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username / Email ID"
                                type="text"
                                onChange={(event) => setuserName(event.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Col xs={24} md={12}>
                            <Input.Password
                                value={password}
                                size='large'
                                placeholder="Password"
                                type="text"
                                onChange={(event) => setpassword(event.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Col xs={24} md={12}>
                            <Button
                                loading={displayLoading}
                                size='large'
                                block
                                type='primary'
                                onClick={handleLoginClick}>
                                LOG IN
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Col xs={24} md={12}>
                            <Link to='/resetPassword'><Text style={{ fontSize: 15 }}>Forgot Password..?</Text></Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Login