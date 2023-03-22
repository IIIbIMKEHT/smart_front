import React from "react";
import {Menu, Segment} from "semantic-ui-react";

// @ts-ignore
export default function NavBarLg({renderLinks}) {
    return (
        <Segment inverted attached size='mini'>
            <Menu inverted secondary>
                {renderLinks()}
            </Menu>
        </Segment>
    )
}