import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param,NotFoundException, Query, UseGuards } from '@nestjs/common';
import { CreateProjectDTO } from './project.dto';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
export class ProjectController {

    constructor(private projectService: ProjectService){

    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/save-project')
    async createPost(@Res() res,@Body() createProjectDTO:CreateProjectDTO){  //enviar respuesta a clientes    createProjectDTO que es lo que necesariamente vamos a recibir
    //    console.log(createProjectDTO);
       const project = await this.projectService.createProject(createProjectDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Project Successfully Created',
            project
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getProjects(@Res() res){
        const projects = await this.projectService.getProjects();
         return res.status(HttpStatus.OK).json({
            projects
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:projectID') // utilizando un parametro
    async getProject(@Res() res ,@Param('projectID') projectID){
        const project = await this.projectService.getProject(projectID);
        if(!project) throw new NotFoundException('Project Not Found')
        return res.status(HttpStatus.OK).json(project);

    }

    @Delete('/delete')  //utilizando una consulta
    async deleteProject(@Res() res,@Query('projectID') projectID){
     const projectDeleted = await   this.projectService.deleteProject(projectID);
     if(!projectDeleted) throw new NotFoundException('Project Not Found')
        return res.status(HttpStatus.OK).json({
            message:'Project Deleted Succesfully',
            projectDeleted});
    }

    @Put('/update')
    async updateProject(@Res() res, @Body()createProjectDTO:CreateProjectDTO, @Query('projectID')projectID){
        const updatedProject = await this.projectService.updateProject(projectID,createProjectDTO);
        if(!updatedProject) throw new NotFoundException('Project Not Found');
        return res.status(HttpStatus.OK).json({
            message:'Project Updated Succesfully',
            updatedProject});
    }


}
