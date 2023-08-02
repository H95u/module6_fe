import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

function MyNavbar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <header>
            <Navbar bg='light' expand='lg' expanded={expanded}>
                <Container>
                    <Navbar.Brand href='#home'>My Website</Navbar.Brand>
                    <Navbar.Brand> Login </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={() => setExpanded(expanded ? false : "expanded")} />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link href='#home'>Home</Nav.Link>
                            <Nav.Link href='#features'>Features</Nav.Link>
                            <Nav.Link href='#pricing'>Pricing</Nav.Link>
                            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                                <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                                <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div
                className='p-5 text-center bg-image'
                style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                            <h1 className='mb-3'>Heading</h1>
                            <h4 className='mb-3'>Subheading</h4>
                            <Button variant='outline-light' size='lg'>
                                Call to action
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default MyNavbar;