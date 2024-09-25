package com.ServiceTask;

import com.ServiceTask.client.ProjectServiceClient;
import com.ServiceTask.model.Task;
import com.ServiceTask.repository.TaskRepository;
import com.ServiceTask.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private ProjectServiceClient projectServiceClient;

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTask_WithExistingProject() {
        Task task = new Task();
        task.setProjectId(1L);

        when(projectServiceClient.doesProjectExist(task.getProjectId())).thenReturn(true);
        when(taskRepository.save(task)).thenReturn(task);

        Task createdTask = taskService.createTask(task);

        assertNotNull(createdTask);
        assertEquals(task, createdTask);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testCreateTask_WithNonExistingProject() {
        Task task = new Task();
        task.setProjectId(1L);

        when(projectServiceClient.doesProjectExist(task.getProjectId())).thenReturn(false);

        Task createdTask = taskService.createTask(task);

        assertNull(createdTask);
        verify(taskRepository, never()).save(any());
    }

    @Test
    void testGetTasksByProjectId_WithExistingProject() {
        Long projectId = 1L;
        Task task1 = new Task();
        Task task2 = new Task();
        when(projectServiceClient.doesProjectExist(projectId)).thenReturn(true);
        when(taskRepository.findByProjectId(projectId)).thenReturn(Arrays.asList(task1, task2));

        List<Task> tasks = taskService.getTasksByProjectId(projectId);

        assertNotNull(tasks);
        assertEquals(2, tasks.size());
        verify(taskRepository, times(1)).findByProjectId(projectId);
    }

    @Test
    void testGetTasksByProjectId_WithNonExistingProject() {
        Long projectId = 1L;

        when(projectServiceClient.doesProjectExist(projectId)).thenReturn(false);

        List<Task> tasks = taskService.getTasksByProjectId(projectId);

        assertNull(tasks);
        verify(taskRepository, never()).findByProjectId(any());
    }

    @Test
    void testGetAllTasks() {
        Task task1 = new Task();
        Task task2 = new Task();
        when(taskRepository.findAll()).thenReturn(Arrays.asList(task1, task2));

        List<Task> tasks = taskService.getAllTasks();

        assertNotNull(tasks);
        assertEquals(2, tasks.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById() {
        Long taskId = 1L;
        Task task = new Task();
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        Optional<Task> foundTask = taskService.getTaskById(taskId);

        assertTrue(foundTask.isPresent());
        assertEquals(task, foundTask.get());
        verify(taskRepository, times(1)).findById(taskId);
    }

    @Test
    void testUpdateTask_ExistingTask() {
        Long taskId = 1L;
        Task existingTask = new Task();
        existingTask.setDescription("Old Description");
        Task updatedTask = new Task();
        updatedTask.setDescription("New Description");

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(existingTask)).thenReturn(existingTask);

        Task result = taskService.updateTask(taskId, updatedTask);

        assertNotNull(result);
        assertEquals("New Description", result.getDescription());
        verify(taskRepository, times(1)).save(existingTask);
    }

    @Test
    void testUpdateTask_NonExistingTask() {
        Long taskId = 1L;
        Task updatedTask = new Task();

        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        Task result = taskService.updateTask(taskId, updatedTask);

        assertNull(result);
        verify(taskRepository, never()).save(any());
    }

    @Test
    void testDeleteTask() {
        Long taskId = 1L;

        doNothing().when(taskRepository).deleteById(taskId);

        taskService.deleteTask(taskId);

        verify(taskRepository, times(1)).deleteById(taskId);
    }

    @Test
    void testDeleteTaskByIdProjet() {
        Long projectId = 1L;

        doNothing().when(taskRepository).deleteByProjectId(projectId);

        taskService.deleteTaskByIdProjet(projectId);

        verify(taskRepository, times(1)).deleteByProjectId(projectId);
    }

    @Test
    void testExistTask_ExistingTask() {
        Long taskId = 1L;
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(new Task()));

        Boolean exists = taskService.existTask(taskId);

        assertTrue(exists);
        verify(taskRepository, times(1)).findById(taskId);
    }

    @Test
    void testExistTask_NonExistingTask() {
        Long taskId = 1L;
        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        Boolean exists = taskService.existTask(taskId);

        assertFalse(exists);
        verify(taskRepository, times(1)).findById(taskId);
    }
}
