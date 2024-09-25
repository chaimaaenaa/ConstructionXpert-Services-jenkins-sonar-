package com.Gateway.Feign;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "utilisateurs", url = "http://localhost:8084/api/users")

public interface authInterface {

    @GetMapping("/validate")
    String validateToken(@RequestParam("token") String token) ;

}

