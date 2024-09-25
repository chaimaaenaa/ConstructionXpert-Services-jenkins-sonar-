package com.Gateway.Config;


import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public HttpMessageConverters customConverters() {
        return new HttpMessageConverters();
    }
}
