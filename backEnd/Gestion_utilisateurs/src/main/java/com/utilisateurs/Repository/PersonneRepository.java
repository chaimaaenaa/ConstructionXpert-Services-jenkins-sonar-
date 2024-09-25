package com.utilisateurs.Repository;



import com.utilisateurs.Model.Personne;
import com.utilisateurs.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonneRepository extends JpaRepository<Personne, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    Optional<Object> findByusername(String username);
}
