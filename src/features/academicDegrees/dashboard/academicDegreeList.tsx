import {Table} from "semantic-ui-react";
import {useStore} from "../../../app/store/store";
import {observer} from "mobx-react-lite";
import AcademicDegreeListItem from "./academicDegreeListItem";
export default observer(function AcademicDegreeList() {
    const {academicDegreeStore} = useStore()
    const {academicDegreesByDate} = academicDegreeStore

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Наименование на каз</Table.HeaderCell>
                    <Table.HeaderCell>Наименование на рус</Table.HeaderCell>
                    <Table.HeaderCell>Наименование на анг</Table.HeaderCell>
                    <Table.HeaderCell>Действие</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {academicDegreesByDate.map(academicDegree => (
                    <AcademicDegreeListItem key={academicDegree.id} academicDegree={academicDegree}/>
                ))}
            </Table.Body>
        </Table>
    )
})