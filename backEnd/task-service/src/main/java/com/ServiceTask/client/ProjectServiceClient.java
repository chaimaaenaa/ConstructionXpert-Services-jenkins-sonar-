package com.ServiceTask.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ServiceGestionProjets")
public interface ProjectServiceClient {

    @GetMapping("/api/projects/{projectId}/exist")
    Boolean doesProjectExist(@PathVariable("projectId") Long projectId);
}