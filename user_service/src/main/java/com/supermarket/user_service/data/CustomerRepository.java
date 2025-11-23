package com.supermarket.user_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("select c from Customer c where c.email=?1")
    public Customer findCustomerByEmail(String email);

    @Query("select c from Customer c where c.name=?1")
    public List<Customer> findCustomerByName(String name);
}
