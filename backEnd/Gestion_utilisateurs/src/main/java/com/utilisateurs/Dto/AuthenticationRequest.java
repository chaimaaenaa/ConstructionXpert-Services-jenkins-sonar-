package com.utilisateurs.Dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

    private String username;
    private  String email;
    private String password;


    public AuthenticationRequest(String testuser, String password) {
    }
}
