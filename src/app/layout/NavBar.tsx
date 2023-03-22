import React, {useState} from "react";
import { useMediaQuery } from 'react-responsive'
import {Dropdown, Menu} from 'semantic-ui-react'
import NavBarMb from "./NavBarMb";
import NavBarLg from "./NavBarLg";
import {NavLink} from "react-router-dom";
export default function NavBar () {
    const [activeItem,setactiveItem]=useState("home")
    const handleItemClick = (e: any, {name}: any) => setactiveItem(name)
    const renderLinks=()=>{
        return <><Menu.Item
            as={NavLink}
            to='/'
            exact='true'
            name='logo'
            active={activeItem === 'logo'}
            onClick={handleItemClick}
        >
            <img src="/logo.png"  width="35px" height="35px" style={{ margin: "0 auto" }}  alt="" />
        </Menu.Item>
            <Menu.Item>
                <Dropdown text='Картотека' simple item>
                    <Dropdown.Menu>
                        <Dropdown.Item text='ГОП/Специальности' />
                        <Dropdown.Item text='ОП/Специализации'/>
                        <Dropdown.Item text='Группы'/>
                        <Dropdown.Item text='Обучающиеся' />
                        <Dropdown.Item text='Сотрудники' />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            <Menu.Item>
                <Dropdown text='Управление учебным процессом' simple item>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Каталог дисциплин' />
                        <Dropdown.Item text='Нагрузка преподавателей' />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>

            <Menu.Item
                name='Академическая степень'
                as={NavLink}
                to='/academicDegrees'
                active={activeItem === 'messages'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='friends'
                active={activeItem === 'friends'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                position="right"
            />
            <Menu.Item
                name='sign_in'
                active={activeItem === 'sign_in'}
                onClick={handleItemClick}
            />
        </>
    }
    const none =useMediaQuery({ query: "(max-width:576px)" })
    const sm = useMediaQuery({ query: "(min-width:576px)" })
    const md = useMediaQuery({ query: "(min-width:768px)" })
    const lg = useMediaQuery({ query: "(min-width:992px)" })
    const xl = useMediaQuery({ query: "(min-width:1200px)" })
    const xxl = useMediaQuery({ query: "(min-width:1400px)" })
    const size = {none,sm,md,lg,xl,xxl}
    // @ts-ignore
    return (
        <div>
            {size.sm ? <NavBarLg renderLinks={renderLinks}/> : <NavBarMb renderLinks={renderLinks}/> }
        </div>
    )
}