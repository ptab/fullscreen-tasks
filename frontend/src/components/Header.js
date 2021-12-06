import React from "react"
import {Button, Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink, PopoverBody, UncontrolledPopover} from "reactstrap"

export default class Header extends React.Component {

    render() {
        const {user, onRefresh} = this.props

        let refresh, account
        if (user) {
            refresh = (
                <Button outline onClick={_ => onRefresh()} className="me-4">
                    <i className="bi bi-arrow-clockwise me-3"/>
                    Refresh
                </Button>
            )

            account = <ProfilePicture user={user}/>
        }

        return (
            <Navbar dark color="dark" className="px-3 title">
                <NavbarBrand href="/">
                    <i className="bi bi-card-checklist me-3"/>
                    Fullscreen Tasks
                </NavbarBrand>
                <NavbarText>
                    {refresh}
                    {account}
                </NavbarText>
            </Navbar>
        )

    }
}

function ProfilePicture(props) {
    const {user} = props
    return (
        <div className="d-inline">
            <img id="profile-picture"
                 src={user.picture}
                 className="rounded-circle border"
                 alt="profile"
                 height="36"/>

            <UncontrolledPopover placement="bottom"
                                 target="profile-picture">
                <PopoverBody className="px-1 py-2">
                    <Nav vertical>
                        <NavItem>
                            <NavLink href="/api/user/logout" className="text-secondary">
                                <i className="bi bi-box-arrow-right me-2"/>
                                Logout
                            </NavLink>
                        </NavItem>
                    </Nav>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}


