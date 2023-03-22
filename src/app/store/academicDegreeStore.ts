import {makeAutoObservable, runInAction} from "mobx";
import {AcademicDegreeFormValues, IAcademicDegree} from "../models/AcademicDegree";
import agent from "../api/agent";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
export default class AcademicDegreeStore {

    selectedAcademicDegree?: IAcademicDegree = undefined
    academicDegreeRegistry = new Map<number, IAcademicDegree>();
    editMode = false
    loading = false
    loadingInitial = true
    constructor() {
        makeAutoObservable(this)
    }

    get academicDegreesByDate() {
        return Array.from(this.academicDegreeRegistry.values()).sort((a,b) =>
            // @ts-ignore
            Date.parse(a.createdAt) - Date.parse(b.createdAt));
    }
    loadAcademicDegrees = async () => {
        try {
            const academicDegrees = await agent.academicDegrees.list()
            // @ts-ignore
            academicDegrees.forEach(res => {
                res.createdAt = res.createdAt.split('T')[0]
                this.academicDegreeRegistry.set(res.id, res)
            })
            this.setLoadingInitial(false)
        } catch (e) {
            console.log(e)
            this.setLoadingInitial(false)
        }
    }
    loadAcademicDegree = async (id: number) => {
        let academicDegree = this.getAcademicDegree(id);
        if (academicDegree) {
            this.selectedAcademicDegree = academicDegree;
            return academicDegree;
        }
        else {
            this.setLoadingInitial(true);
            try {
                academicDegree = await agent.academicDegrees.detail(id);
                this.setAcademicDegree(academicDegree);
                runInAction(() => this.selectedAcademicDegree = academicDegree);
                this.setLoadingInitial(false);
                return academicDegree;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setAcademicDegree = (academicDegree: IAcademicDegree | undefined) => {
        if (academicDegree) {
            this.academicDegreeRegistry.set(academicDegree.id, academicDegree);
        }
    }
    private getAcademicDegree = (id: number) => {
        return this.academicDegreeRegistry.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }
    selectAcademicDegree = (id: number) => {
        this.selectedAcademicDegree = this.academicDegreeRegistry.get(id)
    }
    cancelAcademicDegree = () => {
        this.selectedAcademicDegree = undefined
    }
    openForm = (id?: number) => {
        id ? this.selectAcademicDegree(id) : this.cancelAcademicDegree()
        this.editMode = true
    }
    closeForm = () => {
        this.editMode = false
    }
    createAcademicDegree = async (academicDegree: AcademicDegreeFormValues) => {
        this.loading = true
        try {
            await agent.academicDegrees.create(academicDegree);
            // const newAcademicDegree = new IAcademicDegree(academicDegree)
            // this.setAcademicDegree(newAcademicDegree)
            runInAction(() => {
                // this.selectedAcademicDegree = newAcademicDegree
                this.editMode = false
                this.loading = false
            })
        } catch (e) {
            console.log(e)
            runInAction(() => {
                this.loading = false
            })
        }
    }
    updateAcademicDegree = async (academicDegree: AcademicDegreeFormValues) => {
        this.loading = true
        try {
            await agent.academicDegrees.update(academicDegree)

            runInAction(() => {
                if (academicDegree.id) {
                    let updatedAcademicDegree = {...this.getAcademicDegree(academicDegree.id), ...academicDegree}
                    this.academicDegreeRegistry.set(academicDegree.id, updatedAcademicDegree as IAcademicDegree)
                    this.selectedAcademicDegree = updatedAcademicDegree as IAcademicDegree
                }
                this.editMode = false
                this.loading = false
            })
        } catch (e) {
            console.log(e)
            runInAction(() => {
                this.loading = false
            })
        }
    }
    deleteAcademicDegree = async (id: number) => {
        this.loading = true
        try {
            await agent.academicDegrees.delete(id)
            runInAction(() => {
                this.academicDegreeRegistry.delete(id)
                if (this.selectedAcademicDegree?.id === id) {
                    this.cancelAcademicDegree()
                    this.closeForm()
                }
                this.loading = false
            })
        } catch (e) {
            console.log(e)
            this.loading = false
        }
    }
}