package com.ServiceTask.service;

import com.ServiceTask.client.ProjectServiceClient;
import com.ServiceTask.model.Task;
import com.ServiceTask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final ProjectServiceClient projectServiceClient;
    private final TaskRepository taskRepository;

    public Task createTask(Task task) {
        Boolean existProject = projectServiceClient.doesProjectExist(task.getProjectId());
        return Boolean.TRUE.equals(existProject) ? taskRepository.save(task) : null;
    }

    public List<Task> getTasksByProjectId(Long projectId) {
        Boolean existProject = projectServiceClient.doesProjectExist(projectId);
        return Boolean.TRUE.equals(existProject) ? taskRepository.findByProjectId(projectId) : null;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Long id, Task resourceDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setDescription(resourceDetails.getDescription());
                    task.setStartDate(resourceDetails.getStartDate());
                    task.setEndDate(resourceDetails.getEndDate());
                    task.setStatus(resourceDetails.getStatus());
                    return taskRepository.save(task);
                })
                .orElse(null);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public ResponseEntity<Void> deleteTaskByIdProjet(Long id) {
        taskRepository.deleteByProjectId(id);
        return null;
    }

    public Boolean existTask(Long id) {
        return taskRepository.findById(id).isPresent();
    }
}