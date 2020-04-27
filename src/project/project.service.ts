import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Project } from './project.interface';
import { CreateProjectDTO } from './project.dto';


@Injectable()
export class ProjectService {

    constructor(@InjectModel('Project') readonly projectModel: Model<Project>){}

    async getProjects():Promise<Project[]>{
        const projects = await this.projectModel.find()
        return projects;
    }

    async getProject(projectID: string): Promise<Project>{
        const project = await this.projectModel.findById(projectID);
        return project;
    }

    async createProject(CreateProjectDTO: CreateProjectDTO): Promise<Project>{
       const project = new this.projectModel(CreateProjectDTO); //crear un nuevo objeto basado en la definicion
       await project.save()
        return project;
    }

    async updateProject(projectID: string, createProjectDTO:CreateProjectDTO):Promise<Project>{
       const updateProject = await this.projectModel.findByIdAndUpdate(projectID,createProjectDTO,{new:true}); //{new:true} devuelve el nuevo objeto creado
       return updateProject;
    }

    async deleteProject(projectID:string):Promise<Project>{ //<any>
     const deletedProject = await this.projectModel.findByIdAndDelete(projectID);
     return deletedProject;
    }

}
