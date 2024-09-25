package com.resource.service;

import com.resource.client.TaskServiceClient;
import com.resource.model.Resource;
import com.resource.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final TaskServiceClient taskServiceClient;
    private final ResourceRepository resourceRepository;

    public Resource createResource(Resource resource) {
        Boolean existTask = taskServiceClient.doesTaskExist(resource.getTaskId());
        return Boolean.TRUE.equals(existTask) ? resourceRepository.save(resource) : null;
    }

    public List<Resource> getResourcesByTaskId(Long taskId) {
        Boolean existTask = taskServiceClient.doesTaskExist(taskId);
        return Boolean.TRUE.equals(existTask) ? resourceRepository.findByTaskId(taskId) : null;
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Resource updateResource(Long id, Resource resourceDetails) {
        return resourceRepository.findById(id)
                .map(resource -> {
                    resource.setName(resourceDetails.getName());
                    resource.setQuantity(resourceDetails.getQuantity());
                    resource.setType(resourceDetails.getType());
                    resource.setProvider(resourceDetails.getProvider());
                    return resourceRepository.save(resource);
                })
                .orElse(null);
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }
}
