import React, {SyntheticEvent, useState} from "react";
import {Button, Label, Table} from "semantic-ui-react";
import {IAcademicDegree} from "../../../app/models/AcademicDegree";
import {useStore} from "../../../app/store/store";
import {Link} from "react-router-dom";

interface Props {
    academicDegree: IAcademicDegree
}
export default function AcademicDegreeListItem ({academicDegree}: Props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {academicDegreeStore} = useStore()
    const {deleteAcademicDegree, loading} = academicDegreeStore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [target, setTarget] = useState(parseInt(''))
    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: number) {
        setTarget(parseInt(e.currentTarget.name))
        deleteAcademicDegree(id).then(r => console.log(r))
    }

    return (
        <Table.Row key={academicDegree.id}>
                <Table.Cell>
                    <Label>{academicDegree.titleKz}</Label>
                </Table.Cell>
                <Table.Cell>
                    <Label>{academicDegree.titleRu}</Label>
                </Table.Cell>
                <Table.Cell>
                    <Label>{academicDegree.titleEn}</Label>
                </Table.Cell>
                <Table.Cell style={{display: 'flex'}}>
                    <Button as={Link} to={`/manage/${academicDegree.id}`} circular icon='edit outline' />
                    <Button
                        name={academicDegree.id}
                        loading={loading && target === academicDegree.id}
                        onClick={(e) => handleDelete(e, academicDegree.id)}
                        circular
                        icon='trash alternate outline'
                        color='red' />
                </Table.Cell>
            </Table.Row>
    );
}