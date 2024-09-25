package com.ConstructionXpert.ServiceGestionProjets;

import com.ConstructionXpert.ServiceProjets.model.Project;
import com.ConstructionXpert.ServiceProjets.repository.ProjectRepository;
import com.ConstructionXpert.ServiceProjets.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test for createProject
    @Test
    void testCreateProject() {
        Project project = new Project();
        project.setName("New Project");

        when(projectRepository.save(project)).thenReturn(project);

        Project result = projectService.createProject(project);

        assertNotNull(result);
        assertEquals("New Project", result.getName());
        verify(projectRepository, times(1)).save(project);
    }

    // Test for getAllProjects
    @Test
    void testGetAllProjects() {
        Project project1 = new Project();
        project1.setName("Project 1");

        Project project2 = new Project();
        project2.setName("Project 2");

        List<Project> projectList = List.of(project1, project2);

        when(projectRepository.findAll()).thenReturn(projectList);

        List<Project> result = projectService.getAllProjects();

        assertEquals(2, result.size());
        assertEquals("Project 1", result.get(0).getName());
        assertEquals("Project 2", result.get(1).getName());
        verify(projectRepository, times(1)).findAll();
    }

    // Test for updateProject
    @Test
    void testUpdateProject() {
        Project existingProject = new Project();
        existingProject.setId(1L);
        existingProject.setName("Old Project");

        Project updatedProject = new Project();
        updatedProject.setName("Updated Project");
        updatedProject.setDescription("Updated Description");

        when(projectRepository.findById(1L)).thenReturn(Optional.of(existingProject));
        when(projectRepository.save(existingProject)).thenReturn(existingProject);

        Optional<Project> result = projectService.updateProject(1L, updatedProject);

        assertTrue(result.isPresent());
        assertEquals("Updated Project", result.get().getName());
        assertEquals("Updated Description", result.get().getDescription());
        verify(projectRepository, times(1)).findById(1L);
        verify(projectRepository, times(1)).save(existingProject);
    }

    // Test for deleteProject
    @Test
    void testDeleteProject() {
        Long projectId = 1L;

        // Simuler que le projet existe dans le dépôt
        doNothing().when(projectRepository).deleteById(projectId);

        // Appeler la méthode deleteProject dans ProjectService
        projectService.deleteProject(projectId);

        // Vérifier que la méthode deleteById a été appelée
        verify(projectRepository, times(1)).deleteById(projectId);
    }

    // Test for existProject
    @Test
    void testExistProject() {
        Long projectId = 1L;

        when(projectRepository.existsById(projectId)).thenReturn(true);

        Boolean result = projectService.existProject(projectId);

        assertTrue(result);
        verify(projectRepository, times(1)).existsById(projectId);
    }

    // Test for findById
    @Test
    void testFindById() {
        Project project = new Project();
        project.setId(1L);
        project.setName("Test Project");

        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        Project result = projectService.findById(1L);

        assertNotNull(result);
        assertEquals("Test Project", result.getName());
        verify(projectRepository, times(1)).findById(1L);
    }
}
