// // package com.example.medishop.repository;

// // import java.util.Optional;

// // import org.springframework.data.jpa.repository.JpaRepository;
// // import org.springframework.stereotype.Repository;

// // import com.example.medishop.model.User;

// // @Repository
// // public interface UserRepository extends JpaRepository<User, Long> {

// //     // Find by username (returns Optional)
// //     Optional<User> findByUsername(String username);

// //     // Find by email (returns User or null)
// //     User findByEmail(String email);
// // }

// package com.example.medishop.repository;

// import java.util.Optional;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.example.medishop.model.User;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {

//     // Find user by username (recommended: Optional to avoid NullPointerException)
//     Optional<User> findByUsername(String Username);

//     // Find user by email
//     Optional<User> findByEmail(String email);
// }



package com.example.medishop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.medishop.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username
    Optional<User> findByUsername(String username);

    // Find user by email
    Optional<User> findByEmail(String email);
}
