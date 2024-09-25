package com.resource.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ServiceTask", url = "http://ServiceTask/api")
public interface TaskServiceClient {

    @GetMapping("/tasks/{taskId}/exist")
    Boolean doesTaskExist(@PathVariable("taskId") Long taskId);
}