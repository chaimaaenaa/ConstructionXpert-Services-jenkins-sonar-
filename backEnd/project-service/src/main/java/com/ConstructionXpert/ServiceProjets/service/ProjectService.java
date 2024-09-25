package com.ConstructionXpert.ServiceProjets.service;

import com.ConstructionXpert.ServiceProjets.model.Project;
import com.ConstructionXpert.ServiceProjets.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    // Method for paginated fetching of projects
    public Page<Project> getPaginatedProjects(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return projectRepository.findAll(pageable);
    }

    // Method for fetching all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Optional<Project> updateProject(Long id, Project projectDetails) {
        return projectRepository.findById(id).map(project -> {
            project.setName(projectDetails.getName());
            project.setDescription(projectDetails.getDescription());
            project.setStartDate(projectDetails.getStartDate());
            project.setEndDate(projectDetails.getEndDate());
            project.setBudget(projectDetails.getBudget());
            return projectRepository.save(project);
        });
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Boolean existProject(Long id) {
        return projectRepository.existsById(id);
    }

    public Project findById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }
}
