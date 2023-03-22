import React, {useEffect} from "react";
import {Button, Grid, Icon} from "semantic-ui-react";
import AcademicDegreeList from "./academicDegreeList";
import AcademicDegreeForm from "../form/academicDegreeForm";
import {useStore} from "../../../app/store/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Link} from "react-router-dom";

export default observer (function AcademicDegreeDashboard() {
    const {academicDegreeStore} = useStore()
    const {editMode} = academicDegreeStore
    useEffect(() => {
        academicDegreeStore.loadAcademicDegrees()
    }, [academicDegreeStore])

    if (academicDegreeStore.loadingInitial) return <LoadingComponent />
    return (
        <div>
            <Button as={Link} to={'/create-academic-degree'} labelPosition='right' icon style={{marginBottom: '1em', marginLeft: 'auto'}}>
                Создать
                <Icon name='plus' />
            </Button>

            <Grid>
                <Grid.Column>
                    <AcademicDegreeList />
                </Grid.Column>
            </Grid>

        </div>
    )
})