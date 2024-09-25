package com.resource;

import com.resource.client.TaskServiceClient;
import com.resource.model.Resource;
import com.resource.repository.ResourceRepository;
import com.resource.service.ResourceService;
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

class ResourceServiceTest {

    @Mock
    private TaskServiceClient taskServiceClient;

    @Mock
    private ResourceRepository resourceRepository;

    @InjectMocks
    private ResourceService resourceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateResource_WithExistingTask() {
        Resource resource = new Resource();
        resource.setTaskId(1L);

        when(taskServiceClient.doesTaskExist(resource.getTaskId())).thenReturn(true);
        when(resourceRepository.save(resource)).thenReturn(resource);

        Resource createdResource = resourceService.createResource(resource);

        assertNotNull(createdResource);
        assertEquals(resource, createdResource);
        verify(resourceRepository, times(1)).save(resource);
    }

    @Test
    void testCreateResource_WithNonExistingTask() {
        Resource resource = new Resource();
        resource.setTaskId(1L);

        when(taskServiceClient.doesTaskExist(resource.getTaskId())).thenReturn(false);

        Resource createdResource = resourceService.createResource(resource);

        assertNull(createdResource);
        verify(resourceRepository, never()).save(any());
    }

    @Test
    void testGetResourcesByTaskId_WithExistingTask() {
        Long taskId = 1L;
        Resource resource1 = new Resource();
        Resource resource2 = new Resource();

        when(taskServiceClient.doesTaskExist(taskId)).thenReturn(true);
        when(resourceRepository.findByTaskId(taskId)).thenReturn(Arrays.asList(resource1, resource2));

        List<Resource> resources = resourceService.getResourcesByTaskId(taskId);

        assertNotNull(resources);
        assertEquals(2, resources.size());
        verify(resourceRepository, times(1)).findByTaskId(taskId);
    }

    @Test
    void testGetResourcesByTaskId_WithNonExistingTask() {
        Long taskId = 1L;

        when(taskServiceClient.doesTaskExist(taskId)).thenReturn(false);

        List<Resource> resources = resourceService.getResourcesByTaskId(taskId);

        assertNull(resources);
        verify(resourceRepository, never()).findByTaskId(any());
    }

    @Test
    void testGetAllResources() {
        Resource resource1 = new Resource();
        Resource resource2 = new Resource();
        when(resourceRepository.findAll()).thenReturn(Arrays.asList(resource1, resource2));

        List<Resource> resources = resourceService.getAllResources();

        assertNotNull(resources);
        assertEquals(2, resources.size());
        verify(resourceRepository, times(1)).findAll();
    }

    @Test
    void testUpdateResource_ExistingResource() {
        Long resourceId = 1L;
        Resource existingResource = new Resource();
        existingResource.setName("Old Resource");
        Resource updatedResource = new Resource();
        updatedResource.setName("New Resource");

        when(resourceRepository.findById(resourceId)).thenReturn(Optional.of(existingResource));
        when(resourceRepository.save(existingResource)).thenReturn(existingResource);

        Resource result = resourceService.updateResource(resourceId, updatedResource);

        assertNotNull(result);
        assertEquals("New Resource", result.getName());
        verify(resourceRepository, times(1)).save(existingResource);
    }

    @Test
    void testUpdateResource_NonExistingResource() {
        Long resourceId = 1L;
        Resource updatedResource = new Resource();

        when(resourceRepository.findById(resourceId)).thenReturn(Optional.empty());

        Resource result = resourceService.updateResource(resourceId, updatedResource);

        assertNull(result);
        verify(resourceRepository, never()).save(any());
    }

    @Test
    void testDeleteResource() {
        Long resourceId = 1L;

        doNothing().when(resourceRepository).deleteById(resourceId);

        resourceService.deleteResource(resourceId);

        verify(resourceRepository, times(1)).deleteById(resourceId);
    }
}
