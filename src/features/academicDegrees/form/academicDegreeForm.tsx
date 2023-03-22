import {Button, Form, FormInput, Segment} from "semantic-ui-react";
import {ChangeEvent, useEffect, useState} from "react";
import {useStore} from "../../../app/store/store";
import {observer} from "mobx-react-lite";
import {Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {AcademicDegreeFormValues, IAcademicDegree} from "../../../app/models/AcademicDegree";
import MyTextInput from "../../../app/common/form/MyTextInput";
export default observer(function AcademicDegreeForm() {
    const {academicDegreeStore} = useStore()
    const { createAcademicDegree, updateAcademicDegree, loading, loadAcademicDegree } = academicDegreeStore
    const { id } = useParams();

    const [academicDegree, setAcademicDegree] = useState<AcademicDegreeFormValues>(new AcademicDegreeFormValues());
    const navigate = useNavigate();
    useEffect(() => {
        if (id) { // @ts-ignore
            loadAcademicDegree(parseInt(id)).then(activity => setAcademicDegree(new AcademicDegreeFormValues(activity)))
        } else {

        }
    }, [id, loadAcademicDegree])

    function handleSubmit(academicDegree: AcademicDegreeFormValues) {
        academicDegree.id ? updateAcademicDegree(academicDegree).then(() => navigate('/academicDegrees')) : createAcademicDegree(academicDegree).then(() => navigate('/academicDegrees'))
    }

    function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setAcademicDegree({...academicDegree, [name]: value});
    }

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={academicDegree} onSubmit={values => handleSubmit(values)}>
                {({values: academicDegree, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <MyTextInput placeholder='Наименование на каз' name='titleKz'/>
                        <MyTextInput placeholder='Наименование на рус' name='titleRu'/>
                        <MyTextInput placeholder='Наименование на анг' name='titleEn'/>
                        <Button loading={loading} floated='right' positive type='submit' content='Сохранить'/>
                        <Button onClick={() => navigate('/academicDegrees')} floated='right' type='button' content='Отменить'/>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})