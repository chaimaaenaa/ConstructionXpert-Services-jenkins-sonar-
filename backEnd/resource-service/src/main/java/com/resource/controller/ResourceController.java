package com.resource.controller;

import com.resource.model.Resource;
import com.resource.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @PostMapping
    public ResponseEntity<Resource> createResource(@RequestBody Resource resource) {
        Resource createdResource = resourceService.createResource(resource);
        return createdResource != null ? ResponseEntity.ok(createdResource) : ResponseEntity.badRequest().build();
    }

    @GetMapping()
    public List<Resource> getAllResources() {
        return resourceService.getAllResources();
    }

    @GetMapping("/Task/{projectId}")
    public ResponseEntity<List<Resource>> getTasksByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(resourceService.getResourcesByTaskId(projectId));
    }

    @PutMapping("/resource/{id}")
    public Resource updateResource (@PathVariable Long id, @RequestBody Resource resourceDetails) {
        return resourceService.updateResource(id, resourceDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        ResponseEntity.ok().build();
    }
}
